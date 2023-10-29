import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { RowExposeType } from './logic';
import Row from './template.vue';

const RowPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Row, optinos);
    }
};

export type * from './logic';
export { Row, RowPlugin };
export type { PlatformOptions as ElementOptions };
export type RowType = ComponentType<typeof Row, RowExposeType>;
