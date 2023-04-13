import { TypeComment } from '../node/TypeComment';
import { BasicComment } from './BasicComment';

export type DefaultValue = {
    condition?: string;
    value: string;
};

export class PropComment extends BasicComment {
    private _type?: TypeComment;
    public get type(): TypeComment | undefined {
        return this._type;
    }
    public set type(value: TypeComment | undefined) {
        this._type = value;
    }
    private _defaultValue?: string | DefaultValue | DefaultValue[] | undefined;
    public get defaultValue(): string | DefaultValue | DefaultValue[] | undefined {
        return this._defaultValue;
    }
    public set defaultValue(value: string | DefaultValue | DefaultValue[] | undefined) {
        this._defaultValue = value;
    }
    private _values?: Array<string> | undefined;
    public get values(): Array<string> | undefined {
        return this._values;
    }
    public set values(value: Array<string> | undefined) {
        this._values = value;
    }
    private _isRequired?: boolean | undefined;
    public get isRequired(): boolean | undefined {
        return this._isRequired;
    }
    public set isRequired(value: boolean | undefined) {
        this._isRequired = value;
    }
    private _isPrivate?: boolean | undefined;
    public get isPrivate(): boolean | undefined {
        return this._isPrivate;
    }
    public set isPrivate(value: boolean | undefined) {
        this._isPrivate = value;
    }
}
