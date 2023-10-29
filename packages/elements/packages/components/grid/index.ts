import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { GridExposeType } from './logic';
import Grid from './template.vue';

const GridPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Grid, optinos);
    }
};

export type * from './logic';
export { Grid, GridPlugin };
export type { PlatformOptions as ElementOptions };
export type GridType = ComponentType<typeof Grid, GridExposeType>;
