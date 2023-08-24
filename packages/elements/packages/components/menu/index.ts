import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { MenuExposeType } from './logic';
import Menu from './template.vue';

const MenuPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Menu, optinos);
    }
};

export type * from './logic';
export { Menu, MenuPlugin };
export type { PlatformOptions as ElementOptions };
export type MenuType = ComponentType<typeof Menu, MenuExposeType>;
