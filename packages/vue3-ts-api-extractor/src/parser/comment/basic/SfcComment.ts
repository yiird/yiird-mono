import { BasicComment } from './BasicComment';
import { EventComment } from './EventComment';
import { MethodComment } from './MethodComment';
import { PropComment } from './PropComment';
import { SlotComment } from './SlotComment';

export class SfcComment extends BasicComment {
    private _author?: string | undefined;
    private _date?: string | undefined;

    private _methods?: Array<MethodComment> | undefined;

    private _props?: Array<PropComment> | undefined;

    private _slots?: Array<SlotComment> | undefined;

    private _events?: Array<EventComment> | undefined;

    public get author(): string | undefined {
        return this._author;
    }
    public set author(value: string | undefined) {
        this._author = value;
    }
    public get events(): Array<EventComment> | undefined {
        return this._events;
    }
    public set events(value: Array<EventComment> | undefined) {
        this._events = value;
    }
    public get slots(): Array<SlotComment> | undefined {
        return this._slots;
    }
    public set slots(value: Array<SlotComment> | undefined) {
        this._slots = value;
    }

    public get props(): Array<PropComment> | undefined {
        return this._props;
    }
    public set props(value: Array<PropComment> | undefined) {
        this._props = value;
    }

    public get methods(): Array<MethodComment> | undefined {
        return this._methods;
    }
    public set methods(value: Array<MethodComment> | undefined) {
        this._methods = value;
    }

    public get date(): string | undefined {
        return this._date;
    }
    public set date(value: string | undefined) {
        this._date = value;
    }
}
