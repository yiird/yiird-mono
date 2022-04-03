import { AttributeNode, CommentNode, DirectiveNode, Node as TemplateNode, NodeTypes, SimpleExpressionNode } from '@vue/compiler-core';
import {
	getJSDocPrivateTag,
	getTextOfJSDocComment,
	isJSDoc,
	isJSDocPropertyTag,
	isJSDocTypedefTag,
	isJSDocTypeLiteral,
	JSDoc,
	JSDocParameterTag,
	JSDocPropertyTag,
	JSDocTag,
	JSDocTypedefTag,
	JSDocTypeExpression,
	Node
} from 'typescript';
import { TypeComment } from '../types';

export class SfcUtil {
	static getJsDoc = (node: Node) => {
		const docs: JSDoc[] = [];
		node.getChildren().forEach((child) => {
			if (isJSDoc(child)) {
				docs.push(child);
			}
		});
		return docs;
	};

	static getDescription = (doc: JSDoc | JSDocTag) => {
		return getTextOfJSDocComment(doc.comment);
	};
	static getPrivate = (doc: JSDoc) => {
		return !!getJSDocPrivateTag(doc);
	};

	static getTag = (tagName: string, doc: JSDoc) => {
		return doc.tags?.find((tag) => tag.tagName.text === tagName);
	};

	static getTags = (tagName: string, doc: JSDoc) => {
		return doc.tags?.filter((tag) => tag.tagName.text === tagName);
	};

	static getTypeDef = (typeName: string, docs: JSDoc[]): JSDocTypedefTag | undefined => {
		let defType;
		docs.forEach((doc) => {
			doc.tags?.forEach((tag) => {
				if (isJSDocTypedefTag(tag) && tag.name?.text === typeName) {
					defType = tag;
				}
			});
		});
		return defType;
	};

	static getPropertyComment(properTypeTag: JSDocPropertyTag, docs: JSDoc[]): TypeComment {
		const type = properTypeTag.typeExpression?.type.getText();
		const paramComment: TypeComment = {
			name: properTypeTag.name.getText(),
			type,
			description: SfcUtil.getDescription(properTypeTag),
			children: []
		};

		if (type) {
			const defType = SfcUtil.getTypeDef(type, docs);
			if (defType?.typeExpression && isJSDocTypeLiteral(defType.typeExpression)) {
				paramComment.description = SfcUtil.getDescription(defType);
				defType.typeExpression.jsDocPropertyTags?.forEach((propertyTag) => {
					if (isJSDocPropertyTag(propertyTag) && propertyTag.typeExpression) {
						paramComment.children.push(SfcUtil.getPropertyComment(propertyTag, docs));
					}
				});
			}
		}
		return paramComment;
	}

	static getParamTypeComment = (typeExpression: JSDocTypeExpression, docs: JSDoc[]): TypeComment | string => {
		const type = typeExpression.type.getText();
		const defType = SfcUtil.getTypeDef(type, docs);
		if (defType && defType.name) {
			const typeComment: TypeComment = {
				name: (<JSDocParameterTag>typeExpression.parent).name.getText(),
				type: defType.name.text,
				description: SfcUtil.getDescription(defType),
				children: []
			};
			if (defType.typeExpression && isJSDocTypeLiteral(defType.typeExpression)) {
				defType.typeExpression.jsDocPropertyTags?.forEach((propertyTag) => {
					if (isJSDocPropertyTag(propertyTag)) {
						typeComment.children.push(SfcUtil.getPropertyComment(propertyTag, docs));
					}
				});
			}
			return typeComment;
		}
		return type;
	};

	static isAttributeNode(node: TemplateNode): node is AttributeNode {
		return node.type === NodeTypes.ATTRIBUTE;
	}

	static isDirectiveNode(node: TemplateNode): node is DirectiveNode {
		return node.type === NodeTypes.DIRECTIVE;
	}

	static isSimpleExpression(node: TemplateNode): node is SimpleExpressionNode {
		return node.type === NodeTypes.SIMPLE_EXPRESSION;
	}

	static isCommentNode(node: TemplateNode): node is CommentNode {
		return node.type === NodeTypes.COMMENT;
	}
}
