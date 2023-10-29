import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { InputExposeType } from './logic';
import Input from './template.vue';

const InputPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Input, optinos);
    }
};

export type * from './logic';
export { Input, InputPlugin };
export type { PlatformOptions as ElementOptions };

export type InputType = ComponentType<typeof Input, InputExposeType>;
