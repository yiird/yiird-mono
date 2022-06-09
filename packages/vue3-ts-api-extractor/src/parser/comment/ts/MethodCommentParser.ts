import ts, { JSDocParameterTag, Node, NodeArray, ParameterDeclaration } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { NodeUtils } from '../../../common/NodeUtils';
import { Utils } from '../../../common/Utils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { MethodComment } from '../basic/MethodComment';
import { CommentParserFactory } from '../CommentParserFactory';
import { ParamComment } from '../node/ParamComment';

export class MethodCommentParser extends AbstractCommentParser<MethodComment | undefined> {
	private _paramParser = CommentParserFactory.createParamParser(this.structure, this.context);
	private _typeParser = CommentParserFactory.createTypeParser(this.structure, this.context);
	parse(node: Node, scope: Node): MethodComment | undefined {
		const comment = new MethodComment();
		const structure = this.getStructureByNode(node);
		comment.text = node.getText();
		if (ts.isPropertyAssignment(node)) {
			if (!ts.isIdentifier(node.initializer)) {
				const _comment = this.parse(node.initializer, scope);
				if (_comment) {
					Utils.assignObject(comment, _comment || {});
					this._handleJsdoc(comment, node);
					return _comment;
				}
			} else {
				if (structure) {
					const scriptNode = this.getNodeByName(node.initializer.text, structure);
					const targetNode = scriptNode?.projection || scriptNode?.root;

					if (targetNode) {
						const _comment = this.parse(targetNode, scope);
						if (_comment) {
							Utils.assignObject(comment, _comment || {});
							this._handleJsdoc(comment, scriptNode.root);
							return comment;
						}
					}
				}
			}
		} else if (ts.isShorthandPropertyAssignment(node)) {
			comment.name = node.name.text;
			if (scope) {
				const scriptNode = NodeUtils.getScopeDeclarations(node.name.text, scope);
				if (scriptNode) {
					const targetNode = scriptNode.projection || scriptNode.root;
					if (targetNode) {
						const _comment = this.parse(targetNode, scope);
						if (_comment) {
							Utils.assignObject(comment, _comment || {});
							this._handleJsdoc(comment, scriptNode.root);
							return comment;
						}
					}
				}
			} else if (structure) {
				const scriptNode = this.getNodeByName(node.name.text, structure);
				const targetNode = scriptNode?.projection || scriptNode?.root;
				if (targetNode) {
					const _comment = this.parse(targetNode, scriptNode.root);
					if (_comment) {
						Utils.assignObject(comment, _comment || {});
						this._handleJsdoc(comment, targetNode);
						return comment;
					}
				}
			}
		} else if (ts.isFunctionExpression(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node)) {
			comment.name = node.name?.getText();
			comment.parameterNodes = node.parameters;
			this._handleJsdoc(comment, node);
			if (node.type) {
				comment.returnType = this._typeParser.parse(node.type);
			}

			return comment;
		}
	}

	private _handleParam(parameters: NodeArray<ParameterDeclaration>, tags: Map<string, JSDocParameterTag>) {
		const params: ParamComment[] = [];
		parameters.forEach((param) => {
			const paramComment = this._paramParser.parse(param);
			if (paramComment.name) {
				const _paramTag = tags.get(paramComment.name);
				if (_paramTag) {
					paramComment.description = JsdocUtils.getDescription(_paramTag);
				}
			}
			params.push(paramComment);
		});
		return params;
	}

	private _handleJsdoc(comment: MethodComment, root: Node) {
		const jsdocs = JsdocUtils.getJsDoc(root);
		const jsdoc = jsdocs[0];

		if (jsdoc) {
			if (comment.parameterNodes) {
				const paramTags = JsdocUtils.getParamTags(jsdoc);
				comment.parameters = this._handleParam(comment.parameterNodes, paramTags);
			}
			comment.description = JsdocUtils.getDescription(jsdoc);
			const privateTag = JsdocUtils.getTag('private', jsdoc);
			comment.isPrivate = !!privateTag;
		}
	}
}
