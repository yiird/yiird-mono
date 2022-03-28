import { tsquery } from '@phenomnomnominal/tsquery';
import fs from 'fs';
import { isArray, isMap } from 'lodash-es';
import path from 'path';
import {
	factory,
	isAsExpression,
	isAsteriskToken,
	isClassDeclaration,
	isExportAssignment,
	isExportDeclaration,
	isFunctionDeclaration,
	isIdentifier,
	isImportDeclaration,
	isNamedExports,
	isNamedImports,
	isNamespaceExport,
	isNamespaceImport,
	isObjectLiteralExpression,
	isSourceFile,
	isSpreadAssignment,
	isVariableStatement,
	Node,
	NodeArray,
	ObjectLiteralElementLike,
	ObjectLiteralExpression,
	ScriptKind,
	SyntaxKind
} from 'typescript';
import { FileCache } from '../parser/loader';
import { BingInitalizer } from '../types';

export class ParseUtil {
	static getInitalizer(name: string, cache: FileCache): BingInitalizer | undefined {
		let initializer = ParseUtil.getInitalizerFromDeclarations(name, cache);
		if (!initializer) {
			initializer = ParseUtil.getInitializerFromImporters(name, cache);
		}
		return initializer;
	}

	static getInitalizerFromDeclarations(name: string, cache: FileCache): BingInitalizer | undefined {
		let result: BingInitalizer | undefined;
		cache.getLocalDeclarations().forEach((bing, _name) => {
			const initializer = bing.initializer;
			if (_name === name && initializer) {
				if (isMap(initializer)) {
					//
				} else if (isIdentifier(initializer)) {
					result = ParseUtil.getInitalizer(initializer.getText(), cache);
				} else {
					result = bing;
				}
			}
		});
		return result;
	}

	static getInitializerFromImporters(name: string, cache: FileCache): BingInitalizer | undefined {
		let result;
		cache.getImportDeclarations().forEach((_refer, _name) => {
			if (name === _name) {
				result = _refer;
			}
		});
		return result;
	}

	static getSource(filePath: string) {
		return fs.readFileSync(filePath).toString();
	}

	static getAst(filePath: string) {
		const ast = tsquery.ast(ParseUtil.getSource(filePath), filePath, ScriptKind.TS);
		return ast;
	}

	static getAvailablePath(filePath: string, extensions: string[] = []): string | undefined {
		let realPath;
		const mybeFiles = [filePath, path.resolve(filePath, `.${path.sep}index`)];

		extensions.forEach((ext) => {
			if (path.extname(filePath) === '') {
				mybeFiles.forEach((mybeFile) => {
					if (fs.existsSync(mybeFile + ext)) {
						realPath = mybeFile + ext;
					}
				});
			} else if (fs.existsSync(filePath)) {
				realPath = filePath;
			}
		});
		return realPath;
	}

	static getReferPath(baseFilePath: string, filePath: string, extensions?: string[]) {
		return ParseUtil.getAvailablePath(path.resolve(path.dirname(baseFilePath), filePath), extensions);
	}

	static isExcuded(importer: string, externals: string[] = []) {
		return externals.filter((external) => (external.endsWith('*') && importer.startsWith(external.replaceAll('*', ''))) || external === importer).length > 0;
	}
	/**
	 * 处理ast中所有导入
	 * @returns {Map<string, BingInitalizer>} 导入到当前文件的导入信息
	 */
	static getImporters(cache: FileCache): Map<string, BingInitalizer> {
		const map = new Map<string, BingInitalizer>();
		const selector = 'ImportDeclaration';
		const ast = cache.getAst();
		if (!ast) return map;
		const nodes = tsquery(ast, selector);
		const loaderOptions = cache.getLoaderOptions();
		nodes.forEach((node) => {
			if (isImportDeclaration(node)) {
				const importer = node.moduleSpecifier.getText().replace(/[\s|'|"]/g, '');
				const importClause = node.importClause;

				if (ParseUtil.isExcuded(importer, loaderOptions.externals) || !importClause) {
					return;
				}

				const referPath = ParseUtil.getReferPath(ast.fileName, importer, loaderOptions.extensions);
				if (!referPath) {
					throw Error('file not found:' + importer);
				}

				const otherFileCache = new FileCache(referPath, loaderOptions);
				const otherFileExports = otherFileCache.getLocalExports();

				const name = importClause.name?.getText();
				if (name) {
					const bingInitializer = otherFileExports.get('default');
					if (bingInitializer) {
						map.set(name, {
							name: name,
							root: node,
							initializer: bingInitializer.initializer,
							from: referPath
						});
					}
				}

				const bindings = importClause.namedBindings;
				if (bindings) {
					if (isNamedImports(bindings)) {
						bindings.elements.forEach((item) => {
							const name = item.name.getText();
							let importName = item.name.getText();
							if (item.propertyName) {
								importName = item.propertyName.getText();
							}
							const bingInitializer = otherFileExports.get(importName);
							if (bingInitializer) {
								map.set(name, {
									name: name,
									root: node,
									initializer: bingInitializer.initializer,
									from: referPath
								});
							}
						});
					} else if (isNamespaceImport(bindings)) {
						const name = bindings.name.getText();
						const firstToken = bindings.getFirstToken();

						if (firstToken && isAsteriskToken(firstToken)) {
							map.set(name, {
								name: name,
								root: node,
								initializer: ParseUtil.mapInitializerToMapNode(otherFileExports),
								from: referPath
							});
						}
					}
				}
			}
		});
		return map;
	}

	static mapInitializerToMapNode(mapInitializer: Map<string, BingInitalizer>) {
		const map = new Map<string, Node>();
		mapInitializer.forEach((value, name) => {
			if (!isMap(value.initializer)) {
				map.set(name, value.initializer);
			}
		});
		return map;
	}

	/**
	 * 获取 ast 树中所有导出项
	 * @returns {Map<string, BingInitalizer>} 导出项
	 */
	static getExports(cache: FileCache): Map<string, BingInitalizer> {
		const map = new Map<string, BingInitalizer>();
		const ast = cache.getAst();
		if (!ast) return map;
		const nodes = tsquery(ast, '[modifiers.0.kind=' + SyntaxKind.ExportKeyword + '],ExportAssignment,ExportDeclaration', {
			visitAllChildren: true
		});
		nodes.forEach((node) => {
			if (isSourceFile(node.parent)) {
				const result = ParseUtil.nodeToBingInitalizer(node, cache, true);
				if (isArray(result)) {
					result.forEach((item) => {
						// if (isAsteriskToken(item.initializer)) {
						// }
						map.set(item.name, item);
					});
				} else {
					map.set(result.name, result);
				}
			}
		});
		return map;
	}

	/**
	 * 获取除导出项的所有声明
	 * @returns {Map<string, BingInitalizer>} 声明
	 */
	static getDeclarations(cache: FileCache): Map<string, BingInitalizer> {
		const map: Map<string, BingInitalizer> = new Map();
		const ast = cache.getAst();
		if (!ast) return map;
		tsquery(ast, 'VariableStatement,FunctionDeclaration,ClassDeclaration').forEach((node) => {
			if (isSourceFile(node.parent)) {
				const result = ParseUtil.nodeToBingInitalizer(node, cache);
				if (isArray(result)) {
					result.forEach((item) => {
						map.set(item.name, item);
					});
				} else {
					map.set(result.name, result);
				}
			}
		});
		return map;
	}

	static nodeToBingInitalizer(node: Node, cache: FileCache, includeExport = false): BingInitalizer | BingInitalizer[] {
		let initializers: BingInitalizer[] = [];
		if (includeExport && isExportAssignment(node)) {
			initializers.push({
				name: 'default',
				root: node,
				initializer: node.expression
			});
		} else if (includeExport && isExportDeclaration(node)) {
			if (node.exportClause) {
				let from = node.moduleSpecifier?.getText().replace(/[\s|'|"]/g, '');
				if (from) {
					from = ParseUtil.getReferPath(node.getSourceFile().fileName, from, cache.getLoaderOptions().extensions);
				}

				if (isNamedExports(node.exportClause)) {
					node.exportClause.elements.forEach((specifier) => {
						const name = specifier.name.getText();
						let initializer;
						if (specifier.propertyName) {
							initializer = specifier.propertyName;
						} else {
							initializer = specifier.name;
						}
						initializers.push({
							name: name,
							root: node,
							from,
							initializer
						});
					});
				} else if (isNamespaceExport(node.exportClause)) {
					const name = node.exportClause.name.getText();
					const firstToken = node.exportClause.getFirstToken();
					if (firstToken && isAsteriskToken(firstToken)) {
						initializers.push({
							name: name,
							root: node,
							from,
							initializer: firstToken
						});
					}
				}
			} else {
				//不支持 export * from './other';
			}
		} else if (isVariableStatement(node)) {
			const keyword = node.modifiers?.filter((modifier) => modifier.kind === SyntaxKind.ExportKeyword);
			if (!(keyword && keyword.length > 0 && !includeExport)) {
				node.declarationList.declarations.forEach((declaration) => {
					const name = declaration.name.getText();
					if (declaration.initializer) {
						initializers.push({
							name: name,
							root: node,
							initializer: declaration.initializer
						});
					}
				});
			}
		} else if (isFunctionDeclaration(node) || isClassDeclaration(node)) {
			const keyword = node.modifiers?.filter((modifier) => modifier.kind === SyntaxKind.ExportKeyword);
			const name = node.name?.getText();
			if (name && !(keyword && keyword.length > 0 && !includeExport)) {
				initializers.push({
					name: name,
					root: node,
					initializer: node
				});
			}
		}

		initializers = initializers.map((initializer) => ParseUtil.operatorNest(initializer, cache));

		return initializers.length == 1 ? initializers[0] : initializers;
	}

	static operatorNest(bindInitalizer: BingInitalizer, cache: FileCache): BingInitalizer {
		if (!isMap(bindInitalizer.initializer)) {
			if (bindInitalizer.from && bindInitalizer.initializer) {
				const loaderOptions = cache.getLoaderOptions();
				const otherFileCache = new FileCache(bindInitalizer.from, loaderOptions);
				const otherFileExports = otherFileCache.getLocalExports();
				if (isIdentifier(bindInitalizer.initializer)) {
					const _initializer = otherFileExports.get(bindInitalizer.initializer.getText())?.initializer;
					if (_initializer) {
						bindInitalizer.initializer = _initializer;
					}
				} else if (isAsteriskToken(bindInitalizer.initializer)) {
					bindInitalizer.initializer = ParseUtil.mapInitializerToMapNode(otherFileExports);
				}
			} else if (isAsExpression(bindInitalizer.initializer)) {
				if (isObjectLiteralExpression(bindInitalizer.initializer.expression)) {
					bindInitalizer.initializer = ParseUtil.operatorObjectLiteralExpression(bindInitalizer.initializer.expression, cache);
				}
			} else if (isObjectLiteralExpression(bindInitalizer.initializer)) {
				bindInitalizer.initializer = ParseUtil.operatorObjectLiteralExpression(bindInitalizer.initializer, cache);
			}
		}

		return bindInitalizer;
	}

	static operatorObjectLiteralExpression(expression: ObjectLiteralExpression, cache: FileCache) {
		const adds: ObjectLiteralElementLike[] = [];
		const properties: ObjectLiteralElementLike[] = [];
		expression.properties.forEach((property) => {
			if (isSpreadAssignment(property)) {
				let _properties: NodeArray<ObjectLiteralElementLike> | undefined;
				const _initalizer = ParseUtil.getInitalizer(property.expression.getText(), cache);
				if (_initalizer?.initializer && !isMap(_initalizer?.initializer)) {
					if (isAsExpression(_initalizer?.initializer) && isObjectLiteralExpression(_initalizer?.initializer.expression)) {
						_properties = _initalizer?.initializer.expression.properties;
					} else if (isObjectLiteralExpression(_initalizer?.initializer)) {
						_properties = _initalizer?.initializer.properties;
					}
				}
				if (_properties) {
					adds.push(..._properties);
				}
			} else {
				properties.push(property);
			}
		});
		if (adds.length > 0) {
			return factory.createObjectLiteralExpression([...adds, ...properties]);
		} else return expression;
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
