import { MdOptions } from '../../types';
import { MdSfcPart } from './MdSfcPart';
import { MdTypePart } from './MdTypePart';
import { MdTypeTextPart } from './MdTypeTextPart';

export class MdPartFactory {
    static createSfcPart(options: MdOptions) {
        return new MdSfcPart(options);
    }

    static createTypePart(options: MdOptions) {
        return new MdTypePart(options);
    }
    static createTypeTextPart(options: MdOptions) {
        return new MdTypeTextPart(options);
    }
}
