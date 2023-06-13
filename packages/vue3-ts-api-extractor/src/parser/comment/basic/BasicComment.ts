export enum BasicCommentKind {
    BASIC,
    EVENT,
    PROP,
    METHOD,
    SLOT,
    SFC
}

export abstract class BasicComment {
    public kind: BasicCommentKind = BasicCommentKind.BASIC;

    private _name?: string | undefined;
    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }
    private _description?: string | undefined;
    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }
    constructor(name?: string, description?: string) {
        this._name = name;
        this._description = description;
    }
}
