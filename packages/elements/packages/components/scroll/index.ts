import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { ScrollExposeType } from './logic';
import Scroll from './template.vue';

const ScrollPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Scroll, optinos);
    }
};

export type * from './logic';
export { Scroll, ScrollPlugin };
export type { PlatformOptions as ElementOptions };
export type ScrollType = ComponentType<typeof Scroll, ScrollExposeType>;
