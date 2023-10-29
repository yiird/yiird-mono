import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { SpaceExposeType } from './logic';
import Space from './template.vue';

const SpacePlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Space, optinos);
    }
};

export type * from './logic';
export { Space, SpacePlugin };
export type { PlatformOptions as ElementOptions };
export type SpaceType = ComponentType<typeof Space, SpaceExposeType>;
