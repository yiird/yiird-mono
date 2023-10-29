import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { TextExposeType } from './logic';
import Text from './template.vue';

const TextPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Text, optinos);
    }
};

export type * from './logic';
export { Text, TextPlugin };
export type { PlatformOptions as ElementOptions };
export type TextType = ComponentType<typeof Text, TextExposeType>;
