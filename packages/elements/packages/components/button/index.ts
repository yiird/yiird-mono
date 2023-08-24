import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { ButtonExposeType } from './logic';
import Button from './template.vue';

const ButtonPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Button, optinos);
    }
};

export type { ButtonMode, ButtonShape } from './logic';
export { Button, ButtonPlugin };
export type { PlatformOptions as ElementOptions };
export type ButtonType = ComponentType<typeof Button, ButtonExposeType>;
