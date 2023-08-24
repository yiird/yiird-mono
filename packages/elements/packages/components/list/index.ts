import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { ListExposeType } from './logic';
import List from './template.vue';

const ListPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, List, optinos);
    }
};

export type * from './logic';
export { List, ListPlugin };
export type { PlatformOptions as ElementOptions };
export type ListType = ComponentType<typeof List, ListExposeType>;
