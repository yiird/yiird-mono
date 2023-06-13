import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { Direction, InternalSetupContext, ThemeConfig } from '../../types/global';

export type SpaceSize = 'sm' | 'md' | 'lg';

const getSize = (themeConfig: ThemeConfig, size: SpaceSize | number) => {
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
    size: {
        type: [String, Number] as PropType<SpaceSize | number>,
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
    const { props, prefab } = ctx;

    const obtainSize = computed(() => {
        return getSize(themeConfig.value, props.size);
    });

    return computed<SpaceTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: SpaceTheme = {
            ..._themeConfig,
            gap: `${obtainSize.value}px`
        };

        theme.bemModifiers = [`${prefab.cType__}--${props.direction}`];

        return theme;
    });
};

export const setupSpace = (props: SpacePropsType, ctx: SetupContext<typeof SpaceEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof SpaceEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const SpaceExpose = [...baseExpose];
