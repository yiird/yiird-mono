import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ElementOptions, Plugin } from '../../types/global';
import Theme from './template.vue';

const ThemePlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Theme.name}`), Theme);
    },
    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type { ElementOptions };
export { Theme, ThemePlugin };
export type ThemeType = InstanceType<typeof Theme>;
