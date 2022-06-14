import { MdOptions } from '../../types';
import { MdSfcPart } from './MdSfcPart';
import { MdTypePart } from './MdTypePart';

export class MdPartFactory {
	static createSfcPart(options: MdOptions) {
		return new MdSfcPart(this.createTypePart(options), options);
	}

	static createTypePart(options: MdOptions) {
		return new MdTypePart(options);
	}
}
