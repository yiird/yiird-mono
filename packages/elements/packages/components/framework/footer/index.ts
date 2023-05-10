import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ElementOptions, Plugin } from '../../../types/global';
import Footer from './template.vue';

const FooterPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Footer.name}`), Footer);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Footer, FooterPlugin };
export type { ElementOptions };
export type FooterType = InstanceType<typeof Footer>;
