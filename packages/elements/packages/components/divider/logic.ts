import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { Direction, InternalSetupContext, ThemeConfig } from '../../types/global';

export type DividerMode = 'dashed' | 'double' | 'single';
export const DividerProps = {
    ...BaseProps,
    mode: {
        type: String as PropType<DividerMode>,
        default: 'single'
    },
    direction: {
        type: String as PropType<Direction>,
        default: 'h'
    },
    margin: {
        type: Number,
        default: 5
    }
} as const;
export type DividerPropsType = Readonly<ExtractPropTypes<typeof DividerProps>>;

export interface DividerTheme extends ThemeConfig {
    bemModifiers?: string[];
    margin: string;
}

export const DividerEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<DividerPropsType, E>) => {
    const themeConfig = useTheme();
    const { props, commonExposed: prefab, slots } = ctx;
    return computed<DividerTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: DividerTheme = {
            ..._themeConfig,
            margin: `${props.margin}px`
        };

        theme.bemModifiers = [`${prefab.cType__}--${props.direction}`];

        if (slots.default) {
            theme.bemModifiers = [`is-has-title`];
        }

        return theme;
    });
};

export const setupDivider = (props: DividerPropsType, ctx: SetupContext<typeof DividerEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof DividerEmits>({ props, commonExposed: prefab, ...ctx });
    const { slots } = ctx;
    const obtainHasTitle = computed(() => {
        return !!slots.default;
    });

    return {
        ...prefab,
        theme,
        obtainHasTitle
    };
};
export const DividerExpose = [...baseExpose];
