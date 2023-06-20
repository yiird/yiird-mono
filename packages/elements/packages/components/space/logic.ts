import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { Direction, InternalSetupContext, ThemeConfig } from '../../types/global';

export type SpaceGap = 'sm' | 'md' | 'lg';

const getSize = (themeConfig: ThemeConfig, size: SpaceGap | number) => {
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
};

export const SpaceProps = {
    ...BaseProps,
    gap: {
        type: [String, Number] as PropType<SpaceGap | number>,
        default: 'md'
    },
    direction: {
        type: String as PropType<Direction>,
        default: 'h'
    }
} as const;
export type SpacePropsType = Readonly<ExtractPropTypes<typeof SpaceProps>>;

export interface SpaceTheme extends ThemeConfig {
    bemModifiers?: string[];
    gap: string;
}

export const SpaceEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<SpacePropsType, E>) => {
    const themeConfig = useTheme();
    const { props, commonExposed } = ctx;

    const obtainSize = computed(() => {
        return getSize(themeConfig.value, props.gap);
    });

    return computed<SpaceTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: SpaceTheme = {
            ..._themeConfig,
            gap: `${obtainSize.value}px`
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
