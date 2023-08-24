import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import type { MenuMode } from '../../types/menu';
import type { InternalSetupContext } from '../../types/prefab';
import type { ThemeConfig } from '../../types/theme';
import type { TreeKeyConfig } from '../../types/tree';

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
    /**
     * 标识(字段)配置
     *
     * 告知组件主键、父主键、显示文本、子节点分别对应数据中的字段
     *
     * @default {key: 'id',pkey: 'pid',ckey: 'children',ikey:'icon',tkey: 'name'}
     */
    keyConfig: {
        type: Object as PropType<TreeKeyConfig>,
        default() {
            return {
                key: 'id',
                pkey: 'pid',
                ckey: 'children',
                ikey: 'icon',
                tkey: 'name'
            };
        }
    },
    mode: {
        type: String as PropType<MenuMode>
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
