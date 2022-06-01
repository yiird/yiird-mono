import { JsdocUtils } from '@src/news/common/JsdocUtils';
import ts, { Node } from 'typescript';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { EventComment } from '../basic/EventComment';
import { CommentParserFactory } from '../CommentParserFactory';
import { PropertyComment } from '../node/PropertyComment';

export class EventCommentParser extends AbstractCommentParser<EventComment> {
	private _typeParser = CommentParserFactory.createTypeParser(this.structure, this.context);

	parse(node: Node): EventComment {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		const comment = new EventComment();
		const paramTags = Array.of(...JsdocUtils.getParamTags(jsdoc).values());

		if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
			const _arguments = node.expression.arguments;
			const arg0 = _arguments[0];
			if (ts.isStringLiteral(arg0)) {
				comment.name = arg0.text;
			} else if (ts.isPropertyAccessExpression(arg0)) {
				// todo 待处理 a.b.c 所代指的事件类型字符串
				comment.name = arg0.getText();
			}

			if (_arguments.length > 1) {
				const args: PropertyComment[] = [];
				for (let i = 1; i < _arguments.length; i++) {
					const argComment = new PropertyComment();
					argComment.name = `arg${i - 1}`;
					const paramTag = paramTags[i - 1];
					if (paramTag) {
						argComment.description = JsdocUtils.getDescription(paramTag);
						const type = paramTag.typeExpression?.type;
						if (type) {
							argComment.type = this._typeParser.parse(type);
						}
					}
					args.push(argComment);
				}
				comment.args = args;
			}
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
		}

		return comment;
	}
}
