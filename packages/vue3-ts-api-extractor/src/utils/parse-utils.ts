import { tsquery } from '@phenomnomnominal/tsquery';
import fs from 'fs';
import path from 'path';
import {
	isAsExpression,
	isAsteriskToken,
	isClassDeclaration,
	isExportAssignment,
	isExportDeclaration,
	isFunctionDeclaration,
	isImportDeclaration,
	isNamedExports,
	isNamedImports,
	isNamespaceExport,
	isNamespaceImport,
	isObjectLiteralExpression,
	isSpreadAssignment,
	isVariableStatement,
	Node,
	ScriptKind,
	SyntaxKind
} from 'typescript';
import { DeclarationInitalizer, ExportFromInitalizer, ExportInitalizer, ImportInitalizer, InitalizerType } from '../types';

export class ParseUtil {
	static getSource(filePath: string) {
		return fs.readFileSync(filePath).toString();
	}

	static getAst(filePath: string) {
		const ast = tsquery.ast(ParseUtil.getSource(filePath), filePath, ScriptKind.TSX);
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

	static hasSpreadAssignmentInChildren(expression: Node) {
		return (
			(isObjectLiteralExpression(expression) || (isAsExpression(expression) && isObjectLiteralExpression((expression = expression.expression)))) &&
			expression.properties.find(isSpreadAssignment)
		);
	}

	static promoteObjectInAsExpression(expression: Node): Node {
		return isAsExpression(expression) && isObjectLiteralExpression((expression = expression.expression)) ? expression : expression;
	}

	static nodeToInitalizer(node: Node): Array<DeclarationInitalizer | ExportFromInitalizer | ExportInitalizer | ImportInitalizer> {
		const bingInitializers = [],
			root = node;
		if (isExportAssignment(root)) {
			const initalizer: ExportInitalizer = {
				kind: InitalizerType.EXPORT,
				name: 'default',
				root,
				node: root.expression
			};
			bingInitializers.push(initalizer);
		} else if (isExportDeclaration(root)) {
			if (root.exportClause && root.moduleSpecifier) {
				const from = root.moduleSpecifier.getText().replace(/[\s|'|"]/g, '');
				if (isNamedExports(root.exportClause)) {
					root.exportClause.elements.forEach((specifier) => {
						const name = specifier.name.getText();
						let importedName;
						if (specifier.propertyName) {
							importedName = specifier.propertyName.text;
						} else {
							importedName = specifier.name.text;
						}
						const initalizer: ExportFromInitalizer = {
							kind: InitalizerType.EXPORT_FROM,
							from,
							importedName,
							name,
							root
						};
						bingInitializers.push(initalizer);
					});
				} else if (isNamespaceExport(root.exportClause)) {
					const name = root.exportClause.name.getText();
					const firstToken = root.exportClause.getFirstToken();
					if (firstToken && isAsteriskToken(firstToken)) {
						const initalizer: ExportFromInitalizer = {
							kind: InitalizerType.EXPORT_FROM,
							from,
							importedName: '*',
							name,
							root
						};
						bingInitializers.push(initalizer);
					}
				}
			} else {
				//不支持 export * from './other';
			}
		} else if (isVariableStatement(root)) {
			const declarations = root.declarationList.declarations;
			if (ParseUtil.isItExport(root)) {
				declarations.forEach((declaration) => {
					const name = declaration.name.getText();
					if (declaration.initializer) {
						const initalizer: ExportInitalizer = {
							kind: InitalizerType.EXPORT,
							name,
							root,
							node: declaration.initializer
						};

						bingInitializers.push(initalizer);
					}
				});
			} else {
				declarations.forEach((declaration) => {
					const name = declaration.name.getText();
					if (declaration.initializer) {
						const initalizer: DeclarationInitalizer = {
							kind: InitalizerType.DECLARATION,
							name,
							root,
							node: declaration.initializer
						};

						bingInitializers.push(initalizer);
					}
				});
			}
		} else if (isFunctionDeclaration(root) || isClassDeclaration(root)) {
			const name = root.name?.getText();
			if (name) {
				if (ParseUtil.isItExport(root)) {
					const initalizer: ExportInitalizer = {
						kind: InitalizerType.EXPORT,
						name,
						root,
						node: root
					};
					bingInitializers.push(initalizer);
				} else {
					const initalizer: DeclarationInitalizer = {
						kind: InitalizerType.DECLARATION,
						name,
						root,
						node: root
					};
					bingInitializers.push(initalizer);
				}
			}
		} else if (isImportDeclaration(root)) {
			const importClause = root.importClause;
			const from = root.moduleSpecifier.getText().replace(/[\s|'|"]/g, '');

			if (importClause) {
				if (importClause.name) {
					const name = importClause.name.getText();
					const initalizer: ImportInitalizer = {
						kind: InitalizerType.IMPORT,
						name,
						importedName: name,
						root,
						from
					};
					bingInitializers.push(initalizer);
				} else if (importClause.namedBindings) {
					const namedBindings = importClause.namedBindings;
					if (namedBindings) {
						if (isNamedImports(namedBindings)) {
							namedBindings.elements.forEach((item) => {
								const name = item.name.getText();
								let importedName = item.name.getText();
								if (item.propertyName) {
									importedName = item.propertyName.getText();
								}

								const initalizer: ImportInitalizer = {
									kind: InitalizerType.IMPORT,
									name,
									importedName,
									root,
									from
								};
								bingInitializers.push(initalizer);
							});
						} else if (isNamespaceImport(namedBindings)) {
							const name = namedBindings.name.getText();
							const firstToken = namedBindings.getFirstToken();

							if (firstToken && isAsteriskToken(firstToken)) {
								const initalizer: ImportInitalizer = {
									kind: InitalizerType.IMPORT,
									name,
									importedName: '*',
									root,
									from
								};
								bingInitializers.push(initalizer);
							}
						}
					}
				}
			}
		}

		return bingInitializers;
	}

	static isItExport(node: Node): boolean {
		const keyword = node.modifiers?.filter((modifier) => modifier.kind === SyntaxKind.ExportKeyword);
		return !!keyword;
	}

	// static operatorNest(bindInitalizer: BingInitalizer, cache: FileCache): BingInitalizer {
	// 	if (bindInitalizer.initializer && !isMap(bindInitalizer.initializer)) {
	// 		if (bindInitalizer.from && bindInitalizer.initializer) {
	// 			const loaderOptions = cache.getLoaderOptions();
	// 			const otherFileCache = new FileCache(bindInitalizer.from, loaderOptions);
	// 			const otherFileExports = otherFileCache.getLocalExports();
	// 			if (isIdentifier(bindInitalizer.initializer)) {
	// 				const _initializer = otherFileExports.get(bindInitalizer.initializer.getText())?.initializer;
	// 				if (_initializer) {
	// 					bindInitalizer.initializer = _initializer;
	// 				}
	// 			} else if (isAsteriskToken(bindInitalizer.initializer)) {
	// 				bindInitalizer.initializer = ParseUtil.mapInitializerToMapNode(otherFileExports);
	// 			}
	// 		} else if (isAsExpression(bindInitalizer.initializer)) {
	// 			if (isObjectLiteralExpression(bindInitalizer.initializer.expression)) {
	// 				bindInitalizer.initializer = ParseUtil.operatorObjectLiteralExpression(bindInitalizer.initializer.expression, cache);
	// 			}
	// 		} else if (isObjectLiteralExpression(bindInitalizer.initializer)) {
	// 			bindInitalizer.initializer = ParseUtil.operatorObjectLiteralExpression(bindInitalizer.initializer, cache);
	// 		}
	// 	}

	// 	return bindInitalizer;
	// }

	// static operatorObjectLiteralExpression(expression: ObjectLiteralExpression, cache: FileCache) {
	// 	const adds: ObjectLiteralElementLike[] = [];
	// 	const properties: ObjectLiteralElementLike[] = [];
	// 	expression.properties.forEach((property) => {
	// 		if (isSpreadAssignment(property)) {
	// 			let _properties: NodeArray<ObjectLiteralElementLike> | undefined;
	// 			const _initalizer = ParseUtil.getInitalizer(property.expression.getText(), cache);
	// 			if (_initalizer?.initializer && !isMap(_initalizer?.initializer)) {
	// 				if (isAsExpression(_initalizer?.initializer) && isObjectLiteralExpression(_initalizer?.initializer.expression)) {
	// 					_properties = _initalizer?.initializer.expression.properties;
	// 				} else if (isObjectLiteralExpression(_initalizer?.initializer)) {
	// 					_properties = _initalizer?.initializer.properties;
	// 				}
	// 			}
	// 			if (_properties) {
	// 				adds.push(..._properties);
	// 			}
	// 		} else {
	// 			properties.push(property);
	// 		}
	// 	});
	// 	if (adds.length > 0) {
	// 		return factory.createObjectLiteralExpression([...adds, ...properties]);
	// 	} else return expression;
	// }

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
