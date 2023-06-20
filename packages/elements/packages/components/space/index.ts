import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { SpaceExposeType } from './logic';
import Space from './template.vue';

const SpacePlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Space.name}`), Space);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Space, SpacePlugin };
export type { ElementOptions };
export type SpaceType = ComponentType<typeof Space, SpaceExposeType>;
