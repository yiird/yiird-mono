import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { DividerExposeType } from './logic';
import Divider from './template.vue';

const DividerPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Divider, optinos);
    }
};

export type * from './logic';
export { Divider, DividerPlugin };
export type { PlatformOptions as ElementOptions };
export type DividerType = ComponentType<typeof Divider, DividerExposeType>;
