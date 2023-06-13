import ts, { Node, PropertySignature } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { NodeUtils } from '../../../common/NodeUtils';
import { Utils } from '../../../common/Utils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { PropertyComment } from '../node/PropertyComment';
import { AssociationType, TypeComment } from '../node/TypeComment';

export class TypeCommentParser extends AbstractCommentParser<TypeComment> {
    recursionTimes: Record<string, Record<string, number>> = {};
    types: Record<string, Record<string, TypeComment>> = {};
    init() {
        this.recursionTimes = {};
        this.types = {};
    }
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

        return comment;
    }

    parseProperty(node: PropertySignature): PropertyComment {
        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];
        const comment = new PropertyComment();
        comment.name = node.name.getText();
        const typeName = node.type?.getText();
        const _recursionTimes = typeName ? this.getRecursionTimes(node, typeName) : 0;
        const filename = node.getSourceFile().fileName;
        if (_recursionTimes < 20 && typeName) {
            if (!comment.type && node.type) {
                comment.type = this.parse(node.type);
            } else {
                comment.type = this.types[filename][typeName];
            }
        }

        if (jsdoc) {
            comment.description = JsdocUtils.getDescription(jsdoc);
        }
        if (comment.name && typeName) {
            if (!this.recursionTimes[filename]) {
                this.recursionTimes[filename] = {};
            }
            if (!this.types[filename]) {
                this.types[filename] = {};
            }
            const times = this.recursionTimes[filename][typeName];
            if (comment.type && !Utils.isBasicType(typeName)) {
                this.recursionTimes[filename][typeName] = times ? times + 1 : 0;
                this.types[filename][typeName] = comment.type;
            }
        }
        return comment;
    }

    getRecursionTimes(node: Node, name: string) {
        const filename = node.getSourceFile().fileName;
        let times = 0;
        if (this.recursionTimes[filename]) {
            if (!this.recursionTimes[filename][name]) {
                this.recursionTimes[filename][name] = 0;
            }
            if (!Utils.isBasicType(name)) {
                times = this.recursionTimes[filename][name]++;
            }
        }

        return times;
    }
}
