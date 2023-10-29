import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { FrameworkExposeType } from './logic';
import Framework from './template.vue';

const FrameworkPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Framework, optinos);
    }
};

export type * from './logic';
export { Framework, FrameworkPlugin };
export type { PlatformOptions as ElementOptions };
export type FrameworkType = ComponentType<typeof Framework, FrameworkExposeType>;
