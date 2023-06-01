import { isArray } from 'lodash';
import { isAbsolute, relative, resolve } from 'node:path';
import { Plugin, createFilter } from 'vite';
import { createMarkdownRenderer, defineConfigWithTheme, type MarkdownOptions } from 'vitepress';

type FilterPattern = Array<string | RegExp> | string | RegExp | null;

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

export const sinnpetToCustomblockPlugin = async (rawOptions?: Options): Promise<Plugin> => {
    const customBlockTagName = 'internal-component-pre-block';
    const options: Options = Object.assign({ include: [`${resolve('./docs')}/**/*.vue`], docsRoot: resolve('./docs') }, rawOptions);

    if (!isArray(options.include)) {
        options.include = [options.include!];
    }
    const blockFilterPattern = new RegExp(`vue&type=${customBlockTagName}`);
    options.include.push(blockFilterPattern);

    const filter = createFilter(options.include, options.exclude);

    if (!isAbsolute(options.docsRoot!)) {
        options.docsRoot = resolve(__dirname, '../');
    }
    const md = await createMarkdownRenderer('.', options.markdown);
    return {
        name: 'yiird:sinnpet-to-customblock',
        configResolved(config) {
            options.markdown = defineConfigWithTheme(config).markdown;
        },
        transform(code, id) {
            if (filter(id)) {
                if (id.endsWith('.vue')) {
                    const prettierCode = md.render(`<<< @/${relative(resolve(options.docsRoot!, '../'), id)}`);
                    code += `\n<${customBlockTagName}> \n${prettierCode}\n</${customBlockTagName}>;
            `;
                } else {
                    code = `export default Compont => {
                        Compont.${options.injectComponentPropertiesName} = \`${code.replaceAll('`', '\\`').replaceAll('${', '\\${')}\`;
                    }`;
                }
            }
            return code;
        },
        enforce: 'pre'
    };
};
