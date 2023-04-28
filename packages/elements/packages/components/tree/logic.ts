import { computed, type ExtractPropTypes } from 'vue';
import { BaseProps, useTheme } from '../../common/prefab';
export const TreeProps = {
    ...BaseProps
} as const;
export interface TreeTheme {
    bemModifiers?: string[];
}
export const useTreeTheme = (props: Readonly<ExtractPropTypes<typeof TreeProps>>) => {
    const themeConfig = useTheme();
    return computed<TreeTheme>(() => {
        const _themeConfig = themeConfig?.value;

        const theme: TreeTheme = {};

        theme.bemModifiers = [];

        return theme;
    });
};
