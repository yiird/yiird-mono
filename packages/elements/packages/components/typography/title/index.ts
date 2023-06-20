import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../../types/global';
import type { TitleExposeType } from './logic';
import Title from './template.vue';

const TitlePlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Title.name}`), Title);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Title, TitlePlugin };
export type { ElementOptions };
export type TitleType = ComponentType<typeof Title, TitleExposeType>;
