import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { PopoverExposeType } from './logic';
import Popover from './template.vue';

const PopoverPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Popover, optinos);
    }
};

export type * from './logic';
export { Popover, PopoverPlugin };
export type { PlatformOptions as ElementOptions };
export type PopoverType = ComponentType<typeof Popover, PopoverExposeType>;
