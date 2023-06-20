import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { AvatarExposeType } from './logic';
import Avatar from './template.vue';

const AvatarPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Avatar.name}`), Avatar);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Avatar, AvatarPlugin };
export type { ElementOptions };
export type AvatarType = ComponentType<typeof Avatar, AvatarExposeType>;
