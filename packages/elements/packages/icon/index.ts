import { capitalize, type App, type Plugin } from 'vue';
import type { ElementOptions } from '../types/global';

import Icon from './template.vue';

export * from './logic';
export type { ElementOptions };
export { Icon };

export default {
    install(app: App, optinos: ElementOptions) {
        const { prefix = 'y' } = optinos;
        app.component(capitalize(`${prefix}${Icon.name}`), Icon);
    }
} as Plugin;
