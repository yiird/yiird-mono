export abstract class AbstractStructure {
    private _filename: string;

    constructor(filename: string) {
        this._filename = filename;
    }

    get filename() {
        return this._filename;
    }
}
