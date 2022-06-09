import { MdOptions } from './AbstractMdPart';
import { MdSfcPart } from './MdSfcPart';
import { MdTypePart } from './MdTypePart';

export class MdPartFactory {
	static createSfcPart(options: MdOptions) {
		return new MdSfcPart(options);
	}

	static createTypePart(options: MdOptions) {
		return new MdTypePart(options);
	}
}
