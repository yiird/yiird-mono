import { tsquery } from '@phenomnomnominal/tsquery';
import { ElementNode } from '@vue/compiler-core';
import { parse as sfcParse, SFCParseOptions } from '@vue/compiler-sfc';
import EventEmitter from 'events';
import { glob, IOptions } from 'glob';
import path, { resolve } from 'path';
import {
	factory,
	isAsExpression,
	isIdentifier,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isSourceFile,
	isSpreadAssignment,
	Node,
	ObjectLiteralElementLike,
	ScriptKind,
	Set,
	SourceFile,
	SyntaxKind
} from 'typescript';
import {
	DeclarationInitalizer,
	ExportFromInitalizer,
	ExportInitalizer,
	ImportInitalizer,
	isDeclarationInitalizer,
	isExportFromInitalizer,
	isExportInitalizer,
	isImportInitalizer,
	LoaderOptions
} from '../types';
import { ParseUtil } from '../utils/parse-utils';

const getSFCParseOptions = (filePath: string): SFCParseOptions => {
	const sfcParseOptions: SFCParseOptions = {};
	sfcParseOptions.filename = filePath;
	sfcParseOptions.sourceMap = false;
	return sfcParseOptions;
};

const defaultLoaderOptions: LoaderOptions = {
	root: resolve('../../package.json'),
	scanDirs: [],
	extensions: ['.vue', '.ts'],
	externals: ['vue', '@vue/*']
};

export class FileCache extends EventEmitter {
	private _filePath: string;
	private _source: string;
	private _script: string;
	private _ast: SourceFile;
	private _isSfc = false;
	private _template?: string;
	private _templateAst?: ElementNode;
	private _ext: string;
	private _loader?: Loader;
	private _loadTimes = 0;
	/**
	 * 当前文件导入信息
	 */
	private _importInitalizers: Map<string, ImportInitalizer> = new Map();
	/**
	 * 当前文件的所有顶级邓毅
	 */
	private _declarationInitalizers: Map<string, DeclarationInitalizer> = new Map();

	private _exportInitalizers: Map<string, ExportInitalizer> = new Map();

	private _exportFromInitalizers: Map<string, ExportFromInitalizer> = new Map();

	constructor(filePath: string, loader?: Loader) {
		super();
		this._filePath = filePath;
		this._loader = loader;
		this._ext = path.extname(filePath);
		this._source = ParseUtil.getSource(filePath);
		if (this._ext === '.vue') {
			this._isSfc = true;
			const sfcParseOptions = getSFCParseOptions(filePath);
			const sfc = sfcParse(this._source, sfcParseOptions);
			const script = sfc.descriptor.script?.content;
			if (!script) {
				throw new Error();
			}
			this._script = script;
			const template = sfc.descriptor.template;
			this._templateAst = template?.ast;
			this._template = template?.content;
		} else {
			this._script = this._source;
		}
		this._ast = tsquery.ast(this._script, filePath, ScriptKind.TSX);
		this._init();
		this.on('postprocessing', this._postprocessing);
	}

	/**
	 * 初始化导出项
	 */
	private _init() {
		this._importInitalizers = new Map<string, ImportInitalizer>();
		this._declarationInitalizers = new Map<string, DeclarationInitalizer>();
		this._exportInitalizers = new Map<string, ExportInitalizer>();
		this._exportFromInitalizers = new Map<string, ExportFromInitalizer>();

		//所有变量、方法、类的声明
		let selector = 'VariableStatement,FunctionDeclaration,ClassDeclaration';
		//所有导入声明
		selector += ',ImportDeclaration';
		//所有导出项声明或者导出表达式
		selector += ',[modifiers.0.kind=' + SyntaxKind.ExportKeyword + '],ExportAssignment,ExportDeclaration';

		const nodes = tsquery(this._ast, selector, {
			visitAllChildren: true
		});
		nodes.forEach((node) => {
			if (isSourceFile(node.parent)) {
				const initalizers = ParseUtil.nodeToInitalizer(node);
				initalizers.forEach((initalizer) => {
					const name = initalizer.name;
					if (isExportInitalizer(initalizer)) {
						this._exportInitalizers.set(name, initalizer);
					} else if (isExportFromInitalizer(initalizer)) {
						this._exportFromInitalizers.set(name, initalizer);
					} else if (isDeclarationInitalizer(initalizer)) {
						this._declarationInitalizers.set(name, initalizer);
					} else if (isImportInitalizer(initalizer)) {
						this._importInitalizers.set(name, initalizer);
					}
				});
			}
		});
	}

	private _handleExports() {
		this._exportInitalizers.forEach((_initalizer) => {
			if (isIdentifier(_initalizer.node)) {
				_initalizer.projection = this.getProduction(_initalizer.node.text);
			} else {
				_initalizer.projection = this._handNode(_initalizer.node);
			}
		});
	}

	private _handNode(node: Node) {
		if (isAsExpression(node)) {
			node = ParseUtil.promoteObjectInAsExpression(node);
		}
		return ParseUtil.hasSpreadAssignmentInChildren(node) ? this.operatorSpreadAssignment(node) : node;
	}

	private _handleDeclarations() {
		this._declarationInitalizers.forEach((_initalizer) => {
			if (isIdentifier(_initalizer.node)) {
				_initalizer.projection = this.getProduction(_initalizer.node.text);
			} else {
				_initalizer.projection = this._handNode(_initalizer.node);
			}
		});
	}

	public getProduction(initalizerName: string): Node | undefined {
		const declarationInitalizer = this._declarationInitalizers.get(initalizerName);
		let result: Node | undefined;
		if (declarationInitalizer) {
			if (isIdentifier(declarationInitalizer.node)) {
				result = declarationInitalizer.projection || this.getProduction(declarationInitalizer.node.text);
			} else {
				result = this._handNode(declarationInitalizer.node);
			}
		}
		if (!result) {
			const importInitalizer = this._importInitalizers.get(initalizerName);
			if (importInitalizer) {
				if (!ParseUtil.isExcuded(importInitalizer.from)) {
					const availablePath = ParseUtil.getReferPath(this._filePath, importInitalizer.from, this._fileExtensions());
					if (availablePath) {
						const referCache = this._loader?.getCache(availablePath);
						if (referCache) {
							if (referCache._loadTimes === 0) {
								referCache._postprocessing();
							}
							const _referExport = referCache.getAllExports().get(importInitalizer.importedName);
							result = _referExport?.projection;
						}
					}
				}
			}
		}
		if (result) {
			result = this._handNode(result);
		}
		return result;
	}

	/**
	 * 提升 AsExpression 中的 ObjectLiteralExpression
	 * @param expression
	 * @returns
	 */
	private operatorSpreadAssignment(expression: Node) {
		if (isObjectLiteralExpression(expression)) {
			const properties: ObjectLiteralElementLike[] = [];
			expression.properties.forEach((property) => {
				if (isSpreadAssignment(property)) {
					const _projection = this.getProduction(property.expression.getText());
					if (_projection) {
						if (isObjectLiteralExpression(_projection)) {
							const _properties = _projection.properties;
							if (_properties) {
								properties.push(..._properties);
							}
						}
					}
				} else if (isPropertyAssignment(property) && ParseUtil.hasSpreadAssignmentInChildren(property)) {
					const _propertyInitialize = this.operatorSpreadAssignment(property.initializer);
					if (isObjectLiteralExpression(_propertyInitialize)) {
						property = factory.updatePropertyAssignment(property, property.name, _propertyInitialize);
					}
					properties.push(property);
				} else {
					properties.push(property);
				}
			});
			if (properties.length > 0) {
				return factory.updateObjectLiteralExpression(expression, properties);
			}
		}
		return expression;
	}

	private _getLoaderOptions() {
		return this._loader?.getOptions();
	}

	private _fileExtensions() {
		return this._getLoaderOptions()?.extensions;
	}

	/**
	 * 后续处理，当loader上下文加载完毕后执行
	 */
	private _postprocessing() {
		this._handleDeclarations();
		this._handleExports();
		this._loadTimes++;
	}

	/**
	 * 获取当前文档引用的外部文件路径
	 * @returns {Set<string>} 文件绝对路径
	 */
	public getReferFiles(): Set<string> {
		const result = new Set<string>();
		this._importInitalizers.forEach((refer) => {
			if (ParseUtil.isExcuded(refer.from, this._getLoaderOptions()?.externals)) {
				return;
			} else {
				const referPath = ParseUtil.getReferPath(this._filePath, refer.from, this._getLoaderOptions()?.extensions);
				referPath && result.add(referPath);
			}
		});
		return result;
	}

	public getDeclarations() {
		return this._declarationInitalizers;
	}

	public getImportDeclarations() {
		return this._importInitalizers;
	}

	public getAllExports() {
		return this._exportInitalizers;
	}

	public getSource() {
		return this._source;
	}

	public getAst() {
		return this._ast;
	}

	public getScript() {
		return this._script;
	}

	public isSfc() {
		return this._isSfc;
	}

	public getTemplate() {
		return this._template;
	}
	public getTemplateAst() {
		return this._templateAst;
	}
}

export class Loader extends EventEmitter {
	private _root: string;
	private _files: string[] = [];
	private _CACHE_: Map<string, FileCache> = new Map();
	private _REFER_: Map<string, Set<string>> = new Map();
	private _options: LoaderOptions = {
		root: path.resolve(__dirname),
		extensions: ['.vue', '.ts'],
		scanDirs: []
	};

	constructor(options: LoaderOptions) {
		super();
		this._options = Object.assign({}, defaultLoaderOptions, options);
		this._root = this._options.root;
		this._preprocessing();
		this.on('loaded', this._postprocessing);
		// this.on('reload-sfc', (reloadSfcs: string[]) => {
		// 	reloadSfcs.forEach((sfcPath) => {
		// 		this.getCache(sfcPath)?.emit('postprocessing');
		// 	});
		// });
	}

	/**
	 * 预处理所有文件，扫描指定目录下的所有符合条件的文件，忽略无效目录，并缓存文件内容
	 * @private
	 */
	private _preprocessing() {
		//扫描指定目录并收集可用文件路径
		this._options.scanDirs.forEach((scanDir) => {
			let files;
			const globOptions: IOptions = {
				ignore: this._options.ignore,
				absolute: true
			};
			if (path.isAbsolute(scanDir)) {
				globOptions.cwd = scanDir;
				files = glob.sync('**/*+(' + this._options.extensions?.join('|') + ')');
			} else {
				globOptions.cwd = path.join(this._root, scanDir);
				files = glob.sync('**/*+(' + this._options.extensions?.join('|') + ')', globOptions);
			}
			this._files.push(...files);
		});
	}

	private _flatAllRefers(filePath: string) {
		const result: string[] = [];
		const fileCache = new FileCache(filePath, this);
		this._CACHE_.set(filePath, fileCache);
		!result.includes(filePath) && result.push(filePath);
		fileCache.getReferFiles().forEach((referPath) => {
			let refers = this._REFER_.get(referPath);
			if (!refers) {
				refers = new Set<string>();
				this._REFER_.set(referPath, refers);
			}
			refers.add(filePath);
			const _result = this._flatAllRefers(referPath);
			result.push(..._result);
		});
		return result;
	}

	/**
	 * 加载文件并创建 @see {@link FileCache} 到缓存中
	 * @param filePath 指定文件路径可选
	 */
	public load(filePath?: string) {
		let files = this._files;
		filePath && (files = [filePath]);
		//获取并缓存文件内容

		const loadedFiles: string[] = [];
		files.forEach((path) => {
			loadedFiles.push(...this._flatAllRefers(path));
		});

		this.emit('loaded', loadedFiles);
	}

	protected _postprocessing(filePaths: Set<string>) {
		const temp: Array<{ path: string; size: number }> = [];
		if (filePaths) {
			filePaths.forEach((filePath) => {
				const refers = this._REFER_.get(filePath);
				temp.push({
					path: filePath,
					size: refers?.size || 0
				});
			});
		} else {
			this._REFER_.forEach((refers, path) => {
				temp.push({
					path,
					size: refers.size
				});
			});
		}
		temp.sort((o1, o2) => (o1.size > o2.size ? 1 : o1.size < o2.size ? -1 : 0)).forEach((item) => {
			this._CACHE_.get(item.path)?.emit('postprocessing');
		});
	}

	public getFiles() {
		return this._files;
	}

	public getSfcs() {
		return this._files.filter((file) => path.extname(file) === '.vue');
	}

	public getAllCache() {
		return this._CACHE_;
	}

	public getCache(filePath: string) {
		return this._CACHE_.get(filePath);
	}

	public getOptions() {
		return this._options;
	}
}
