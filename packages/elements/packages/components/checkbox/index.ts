import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { CheckboxExposeType } from './logic';
import Checkbox from './template.vue';

const CheckboxPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Checkbox, optinos);
    }
};

export type * from './logic';
export { Checkbox, CheckboxPlugin };
export type { PlatformOptions };
export type CheckboxType = ComponentType<typeof Checkbox, CheckboxExposeType>;
