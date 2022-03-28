import { tsquery } from '@phenomnomnominal/tsquery';
import { ElementNode } from '@vue/compiler-core';
import { parse as sfcParse, SFCParseOptions } from '@vue/compiler-sfc';
import EventEmitter from 'events';
import { glob, IOptions } from 'glob';
import { isMap } from 'lodash-es';
import path from 'path';
import { isIdentifier, ScriptKind, Set, SourceFile } from 'typescript';
import { BingInitalizer, LoaderOptions } from '../types';
import { ParseUtil } from '../utils/parse-utils';

const getSFCParseOptions = (filePath: string): SFCParseOptions => {
	const sfcParseOptions: SFCParseOptions = {};
	sfcParseOptions.filename = filePath;
	sfcParseOptions.sourceMap = false;
	return sfcParseOptions;
};

export class FileCache extends EventEmitter {
	private _filePath: string;
	private _source: string;
	private _script: string | undefined;
	private _ast: SourceFile | undefined;
	private _isSfc = false;
	private _template?: string;
	private _templateAst?: ElementNode;
	private _ext: string;
	private _loaderOptions: LoaderOptions;
	/**
	 * 当前文件导入信息
	 */
	private _importDeclarations: Map<string, BingInitalizer> = new Map();
	/**
	 * 当前文件的所有顶级邓毅
	 */
	private _localDeclarations: Map<string, BingInitalizer> = new Map();

	private _localExports: Map<string, BingInitalizer> = new Map();

	constructor(filePath: string, loaderOptions: LoaderOptions) {
		super();
		this._filePath = filePath;
		this._loaderOptions = loaderOptions;
		this._ext = path.extname(filePath);
		this._source = ParseUtil.getSource(filePath);
		if (this._ext === '.vue') {
			this._isSfc = true;
			const sfcParseOptions = getSFCParseOptions(filePath);
			const sfc = sfcParse(this._source, sfcParseOptions);
			this._script = sfc.descriptor.script?.content;
			const template = sfc.descriptor.template;
			this._templateAst = template?.ast;
			this._template = template?.content;
		} else {
			this._script = this._source;
		}
		if (this._script) {
			this._ast = tsquery.ast(this._script, filePath, ScriptKind.TS);
			this._importDeclarations = ParseUtil.getImporters(this);
			this._localDeclarations = ParseUtil.getDeclarations(this);
			this._localExports = ParseUtil.getExports(this);
		}
		this.on('postprocessing', this._postprocessing);
	}

	/**
	 * 后续处理，当loader上下文加载完毕后执行
	 */
	protected _postprocessing() {
		this._localExports.forEach((localExport) => {
			if (isMap(localExport.initializer)) {
				//
			} else if (isIdentifier(localExport.initializer)) {
				const name = localExport.initializer.getText();
				const bing = ParseUtil.getInitalizer(name, this);
				if (bing) {
					localExport.initializer = bing.initializer;
				}
			}
		});
	}

	/**
	 * 获取当前文档引用的外部文件路径
	 * @returns {Set<string>} 文件绝对路径
	 */
	public getReferFiles(): Set<string> {
		const result = new Set<string>();
		this._importDeclarations.forEach((refer) => {
			refer.from && result.add(refer.from);
		});
		return result;
	}

	public getLocalDeclarations() {
		return this._localDeclarations;
	}

	public getImportDeclarations() {
		return this._importDeclarations;
	}

	public getLocalExports() {
		return this._localExports;
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
	public getLoaderOptions() {
		return this._loaderOptions;
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
		this._root = options.root;
		Object.assign(this._options, options);
		this._preprocessing();
		this.on('loaded', this._postprocessing);
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

	/**
	 * 加载文件并创建 @see {@link FileCache} 到缓存中
	 * @param filePath 指定文件路径可选
	 */
	public load(filePath?: string) {
		let files = this._files;
		filePath && (files = [filePath]);
		//获取并缓存文件内容
		files.forEach((path) => {
			const fileCache = new FileCache(path, this._options);
			this._CACHE_.set(path, fileCache);
			fileCache.getReferFiles().forEach((refer) => {
				//记录文件被哪些文件引用，用于查找当文件本身发生变化时会影响哪些文件
				let refers = this._REFER_.get(refer);
				if (!refers) {
					refers = new Set<string>();
					this._REFER_.set(refer, refers);
				}
				refers.add(path);
			});
		});

		if (filePath) {
			/**
			 * 当加载指定文件，同时重新加载所有导入了当前文件的文件
			 */
			const refers = this._REFER_.get(filePath);
			refers?.forEach((refer) => {
				this.load(refer);
			});
			if (refers && refers.size > 0) {
				const reloadSfcs: string[] = [];
				refers.forEach((refer) => {
					if (path.dirname(refer) === '.vue') reloadSfcs.push(refer);
				});

				if (reloadSfcs.length > 0) {
					this.emit('reload-sfc', reloadSfcs);
				}
				this._postprocessing(refers);
			}
		} else {
			this.emit('loaded', files);
		}
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
}
