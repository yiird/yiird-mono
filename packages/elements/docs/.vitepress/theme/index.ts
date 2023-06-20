import { forEach } from 'lodash-es';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import type { App } from 'vue';
import Example from './build-in/Example.vue';

import './style.scss';

export default {
    ...Theme,
    async enhanceApp({ app }: EnhanceAppContext) {
        app.component('Example', Example);

        const examples: Record<string, Object> = import.meta.glob('../example-components/*.vue', { eager: true, import: 'default' });
        forEach(examples, (example, path) => {
            app.component(basename(path, '.vue'), example);
        });

        if (import.meta.env.PROD) {
            const { YE } = await import('@yiird/elements');
            (app as App).use(YE, { prefix: 'Y' });
            import('@yiird/elements/style.css');
        } else {
            const { YE } = await import('../../../packages');
            (app as App).use(YE, { prefix: 'Y' });
        }
    }
};

function basename(filename: string, extension: string) {
    const arr = filename.split('/');
    return arr[arr.length - 1].replace(extension, '');
}
