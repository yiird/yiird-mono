import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ElementOptions, Plugin } from '../../../types/global';
import Col from './template.vue';

const GridColPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Col.name}`), Col);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Col, GridColPlugin };
export type { ElementOptions };
export type ColType = InstanceType<typeof Col>;
