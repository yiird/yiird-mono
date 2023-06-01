import { computed, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../types/global';
import type { IconNameOrDefinition } from '../icon';

/**
 * 列表项
 */
export interface ListItem extends Record<string, any> {
    /**
     * 头像
     */
    avatar: string | IconNameOrDefinition;
    /**
     * 标题
     */
    title: string;
    /**
     * 描述
     */
    description: string;
}

export type ListLayout = 'h' | 'v';

export const ListProps = {
    ...BaseProps,
    /**
     * 列表项
     */
    items: {
        type: Array as PropType<ListItem[]>,
        default() {
            return [];
        }
    },
    /**
     * 布局
     * `h`: 横向
     * `v`: 纵向
     */
    layout: {
        type: String as PropType<'h' | 'v'>,
        default: 'h'
    }
} as const;
export type ListPropsType = Readonly<ExtractPropTypes<typeof ListProps>>;

export interface ListTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const ListEmits = {};

const obtainTheme = (ctx: InternalSetupContext<ListPropsType, typeof ListEmits>) => {
    const themeConfig = useTheme();
    return computed<ListTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: ListTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupList = (props: ListPropsType, ctx: SetupContext<typeof ListEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const ListExpose = [...baseExpose];
