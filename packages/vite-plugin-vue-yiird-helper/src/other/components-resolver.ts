import { isString, kebabCase } from 'lodash';
import type { ComponentResolver } from 'unplugin-vue-components';

type ComponentResolverOptions = {
    debug?: boolean;
    prefix?: string;
    from?: string | ((args: FromCallArg) => string);
};

type DirectiveResolverOptions = {
    from?: string | ((args: string) => string);
};

const getSideEffects = (partialName: string, optinos: ComponentResolverOptions) => {
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
export function componentsResolver(options: ComponentResolverOptions = {}): ComponentResolver {
    return {
        type: 'component',
        resolve: (name: string) => {
            const { prefix = 'y' } = options;
            // if (ignorePartialNames.includes(name)) {
            //     if (options.debug) {
            //         console.log(`忽略:${name}`);
            //     }
            //     return;
            // }
            if (options.debug) {
                console.log(`组件:${name},前缀:${prefix}`);
            }
            if (kebabCase(name).startsWith(`${prefix}-`)) {
                const partialName = name.slice(prefix.length);
                if (options.debug) {
                    console.log(`原始组件:${partialName}`);
                }
                let from;
                if (options.from) {
                    from = isString(options.from) ? options.from : options.from({ name, partialName });
                }

                return {
                    name: partialName,
                    from: `${from ? from : '@yiird/elements'}`,
                    sideEffects: getSideEffects(partialName, options)
                };
            }
        }
    };
}

export function directivesResolver(options: DirectiveResolverOptions): ComponentResolver {
    return {
        type: 'directive',
        resolve: (name: string) => {
            let from;
            if (options.from) {
                from = isString(options.from) ? options.from : options.from(name);
            }

            return {
                name: name,
                from: `${from ? from : '@yiird/elements'}`
            };
        }
    };
}
