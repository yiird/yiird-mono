import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { IconExposeType } from './logic';
import Icon from './template.vue';

const IconPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Icon, optinos);
    }
};

export type * from './logic';
export { addIcons } from './logic';
export { Icon, IconPlugin };
export type { PlatformOptions as ElementOptions };
export type IconType = ComponentType<typeof Icon, IconExposeType>;
