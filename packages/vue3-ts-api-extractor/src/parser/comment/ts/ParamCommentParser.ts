import { ParameterDeclaration } from 'typescript';
import { Context } from '../../../common/Context';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { ScriptStructure } from '../../node/ScriptStructure';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { ParamComment } from '../node/ParamComment';
import { TypeComment } from '../node/TypeComment';

export class ParamCommentParser extends AbstractCommentParser<ParamComment> {
    private _typeParser;
    constructor(typeParser: AbstractCommentParser<TypeComment>, structure: ScriptStructure, context: Context) {
        super(structure, context);
        this._typeParser = typeParser;
    }

    parse(node: ParameterDeclaration): ParamComment {
        this._typeParser.init();

        const jsdocs = JsdocUtils.getJsDoc(node);
        const jsdoc = jsdocs[0];

        const comment = new ParamComment(node.name.getText(), node.type ? this._typeParser.parse(node.type) : TypeComment.anyType, !node.questionToken);

        if (jsdoc) {
            comment.description = JsdocUtils.getDescription(jsdoc);
        }
        return comment;
    }
}
