import { computed, type EmitsOptions, type ExtractPropTypes, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../../types/global';
export const TitleProps = {
    ...BaseProps
} as const;
export type TitlePropsType = Readonly<ExtractPropTypes<typeof TitleProps>>;

export interface TitleTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const TitleEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<TitlePropsType, E>) => {
    const themeConfig = useTheme();
    return computed<TitleTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: TitleTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupTitle = (props: TitlePropsType, ctx: SetupContext<typeof TitleEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof TitleEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const TitleExpose = [...baseExpose];
