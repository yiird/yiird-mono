import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import { sizeToGap } from '../../config';
import type { Direction, FlexAlgin, Size, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

/* const getSize = (themeConfig: ThemeConfig, size: SpaceGap | number) => {
    let _size: number;
    switch (size) {
        case 'sm': {
            _size = themeConfig.ye_spaceSize[0];
            break;
        }
        case 'md': {
            _size = themeConfig.ye_spaceSize[1];
            break;
        }
        case 'lg': {
            _size = themeConfig.ye_spaceSize[2];
            break;
        }
        default: {
            _size = size;
        }
    }

    return _size;
}; */

export const SpaceProps = {
    ...BaseProps,
    gap: {
        type: [String, Number] as PropType<Size>,
        default: 'md'
    },
    /**
     * 排列方向
     */
    direction: {
        type: String as PropType<Direction>,
        default: 'h'
    },
    /**
     * 主轴方向上的排列方式
     */
    mainAxis: {
        type: String as PropType<FlexAlgin>,
        default: 'start'
    },
    /**
     * 交叉轴方向上的排列方式
     */
    crossAxis: {
        type: String as PropType<FlexAlgin>,
        default: 'start'
    }
} as const;
export type SpacePropsType = Readonly<ExtractPropTypes<typeof SpaceProps>>;

export interface SpaceTheme extends ThemeConfig {
    bemModifiers?: string[];
    gap: string;
    mainAxis: string;
    crossAxis: string;
}

export const SpaceEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<SpacePropsType, E>) => {
    const themeConfig = useTheme();
    const { props, commonExposed } = ctx;

    const obtainSize = computed(() => {
        return sizeToGap(themeConfig.value, props.gap);
    });

    return computed<SpaceTheme>(() => {
        const _themeConfig = themeConfig.value;
        const theme: SpaceTheme = {
            ..._themeConfig,
            gap: `${obtainSize.value}px`,
            mainAxis: props.mainAxis,
            crossAxis: props.crossAxis
        };

        theme.bemModifiers = [`${commonExposed.cType__}--${props.direction}`];

        return theme;
    });
};

export const setupSpace = (props: SpacePropsType, ctx: SetupContext<typeof SpaceEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof SpaceEmits>({ props, commonExposed, ...ctx });
    return {
        ...commonExposed,
        theme
    };
};

export const SpaceExpose = [...baseExpose, ...([] as const)];
export type SpaceExposeType = (typeof SpaceExpose)[number];
