// https://vitepress.dev/guide/custom-theme
// import { YE } from '@yiird/elements';
// import { YE, type ElementOptions } from '@yiird/elements';
import { forEach } from 'lodash-es';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import type { Plugin } from 'vue';
import Example from './build-in/Example.vue';
import './style.css';

const examples: Record<string, Object> = import.meta.glob('../example-components/*.vue', { eager: true, import: 'default' });
let YE: Plugin;
if (!import.meta.env.DEV) {
    YE = (await import('@yiird/elements')).default;
    import('@yiird/elements/style.css')
} else {
    YE = (await import('../../../packages')).default;
}

export default {
    ...Theme,

    enhanceApp({ app }: EnhanceAppContext) {
        // app.use(YE);
        app.component('Example', Example);

        forEach(examples, (example, path) => {
            app.component(basename(path, '.vue'), example);
        });
        app.use(YE, { prefix: 'Y' });
    }
};

function basename(filename: string, extension: string) {
    const arr = filename.split('/');
    return arr[arr.length - 1].replace(extension, '');
}
