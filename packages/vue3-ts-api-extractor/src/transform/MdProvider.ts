import { SfcComment } from '../parser/comment/basic/SfcComment';
import { MdOptions } from '../types';
import { AbstractMdPart } from './md/AbstractMdPart';
import { MdPartFactory } from './md/MdPartFactory';
import { MdStyles } from './md/Style';
import { Provider } from './Provider';

export class MdProvider extends Provider<string> {
    private _options: MdOptions;
    private _handle: AbstractMdPart<SfcComment>;

    constructor(options?: MdOptions) {
        super();
        this._options = Object.assign(
            {
                styles: MdStyles,
                hLevelFrom: 1
            },
            options || {}
        );
        this._handle = MdPartFactory.createSfcPart(this._options);
    }

    to(comment: SfcComment): string {
        return this._handle.toMd(comment, this._options.hLevelFrom);
    }
}
