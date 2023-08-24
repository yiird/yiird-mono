import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/options';
import type { ComponentType } from '../../../types/prefab';
import type { MainExposeType } from './logic';
import Main from './template.vue';

const MainPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Main, optinos);
    }
};

export type * from './logic';
export { Main, MainPlugin };
export type { PlatformOptions as ElementOptions };
export type MainType = ComponentType<typeof Main, MainExposeType>;
