import { Expression, isAsExpression, Node } from 'typescript';
import { FileCache } from './loader';

export class AbstractComment {
	protected _node: Node;
	private _cache: FileCache;
	constructor(node: Node, fileCache: FileCache) {
		this._node = node;
		this._cache = fileCache;
	}

	getTsType(expression: Expression) {
		if (isAsExpression(expression)) {
			return expression.expression.getText();
		} else {
			return expression.getText();
		}
	}
}
