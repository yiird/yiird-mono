import { forEach } from 'lodash-es';
import { useData, type EnhanceAppContext } from 'vitepress';
import { default as ViteTheme } from 'vitepress/theme';
import { watch, type App } from 'vue';
import Example from './build-in/Example.vue';

import './style.scss';

export default {
    ...ViteTheme,
    async enhanceApp({ app }: EnhanceAppContext) {
        app.component('Example', Example);

        const examples: Record<string, Object> = import.meta.glob(['../example-components/*.vue', '../template-components/*.vue'], { eager: true, import: 'default' });
        forEach(examples, (example, path) => {
            app.component(basename(path, '.vue'), example);
        });

        const { YE, Util } = await import(import.meta.env.PROD ? '@yiird/elements' : '../../../packages');
        (app as App).use(YE, {
            prefix: 'Y',
            documentReady() {
                const { isDark } = useData();
                watch(isDark, Util.setDark);
            }
        });

        if (import.meta.env.PROD) {
            import('@yiird/elements/style.css');
        }
    }
};

function basename(filename: string, extension: string) {
    const arr = filename.split('/');
    return arr[arr.length - 1].replace(extension, '');
}
