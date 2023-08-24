import ts, { Node, NodeArray, ParameterDeclaration, PropertySignature } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { NodeUtils } from '../../../common/NodeUtils';
import { Utils } from '../../../common/Utils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { NodeCommentParserFactory } from '../NodeCommentParserFactory';
import { ParamComment } from '../node/ParamComment';
import { PropertyComment } from '../node/PropertyComment';
import { AssociationType, TypeComment } from '../node/TypeComment';

export class TypeCommentParser extends AbstractCommentParser<TypeComment> {
    static types: Record<string, Record<string, TypeComment>> = {};

    parse(node: Node): TypeComment {
        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];
        let comment = new TypeComment();
        if (ts.isTypeReferenceNode(node)) {
            if (Utils.isBasicType(node.typeName.getText()) && node.typeArguments) {
                const _comment = this.parse(node.typeArguments[0]);
                Utils.assignObject(comment, _comment);
            } else {
                comment = this.parse(node.typeName);
                if (!comment.isFunctionType) {
                    comment.text = node.getText();
                }
                if (node.typeArguments && node.typeArguments.length > 0) {
                    const typeArguments: TypeComment[] = [];
                    node.typeArguments.forEach((arg) => {
                        typeArguments.push(this.parse(arg));
                    });
                    comment.typeArguments = typeArguments;
                }
            }
        } else if (ts.isTypeAliasDeclaration(node)) {
            const _comment = this.parse(node.type);
            Utils.assignObject(comment, _comment);
        } else if (ts.isAsExpression(node)) {
            comment = this.parse(node.type);
            comment.text = node.type.getText();
        } else if (ts.isArrayTypeNode(node)) {
            comment.name = 'Array';
            comment.text = node.getText();
            const _comment = this.parse(node.elementType);
            comment.typeArguments = [_comment];
        } else if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
            comment.associationType = ts.isUnionTypeNode(node) ? AssociationType.union : AssociationType.intersection;
            const associations: TypeComment[] = [];
            node.types.forEach((_type) => {
                associations.push(this.parse(_type));
            });
            comment.associations = associations;
            comment.text = node.getText();
        } else if (ts.isTypeLiteralNode(node)) {
            const properties: PropertyComment[] = [];
            node.members.forEach((member) => {
                if (ts.isPropertySignature(member)) {
                    properties.push(this.parseProperty(member));
                }
            });
            comment.properties = properties;
        } else if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
            comment.name = node.name?.text;
            const properties: PropertyComment[] = [];

            if (node.heritageClauses) {
                node.heritageClauses.forEach((heritageClause) => {
                    heritageClause.types.forEach((_type) => {
                        if (ts.isIdentifier(_type.expression)) {
                            const _comment = this.parse(_type.expression);
                            if (_comment.properties) {
                                properties.push(..._comment.properties);
                            }
                        }
                    });
                });
            }

            node.members.forEach((member) => {
                if (ts.isPropertySignature(member)) {
                    properties.push(this.parseProperty(member));
                }
            });

            comment.properties = properties;
            comment.text = comment.name;
        } else if (ts.isFunctionTypeNode(node)) {
            comment.text = node.getText();
            comment.isFunctionType = true;
            comment.functionParams = this._handleParam(node.parameters);
            comment.functionReturnType = this.parse(node.type);
        } else if (ts.isIdentifier(node)) {
            comment.name = node.text;
            comment.text = node.text;
            if (!Utils.isBasicType(node.text)) {
                const structure = this.getStructureByNode(node);
                if (structure) {
                    const targetNode = this.getNodeByName(node.text, structure);
                    if (targetNode) {
                        const _comment = this.parse(targetNode.root);
                        Utils.assignObject(comment, _comment);
                    }
                }
            }
        } else {
            if (ts.isLiteralTypeNode(node)) {
                comment.isLiteralType = true;
            }
            comment.name = NodeUtils.getText(node);
            comment.text = comment.name;
        }
        if (jsdoc) {
            comment.description = JsdocUtils.getDescription(jsdoc);
        }

        const filename = this.structure.filename;
        if (!TypeCommentParser.types[filename]) {
            TypeCommentParser.types[filename] = {};
        }

        this.cacheType(comment, comment.name === 'Array');

        comment.properties?.forEach((property) => {
            if (property.typeName?.includes('Array') || property.typeName?.includes('[]')) {
                if (TypeCommentParser.types[filename][property.typeName]) {
                    property.type = TypeCommentParser.types[filename][property.typeName];
                }
            } else if (property.isIgnore) {
                if (property.typeName && TypeCommentParser.types[filename][property.typeName]) {
                    property.type = TypeCommentParser.types[filename][property.typeName];
                }
            }
        });
        return comment;
    }

    private _handleParam(parameters: NodeArray<ParameterDeclaration>) {
        const params: ParamComment[] = [];

        const _paramParser = NodeCommentParserFactory.createParamParser(this.structure, this.context);
        parameters.forEach((param) => {
            params.push(_paramParser.parse(param));
        });
        return params;
    }

    parseProperty(node: PropertySignature): PropertyComment {
        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];
        const comment = new PropertyComment();
        comment.name = node.name.getText();
        comment.isRequired = !node.questionToken;
        const typeName = node.type?.getText();

        comment.isIgnore = false;

        if (jsdoc) {
            const isPrivate = JsdocUtils.getTag('private', jsdoc);
            comment.isPrivate = !!isPrivate;
            comment.description = JsdocUtils.getDescription(jsdoc);
            const isIgnore = JsdocUtils.getTag('ignore', jsdoc);
            comment.isIgnore = !!isIgnore;
            if (!isIgnore && node.type) {
                comment.type = this.parse(node.type);
            } else {
                comment.typeName = typeName;
            }
        }

        return comment;
    }

    cacheType(comment: TypeComment, isArray: boolean) {
        const filename = this.structure.filename;
        if (comment.name) {
            if (isArray) {
                const name = comment.typeArguments?.map((typeArg) => typeArg.name).join(',');
                TypeCommentParser.types[filename][`Array<${name}>`] = comment;
                TypeCommentParser.types[filename][`${name}[]`] = comment;
            } else {
                TypeCommentParser.types[filename][comment.name] = comment;
            }
        }
    }
}
