import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { ParagraphExposeType } from './logic';
import Paragraph from './template.vue';

const ParagraphPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Paragraph, optinos);
    }
};

export type * from './logic';
export { Paragraph, ParagraphPlugin };
export type { PlatformOptions as ElementOptions };
export type ParagraphType = ComponentType<typeof Paragraph, ParagraphExposeType>;
