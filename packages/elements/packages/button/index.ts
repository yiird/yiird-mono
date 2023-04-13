import { capitalize, type App, type Plugin } from 'vue';
import type { YEOptions } from '../types/global';
import Button from './template.vue';
export * from './logic';
export { Button };
export type { YEOptions };
export default {
    install(app: App, optinos: YEOptions) {
        app.component(capitalize(`${optinos.prefix}Button`), Button);
    }
} as Plugin;
