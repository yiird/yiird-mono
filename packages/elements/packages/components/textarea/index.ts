import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { TextareaExposeType } from './logic';
import Textarea from './template.vue';

const TextareaPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Textarea.name}`), Textarea);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Textarea, TextareaPlugin };
export type { ElementOptions };
export type TextareaType = ComponentType<typeof Textarea, TextareaExposeType>;
