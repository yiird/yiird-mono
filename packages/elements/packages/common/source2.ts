export interface Source {}

type Transformer<D, X> = (d: D) => X;
type Condition<D> = (d: D) => boolean;

export interface IListSource<D> extends Source {
    _data: D[];
    data: () => D[];
    map: <X>(transformer: Transformer<D, X>) => IListSource<X>;
    filter: (condition: Condition<D>) => IListSource<D>;
}

export class ListSource<D> implements IListSource<D> {
    _data: D[];

    constructor(data: D[]) {
        this._data = data;
    }

    data() {
        return this._data;
    }

    map<X>(transformer: Transformer<D, X>) {
        return new ListSource<X>(this._data.map(transformer));
    }

    filter(condition: Condition<D>) {
        this._data = this.data().filter(condition);
        return this;
    }
}
