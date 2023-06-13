import ts, { Node } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { CommentParserFactory } from '../CommentParserFactory';
import { EventComment } from '../basic/EventComment';
import { NodeCommentKind } from '../node/NodeComment';

export class EmitsCommentParser extends AbstractCommentParser<EventComment> {
    private _methodPaser = CommentParserFactory.createMethodParser(this.structure, this.context);

    parse(node: Node): EventComment {
        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];
        const comment = new EventComment();

        if (jsdoc) {
            comment.description = JsdocUtils.getDescription(jsdoc);
            const privateTag = JsdocUtils.getTag('private', jsdoc);
            comment.isPrivate = !!privateTag;
        }

        if (ts.isMethodDeclaration(node)) {
            const _comment = this._methodPaser.parse(node, node.body);
            comment.name = _comment?.name;
            comment.args = _comment?.parameters?.map((param, index) => {
                return {
                    kind: NodeCommentKind.PROPERTY,
                    name: `arg${index}`,
                    type: param.type,
                    description: param.description
                };
            });
        } else if (ts.isPropertyAssignment(node)) {
            comment.name = node.name.getText();
            if (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) {
                const _comment = this._methodPaser.parse(node, node.initializer.body);
                comment.args = _comment?.parameters?.map((param) => {
                    return {
                        kind: NodeCommentKind.PROPERTY,
                        name: param.name,
                        type: param.type,
                        description: param.description
                    };
                });
            } else if (ts.isIdentifier(node.initializer)) {
                const targetNode = this.getNodeByNameAndStructure(node.initializer.text, node.initializer);
                if (targetNode) {
                    const _comment = this.parse(targetNode);

                    if (_comment.description) {
                        comment.description = _comment.description;
                    }

                    comment.args = _comment.args;

                    comment.isPrivate = _comment.isPrivate;
                }
            }
        }

        return comment;
    }
}
