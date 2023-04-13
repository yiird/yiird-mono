import { PropertyComment } from '../node/PropertyComment';
import { BasicComment } from './BasicComment';

export class EventComment extends BasicComment {
    private _args?: Array<PropertyComment>;
    private _isPriavte?: boolean;
    public get args(): Array<PropertyComment> | undefined {
        return this._args;
    }
    public set args(value: Array<PropertyComment> | undefined) {
        this._args = value;
    }

    public get isPrivate(): boolean | undefined {
        return this._isPriavte;
    }
    public set isPrivate(value: boolean | undefined) {
        this._isPriavte = value;
    }
}
