import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/options';
import type { ComponentType } from '../../../types/prefab';
import type { HeaderExposeType } from './logic';
import Header from './template.vue';

const HeaderPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Header, optinos);
    }
};

export type * from './logic';
export { Header, HeaderPlugin };
export type { PlatformOptions as ElementOptions };

export type HeaderType = ComponentType<typeof Header, HeaderExposeType>;
