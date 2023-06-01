import { computed, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../types/global';
export const GridProps = {
    ...BaseProps,
    /**
     * 间距尺寸
     */
    gutter: {
        type: [Number, String, Array] as PropType<number | number[] | string | string[]>,
        default: 5
    },
    /**
     * 水平方向的对齐方式
     */
    justify: {
        type: String as PropType<'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>,
        default: 'start'
    },
    /**
     * 垂直方向对齐方式
     */
    align: {
        type: String as PropType<'start' | 'end' | 'center' | 'stretch'>,
        default: 'stretch'
    },
    /**
     * 列数
     */
    colCount: {
        type: Number as PropType<number>
    }
} as const;
export type GridPropsType = Readonly<ExtractPropTypes<typeof GridProps>>;

export interface GridTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const GridEmits = {};

const obtainTheme = (ctx: InternalSetupContext<GridPropsType, typeof GridEmits>) => {
    const themeConfig = useTheme();
    return computed<GridTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: GridTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupGrid = (props: GridPropsType, ctx: SetupContext<typeof GridEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const GridExpose = [...baseExpose];
