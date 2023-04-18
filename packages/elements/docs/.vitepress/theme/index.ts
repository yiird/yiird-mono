// https://vitepress.dev/guide/custom-theme
import { forEach } from 'lodash-es';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import { YE } from '../../../packages';
import Example from './build-in/Example.vue';
import './style.css';

const examples: Record<string, Object> = import.meta.glob('../example-components/*.vue', { eager: true, import: 'default' });

export default {
    ...Theme,

    enhanceApp({ app }: EnhanceAppContext) {
        app.use(YE);
        app.component('Example', Example);

        forEach(examples, (example, path) => {
            app.component(basename(path, '.vue'), example);
        });
    }
};

function basename(filename: string, extension: string) {
    const arr = filename.split('/');
    return arr[arr.length - 1].replace(extension, '');
}
