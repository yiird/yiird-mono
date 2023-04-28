import { computed, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, useTheme } from '../../common/prefab';

/**
 * 选项
 */
export interface Tab {
    /**
     * 选项名称
     */
    name: String;
}

export const TabsProps = {
    ...BaseProps,
    /**
     * 选项集合
     */
    items: {
        type: Array as PropType<Tab[]>
    }
} as const;
export interface TabsTheme {
    bemModifiers?: string[];
}
export const useTabsTheme = (props: Readonly<ExtractPropTypes<typeof TabsProps>>) => {
    const themeConfig = useTheme();
    return computed<TabsTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: TabsTheme = {};

        theme.bemModifiers = [];

        return theme;
    });
};
