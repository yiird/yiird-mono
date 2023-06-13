import { BasicComment } from '../../parser/comment/basic/BasicComment';
import { NodeComment } from '../../parser/comment/node/NodeComment';
import { TypeComment } from '../../parser/comment/node/TypeComment';
import { MdOptions } from '../../types';
import { MdStyles } from './Style';

export abstract class AbstractMdPart<C extends BasicComment | NodeComment> {
    private _options: MdOptions;
    _linkPrefix = 'link';

    public get styles(): typeof MdStyles {
        return this.options.styles!;
    }

    constructor(options: MdOptions) {
        this._options = options;
    }

    abstract toMd(
        comment: C,
        level?: number
    ):
        | {
              md: string;
              specialTypes?: Set<TypeComment>;
          }
        | undefined;

    /**
     * Getter options
     * @return {MdOptions}
     */
    public get options(): MdOptions {
        return this._options;
    }

    protected _commentToObject(comment: BasicComment | NodeComment) {
        const obj: Record<string, unknown> = {};
        Object.getOwnPropertyNames(comment).forEach((name) => {
            obj[name.startsWith('_') ? name.substring(1) : name] = Object.getOwnPropertyDescriptor(comment, name)?.value;
        });
        return obj;
    }
}
