import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../../types/global';
import type { TextExposeType } from './logic';
import Text from './template.vue';

const TextPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Text.name}`), Text);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Text, TextPlugin };
export type { ElementOptions };
export type TextType = ComponentType<typeof Text, TextExposeType>;
