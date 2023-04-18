import { BasicComment } from './BasicComment';
import { EventComment } from './EventComment';
import { MethodComment } from './MethodComment';
import { PropComment } from './PropComment';
import { SlotComment } from './SlotComment';

export class SfcComment extends BasicComment {
    private _additional?: string[];
    private _vitepress_frontmatter?: string;
    private _author?: string;
    private _date?: string;

    private _methods?: Array<MethodComment> | undefined;

    private _props?: Array<PropComment> | undefined;

    private _slots?: Array<SlotComment> | undefined;

    private _events?: Array<EventComment> | undefined;

    public get additional(): string[] | undefined {
        return this._additional;
    }
    public set additional(value: string[] | undefined) {
        this._additional = value;
    }

    public get vitepress_frontmatter(): string | undefined {
        return this._vitepress_frontmatter;
    }
    public set vitepress_frontmatter(value: string | undefined) {
        this._vitepress_frontmatter = value;
    }

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
