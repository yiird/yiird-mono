import { capitalize, type App, type Plugin } from 'vue';
import type { ElementOptions } from '../types/global';
import Button from './template.vue';
export * from './logic';
export { Button };
export type { ElementOptions };
export default {
    install(app: App, optinos: ElementOptions) {
        app.component(capitalize(`${optinos.prefix}Button`), Button);
    }
} as Plugin;
