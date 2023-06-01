// https://vitepress.dev/guide/custom-theme
// import { YE } from '@yiird/elements';
// import { YE, type ElementOptions } from '@yiird/elements';
import { forEach } from 'lodash-es';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import type { App } from 'vue';
// import { YE } from '../../../packages';
import { YE } from '@yiird/elements';
import Example from './build-in/Example.vue';
import './style.css';
const examples: Record<string, Object> = import.meta.glob('../example-components/*.vue', { eager: true, import: 'default' });


export default {
    ...Theme,

    enhanceApp({ app }: EnhanceAppContext) {
        app.component('Example', Example);

        forEach(examples, (example, path) => {
            app.component(basename(path, '.vue'), example);
        });
        (app as App).use(YE, { prefix: 'Y' });
    }
};

function basename(filename: string, extension: string) {
    const arr = filename.split('/');
    return arr[arr.length - 1].replace(extension, '');
}
