import { isAbsolute, relative, resolve } from 'node:path';
import { Plugin, createFilter } from 'vite';
import { createMarkdownRenderer, defineConfigWithTheme, type MarkdownOptions } from 'vitepress';

type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;

type Options = {
    /**
     * vitepress根目录
     */
    docsRoot?: string;
    include?: FilterPattern;
    exclude?: FilterPattern;
    /**
     * @see {@link MarkdownOptions}
     */
    markdown?: MarkdownOptions;
    /**
     * 源码注入到组件实例中的属性名称
     */
    injectComponentPropertiesName: string;
};

export const sinnpetToCustomblockPlugin = (rawOptions?: Options): Plugin => {
    const customBlockTagName = 'internal-component-pre-block';
    const options = Object.assign({ include: [`${resolve('./docs')}/**/*.vue`, RegExp(`vue&type=${customBlockTagName}`)], docsRoot: resolve('./docs') }, rawOptions);

    const filter = createFilter(options.include, options.exclude);

    if (!isAbsolute(options.docsRoot)) {
        options.docsRoot = resolve(__dirname, '../');
    }

    return {
        name: 'yiird:sinnpet-to-customblock',
        configResolved(config) {
            options.markdown = defineConfigWithTheme(config).markdown;
        },
        async transform(code, id) {
            if (filter(id)) {
                if (id.endsWith('.vue')) {
                    const md = await createMarkdownRenderer('.', options.markdown);
                    const prettierCode = md.render(`<<< @/${relative(resolve(options.docsRoot, '../'), id)}`);
                    code += `\n<${customBlockTagName}> \n${prettierCode}\n</${customBlockTagName}>;
            `;
                } else {
                    return `export default Compont => {
                        Compont.${options.injectComponentPropertiesName} = \`${code}\`
                    }`;
                }
            }
            return code;
        },
        enforce: 'pre'
    };
};
