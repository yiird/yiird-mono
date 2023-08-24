import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { DropExposeType } from './logic';
import Drop from './template.vue';

const DropPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Drop, optinos);
    }
};

export type * from './logic';
export { Drop, DropPlugin };
export type { PlatformOptions as ElementOptions };
export type DropType = ComponentType<typeof Drop, DropExposeType>;
