import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

export const MenuProps = {
    ...BaseProps,
    /**
     * 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据
     */
    source: {
        type: Array as PropType<object[]>,
        default() {
            return [];
        }
    },

    mode: {
        type: String as PropType<''>
    }
} as const;
export type MenuPropsType = Readonly<ExtractPropTypes<typeof MenuProps>>;

export interface MenuTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const MenuEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<MenuPropsType, E>) => {
    const themeConfig = useTheme();
    return computed<MenuTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: MenuTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupMenu = (props: MenuPropsType, ctx: SetupContext<typeof MenuEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof MenuEmits>({ props, commonExposed, ...ctx });
    return {
        ...commonExposed,
        theme
    };
};
export const MenuExpose = [...baseExpose, ...([] as const)];
export type MenuExposeType = (typeof MenuExpose)[number];
