import { JsdocUtils } from '@src/news/common/JsdocUtils';
import ts, { Expression, ObjectLiteralElementLike, PropertyAssignment, SyntaxKind } from 'typescript';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { PropComment } from '../basic/PropComment';
import { CommentParserFactory } from '../CommentParserFactory';
import { AssociationType } from '../node/TypeComment';

export class PropCommentParser extends AbstractCommentParser<PropComment> {
	private _typeParser = CommentParserFactory.createTypeParser(this.structure, this.context);
	parse(node: Expression | ObjectLiteralElementLike) {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		const comment = new PropComment();

		if (ts.isStringLiteral(node)) {
			// Prop 为字符串
			comment.name = node.text;
		} else if (ts.isPropertyAssignment(node)) {
			// Prop 为对象选项
			comment.name = node.name.getText();
			if (ts.isIdentifier(node.initializer) || ts.isAsExpression(node.initializer)) {
				// 对象选项值为标识，则认为此值为类型
				comment.type = this._handleType(node);
			} else if (ts.isObjectLiteralExpression(node.initializer)) {
				// 对象选项值为对象，则认为此对象为 PropType 对象类型，包含type,required,default
				node.initializer.properties.forEach((property) => {
					if (ts.isPropertyAssignment(property)) {
						switch (property.name.getText()) {
							case 'type': {
								comment.type = this._handleType(property);
								break;
							}
							case 'required': {
								comment.isRequired = property.initializer.kind === SyntaxKind.TrueKeyword;
								break;
							}
							case 'default': {
								if (ts.isLiteralExpression(property.initializer)) {
									comment.defaultValue = property.initializer.text;
								} else {
									comment.defaultValue = property.initializer.getText();
								}
								break;
							}
						}
					} else if (ts.isMethodDeclaration(property)) {
						if (property.name.getText() === 'default') {
							comment.defaultValue = property.getText();
						}
					}
				});
			}
		}

		if (comment.type && comment.type.typeArguments) {
			const _typeArg = comment.type.typeArguments[0];
			if (_typeArg && _typeArg.associationType === AssociationType.union) {
				comment.values = _typeArg.associations?.map((association) => association.name + '');
			}
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
			const privateTag = JsdocUtils.getTag('private', jsdoc);
			comment.isPrivate = !!privateTag;
			const valuesTag = JsdocUtils.getTag('values', jsdoc);
			if (valuesTag) {
				const valuesStr = JsdocUtils.getDescription(valuesTag);
				comment.values = valuesStr?.includes(',') ? valuesStr.split(',') : valuesStr?.split(' ');
			}
			comment.isRequired = !!comment.isRequired;
		} else {
			comment.isPrivate = false;
			comment.isRequired = false;
		}

		return comment;
	}
	private _handleType(inputNode: PropertyAssignment) {
		const comment = this._typeParser.parse(inputNode.initializer);
		if (comment.name === 'PropType') {
			if (ts.isAsExpression(inputNode.initializer)) {
				comment.name = inputNode.initializer.expression.getText();
			}
		}
		return comment;
	}
}
