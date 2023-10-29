import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { AvatarExposeType } from './logic';
import Avatar from './template.vue';

const AvatarPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Avatar, optinos);
    }
};

export type * from './logic';
export { Avatar, AvatarPlugin };
export type { PlatformOptions as ElementOptions };
export type AvatarType = ComponentType<typeof Avatar, AvatarExposeType>;
