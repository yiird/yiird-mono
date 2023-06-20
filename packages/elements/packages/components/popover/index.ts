import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { PopoverExposeType } from './logic';
import Popover from './template.vue';

const PopoverPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Popover.name}`), Popover);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Popover, PopoverPlugin };
export type { ElementOptions };
export type PopoverType = ComponentType<typeof Popover, PopoverExposeType>;
