import { computed, type EmitsOptions, type ExtractPropTypes, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import type { InternalSetupContext, ThemeConfig } from '../../../types/global';
export const ListItemProps = {
    ...BaseProps
} as const;
export type ListItemPropsType = Readonly<ExtractPropTypes<typeof ListItemProps>>;

export interface ListItemTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const ListItemEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<ListItemPropsType, E>) => {
    const themeConfig = useTheme();
    return computed<ListItemTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: ListItemTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupListItem = (props: ListItemPropsType, ctx: SetupContext<typeof ListItemEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof ListItemEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const ListItemExpose = [...baseExpose];
