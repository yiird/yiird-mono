import { computed, type EmitsOptions, type ExtractPropTypes, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../types/global';
export const TypographyProps = {
    ...BaseProps
} as const;
export type TypographyPropsType = Readonly<ExtractPropTypes<typeof TypographyProps>>;

export interface TypographyTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const TypographyEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<TypographyPropsType, E>) => {
    const themeConfig = useTheme();
    return computed<TypographyTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: TypographyTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupTypography = (props: TypographyPropsType, ctx: SetupContext<typeof TypographyEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof TypographyEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const TypographyExpose = [...baseExpose];
