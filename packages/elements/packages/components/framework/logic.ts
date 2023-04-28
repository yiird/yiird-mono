import { computed, type ExtractPropTypes, type PropType, type UnwrapNestedRefs } from 'vue';
import { BaseProps } from '../../common/prefab';
import type { FrameworkConfig } from '../../types/global';
export const FrameworkProps = {
    ...BaseProps,
    /**
     * 固定高度，fixed=`true` 必须在父级元素设置高度后使用
     */
    fixed: {
        type: Boolean as PropType<boolean>,
        default: false
    }
} as const;
export interface FrameworkTheme {
    bemModifiers?: string[];
    header?: string;
    footer?: string;
    left?: string;
    right?: string;
    height?: string;
}
export const useFrameworkTheme = (props: Readonly<ExtractPropTypes<typeof FrameworkProps>>, framework: UnwrapNestedRefs<FrameworkConfig>) => {
    framework.fixed = props.fixed;
    return computed<FrameworkTheme>(() => {
        const theme: FrameworkTheme = {};

        theme.header = (framework?.header || 0) + 'px';
        theme.footer = (framework?.footer || 0) + 'px';
        theme.left = (framework?.left || 0) + 'px';
        theme.right = (framework?.right || 0) + 'px';
        theme.height = props.fixed ? '100%' : 'auto';

        theme.bemModifiers = [];

        return theme;
    });
};
