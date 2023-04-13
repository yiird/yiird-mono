import { capitalize, type App, type Plugin } from 'vue';
import type { YEOptions } from '../types/global';

import Icon from './template.vue';

export * from './logic';
export type { YEOptions };
export { Icon };

export default {
    install(app: App, optinos: YEOptions) {
        const { prefix = 'y' } = optinos;
        app.component(capitalize(`${prefix}Icon`), Icon);
    }
} as Plugin;
