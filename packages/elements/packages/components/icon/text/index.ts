import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../../types/global';
import type { IconTextExposeType } from './logic';
import IconText from './template.vue';

const IconTextPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${IconText.name}`), IconText);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { IconText, IconTextPlugin };
export type { ElementOptions };
export type IconTextType = ComponentType<typeof IconText, IconTextExposeType>;
