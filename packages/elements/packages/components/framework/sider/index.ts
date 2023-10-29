import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { SiderExposeType } from './logic';
import Sider from './template.vue';

const SiderPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Sider, optinos);
    }
};

export type * from './logic';
export { Sider, SiderPlugin };
export type { PlatformOptions as ElementOptions };
export type SiderType = ComponentType<typeof Sider, SiderExposeType>;
