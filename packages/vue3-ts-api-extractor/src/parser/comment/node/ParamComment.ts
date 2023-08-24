import { NodeComment, NodeCommentKind } from './NodeComment';
import { TypeComment } from './TypeComment';

export class ParamComment extends NodeComment {
    public kind: NodeCommentKind = NodeCommentKind.PARAM;
    private _type: TypeComment = new TypeComment('any');
    private _isRequired: boolean;

    constructor(name: string, type: TypeComment, isRequired: boolean) {
        super(name);
        this._type = type;
        this._isRequired = isRequired;
    }

    /**
     * Getter type
     * @return {TypeComment}
     */
    public get type(): TypeComment {
        return this._type;
    }

    /**
     * Setter type
     * @param {TypeComment} value
     */
    public set type(value: TypeComment) {
        this._type = value;
    }

    /**
     * Getter isRequired
     * @return {boolean}
     */
    public get isRequired(): boolean {
        return this._isRequired;
    }

    /**
     * Setter isRequired
     * @param {boolean} value
     */
    public set isRequired(value: boolean) {
        this._isRequired = value;
    }
}
