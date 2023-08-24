import { NodeComment, NodeCommentKind } from './NodeComment';
import { TypeComment } from './TypeComment';

export class PropertyComment extends NodeComment {
    public kind: NodeCommentKind = NodeCommentKind.PROPERTY;
    private _type?: TypeComment;
    private _isRequired?: boolean;
    private _isIgnore?: boolean;
    private _typeName?: string;
    private _isPrivate?: boolean = false;
    public get type(): TypeComment | undefined {
        return this._type;
    }
    public set type(value: TypeComment | undefined) {
        this._type = value;
    }
    /**
     * Getter isRequired
     * @return {boolean}
     */
    public get isRequired(): boolean | undefined {
        return this._isRequired;
    }

    /**
     * Setter isRequired
     * @param {boolean} value
     */
    public set isRequired(value: boolean | undefined) {
        this._isRequired = value;
    }
    /**
     * Getter isIgnore
     * @return {boolean}
     */
    public get isIgnore(): boolean | undefined {
        return this._isIgnore;
    }

    /**
     * Setter isIgnore
     * @param {boolean} value
     */
    public set isIgnore(value: boolean | undefined) {
        this._isIgnore = value;
    }
    /**
     * Getter typeName
     * @return {string}
     */
    public get typeName(): string | undefined {
        return this._typeName;
    }

    /**
     * Setter typeName
     * @param {string} value
     */
    public set typeName(value: string | undefined) {
        this._typeName = value;
    }
    /**
     * Getter isPrivate
     * @return {boolean}
     */
    public get isPrivate(): boolean | undefined {
        return this._isPrivate;
    }

    /**
     * Setter isPrivate
     * @param {boolean} value
     */
    public set isPrivate(value: boolean | undefined) {
        this._isPrivate = value;
    }
}
