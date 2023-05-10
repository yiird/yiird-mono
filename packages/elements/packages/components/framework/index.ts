import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ElementOptions, Plugin } from '../../types/global';
import Framework from './template.vue';

const FrameworkPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Framework.name}`), Framework);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Framework, FrameworkPlugin };
export type { ElementOptions };
export type FrameworkType = InstanceType<typeof Framework>;
