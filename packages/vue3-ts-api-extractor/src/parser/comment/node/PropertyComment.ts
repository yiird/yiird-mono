import { NodeComment, NodeCommentKind } from './NodeComment';
import { TypeComment } from './TypeComment';

export class PropertyComment extends NodeComment {
    public kind: NodeCommentKind = NodeCommentKind.PROPERTY;
    private _type?: TypeComment;
    public get type(): TypeComment | undefined {
        return this._type;
    }
    public set type(value: TypeComment | undefined) {
        this._type = value;
    }
}
