import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { TabsExposeType } from './logic';
import Tabs from './template.vue';

const TabsPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Tabs, optinos);
    }
};

export type * from './logic';
export { Tabs, TabsPlugin };
export type { PlatformOptions as ElementOptions };
export type TabsType = ComponentType<typeof Tabs, TabsExposeType>;
