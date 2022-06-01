import { JsdocUtils } from '@src/news/common/JsdocUtils';
import { PropertySignature } from 'typescript';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { CommentParserFactory } from '../CommentParserFactory';
import { PropertyComment } from '../node/PropertyComment';

export class PropertyCommentParser extends AbstractCommentParser<PropertyComment> {
	parse(node: PropertySignature): PropertyComment {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		const comment = new PropertyComment();
		comment.name = node.name.getText();
		if (node.type) {
			const typeParser = CommentParserFactory.createTypeParser(this.structure, this.context);
			comment.type = typeParser.parse(node.type);
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
		}
		return comment;
	}
}
