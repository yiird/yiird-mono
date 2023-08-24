import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { TextareaExposeType } from './logic';
import Textarea from './template.vue';

const TextareaPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Textarea, optinos);
    }
};

export type * from './logic';
export { Textarea, TextareaPlugin };
export type { PlatformOptions as ElementOptions };
export type TextareaType = ComponentType<typeof Textarea, TextareaExposeType>;
