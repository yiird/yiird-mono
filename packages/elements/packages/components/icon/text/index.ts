import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/options';
import type { ComponentType } from '../../../types/prefab';
import type { IconTextExposeType } from './logic';
import IconText from './template.vue';

const IconTextPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, IconText, optinos);
    }
};

export type * from './logic';
export { IconText, IconTextPlugin };
export type { PlatformOptions as ElementOptions };
export type IconTextType = ComponentType<typeof IconText, IconTextExposeType>;
