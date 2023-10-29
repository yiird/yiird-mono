import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { TitleExposeType } from './logic';
import Title from './template.vue';

const TitlePlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Title, optinos);
    }
};

export type * from './logic';
export { Title, TitlePlugin };
export type { PlatformOptions as ElementOptions };
export type TitleType = ComponentType<typeof Title, TitleExposeType>;
