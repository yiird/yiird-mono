import { AbstractNode } from '@src/common/AbstractNode';
import { AbstractCommentParser } from './AbstractCommentParser';
import { BasicComment } from './basic/BasicComment';

export class NothingCommentParser extends AbstractCommentParser<BasicComment> {
	parse(node: AbstractNode): BasicComment {
		throw new Error('没有匹配的解析器');
	}
}
