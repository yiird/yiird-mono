import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/options';
import type { ComponentType } from '../../../types/prefab';
import type { ListMetaExposeType } from './logic';
import ListMeta from './template.vue';

const ListMetaPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, ListMeta, optinos);
    }
};

export type * from './logic';
export { ListMeta, ListMetaPlugin };
export type { PlatformOptions as ElementOptions };
export type ListMetaType = ComponentType<typeof ListMeta, ListMetaExposeType>;
