import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { FooterExposeType } from './logic';
import Footer from './template.vue';

const FooterPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Footer, optinos);
    }
};

export type * from './logic';
export { Footer, FooterPlugin };
export type { PlatformOptions as ElementOptions };
export type FooterType = ComponentType<typeof Footer, FooterExposeType>;
