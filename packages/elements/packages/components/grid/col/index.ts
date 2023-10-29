import type { App, Plugin } from 'vue';
import { _register } from '../../../common/prefab';
import type { PlatformOptions } from '../../../types/global';
import type { ComponentType } from '../../../types/prefab';
import type { ColExposeType } from './logic';
import Col from './template.vue';

const GridColPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Col, optinos);
    }
};

export type * from './logic';
export { Col, GridColPlugin };
export type { PlatformOptions as ElementOptions };
export type ColType = ComponentType<typeof Col, ColExposeType>;
