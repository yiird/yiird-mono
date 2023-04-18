import { compileScript, parse, SFCBlock, SFCParseOptions, SFCTemplateBlock } from 'vue/compiler-sfc';
import { ScriptFile } from './ScriptFile';
import { Utils } from './Utils';

const getSFCParseOptions = (filePath: string): SFCParseOptions => {
    const sfcParseOptions: SFCParseOptions = {};
    sfcParseOptions.filename = filePath;
    sfcParseOptions.sourceMap = false;
    return sfcParseOptions;
};

export class SfcFile extends ScriptFile {
    private _isSetup: boolean;
    private _template?: SFCTemplateBlock;
    private _customBlocks?: SFCBlock[];

    constructor(filename: string, source: string) {
        const sfcParseOptions = getSFCParseOptions(filename);
        const sfc = parse(source, sfcParseOptions);
        let script = sfc.descriptor.script?.content;
        const scriptSetup = sfc.descriptor.scriptSetup;

        if (!script && scriptSetup) {
            const result = compileScript(sfc.descriptor, {
                id: SfcFile._hash(filename),
                reactivityTransform: false
            });

            script = result.content;
        }

        const template = sfc.descriptor.template;

        if (!script && !template) {
            throw new Error('没有 <script> 或 <template>');
        }
        const lang = sfc.descriptor.script?.lang;
        super(filename, script, Utils.getScriptKind(lang || 'ts'));

        if (scriptSetup) {
            this._isSetup = true;
        } else {
            this._isSetup = false;
        }
        if (template) {
            this._template = template;
        }
        this._customBlocks = sfc.descriptor.customBlocks;
    }

    /**
     * Getter template
     * @return {SFCTemplateBlock}
     */
    public get template(): SFCTemplateBlock | undefined {
        return this._template;
    }

    public get customBlocks(): SFCBlock[] | undefined {
        return this._customBlocks;
    }

    private static _hash(input: string) {
        const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

        let hash = 5381;
        let i = input.length - 1;

        if (typeof input == 'string') {
            for (; i > -1; i--) hash += (hash << 5) + input.charCodeAt(i);
        } else {
            for (; i > -1; i--) hash += (hash << 5) + input[i];
        }
        let value = hash & 0x7fffffff;

        let retValue = '';
        do {
            retValue += I64BIT_TABLE[value & 0x3f];
        } while ((value >>= 6));

        return retValue;
    }
}
