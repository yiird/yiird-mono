import { SfcComment } from '../parser/comment/basic/SfcComment';
import { AbstractMdPart, MdOptions } from './md/AbstractMdPart';
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
				styles: MdStyles
			},
			options || {}
		);
		this._handle = MdPartFactory.createSfcPart(this._options);
	}

	to(comment: SfcComment): string {
		return this._handle.toMd(comment, 3);
	}
}
