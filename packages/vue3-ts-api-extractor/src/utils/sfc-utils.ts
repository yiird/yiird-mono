import { AttributeNode, CommentNode, DirectiveNode, Node as TemplateNode, NodeTypes, SimpleExpressionNode } from '@vue/compiler-core';
import { getJSDocPrivateTag, getTextOfJSDocComment, isJSDoc, isJSDocPropertyTag, isJSDocTypedefTag, isJSDocTypeLiteral, JSDoc, JSDocTag, JSDocTypedefTag, Node } from 'typescript';
import { PropertyComment } from '../types';

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

	static getTypeDef = (type: string, docs: JSDoc[]): PropertyComment[] => {
		let defTypeTag: JSDocTypedefTag | undefined;
		const properties: PropertyComment[] = [];
		docs.forEach((doc) => {
			doc.tags?.forEach((tag) => {
				if (isJSDocTypedefTag(tag) && tag.name?.text === type) {
					defTypeTag = tag;
				}
			});
		});

		if (defTypeTag) {
			const typeExpression = defTypeTag.typeExpression;
			if (typeExpression && isJSDocTypeLiteral(typeExpression)) {
				typeExpression.jsDocPropertyTags?.forEach((propertyTag) => {
					if (isJSDocPropertyTag(propertyTag)) {
						const property: PropertyComment = {
							name: propertyTag.name.getText(),
							type: '',
							description: SfcUtil.getDescription(propertyTag)
						};
						const type = propertyTag.typeExpression?.type.getText();
						if (type) {
							const nestProperties = SfcUtil.getTypeDef(type, docs);
							property.type = nestProperties.length > 0 ? nestProperties : type;
						}
						properties.push(property);
					}
				});
			}
		}
		return properties;
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
