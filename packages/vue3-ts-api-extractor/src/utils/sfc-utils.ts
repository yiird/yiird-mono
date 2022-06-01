import { AttributeNode, CommentNode, DirectiveNode, Node as TemplateNode, NodeTypes, SimpleExpressionNode } from '@vue/compiler-core';
import {
	getJSDocPrivateTag,
	getTextOfJSDocComment,
	isJSDoc,
	isJSDocTypedefTag,
	isJSDocTypeLiteral,
	JSDoc,
	JSDocPropertyLikeTag,
	JSDocTag,
	JSDocTypedefTag,
	JSDocTypeExpression,
	Node
} from 'typescript';
import { ParamComment, TypeComment } from '../types';

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

	static getAllTypeDef(jsDocs: JSDoc[]): Map<string, JSDocTypedefTag> {
		const map = new Map<string, JSDocTypedefTag>();
		jsDocs.forEach((doc) => {
			doc.tags?.forEach((tag) => {
				if (isJSDocTypedefTag(tag) && tag.name) {
					map.set(tag.name.text, tag);
				}
			});
		});
		return map;
	}

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

	static getTypeComment(typeExpression: JSDocTypeExpression, docs: JSDoc[]): TypeComment | string {
		const type = typeExpression.type.getText();

		const defType = SfcUtil.getTypeDef(type, docs);
		if (defType) {
			const typeComment: TypeComment = {
				name: type,
				description: SfcUtil.getDescription(defType),
				children: []
			};
			if (defType.typeExpression && isJSDocTypeLiteral(defType.typeExpression)) {
				defType.typeExpression.jsDocPropertyTags?.forEach((propertyTag) => {
					typeComment.children.push(SfcUtil.getParamComment(propertyTag, docs));
				});
			}
			return typeComment;
		} else {
			return type;
		}
	}

	static getParamComment(param: JSDocPropertyLikeTag, docs: JSDoc[]): ParamComment {
		const paramComment: ParamComment = {
			required: false,
			name: param.name.getText(),
			type: param.typeExpression ? SfcUtil.getTypeComment(param.typeExpression, docs) : undefined,
			description: SfcUtil.getDescription(param)
		};
		return paramComment;
	}

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
