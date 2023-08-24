import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { TypographyExposeType } from './logic';
import Typography from './template.vue';

const TypographyPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Typography, optinos);
    }
};

export type * from './logic';
export { Typography, TypographyPlugin };
export type { PlatformOptions as ElementOptions };
export type TypographyType = ComponentType<typeof Typography, TypographyExposeType>;
