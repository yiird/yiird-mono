import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { SelectExposeType } from './logic';
import Select from './template.vue';

const SelectPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Select, optinos);
    }
};

export type * from './logic';
export { Select, SelectPlugin };
export type { PlatformOptions as ElementOptions };
export type SelectType = ComponentType<typeof Select, SelectExposeType>;
