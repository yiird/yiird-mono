import { computed, type EmitsOptions, type ExtractPropTypes, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../../types/global';
export const ListInfoProps = {
    ...BaseProps
} as const;
export type ListInfoPropsType = Readonly<ExtractPropTypes<typeof ListInfoProps>>;

export interface ListInfoTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const ListInfoEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<ListInfoPropsType, E>) => {
    const themeConfig = useTheme();
    return computed<ListInfoTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: ListInfoTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupListInfo = (props: ListInfoPropsType, ctx: SetupContext<typeof ListInfoEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof ListInfoEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const ListInfoExpose = [...baseExpose];
