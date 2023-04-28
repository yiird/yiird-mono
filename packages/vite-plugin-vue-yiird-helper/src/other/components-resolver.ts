import { capitalize, isString, kebabCase } from 'lodash';
import type { ComponentResolver } from 'unplugin-vue-components';

type ResolverOptions = {
    prefix?: string;
    debug?: boolean;
    from?: string | ((args: FromCallArg) => string);
    exportName?: string;
};

const getSideEffects = (partialName: string, optinos: ResolverOptions) => {
    return [];
};

export type FromCallArg = {
    name: string;
    partialName: string;
};
const ignorePartialNames = ['font-awesome-icon'];
/**
 *
 * @param options
 * @returns
 */
export function componentsResolver(options: ResolverOptions = {}): ComponentResolver {
    return {
        type: 'component',
        resolve: (name: string) => {
            const { prefix = 'y' } = options;
            name = kebabCase(name);
            // if (ignorePartialNames.includes(name)) {
            //     if (options.debug) {
            //         console.log(`忽略:${name}`);
            //     }
            //     return;
            // }
            if (options.debug) {
                console.log(`组件:${name},前缀:${prefix}`);
            }
            if (name.startsWith(prefix)) {
                const compName = name.slice(prefix.length + 1);
                const partialName = capitalize(compName);
                if (options.debug) {
                    console.log(`原始组件:${partialName}`);
                }
                let from;
                if (options.from) {
                    from = isString(options.from) ? options.from : options.from({ name, partialName });
                }

                return {
                    name: `${options.exportName ? options.exportName : partialName}`,
                    from: `${from ? from : '@yiird/elements'}`,
                    sideEffects: getSideEffects(partialName, options)
                };
            }
        }
    };
}
