import { isArray } from 'lodash-es';
import { computed, getCurrentInstance, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, baseExpose } from '../../../common/prefab';
import type { RowProps } from '../row';
export const ColProps = {
    ...BaseProps,
    /**
     * 跨越列数
     */
    span: {
        type: [Number, String] as PropType<string | number>,
        default: 8
    },
    /**
     * 向右偏移列数
     */
    offset: {
        type: [Number, String] as PropType<string | number>
    }
} as const;
export interface ColTheme {
    bemModifiers?: string[];
    gutter?: string;
    offset?: string;
}
export const useColTheme = (props: Readonly<ExtractPropTypes<typeof ColProps>>) => {
    return computed<ColTheme>(() => {
        const theme: ColTheme = {};
        const parentProps = getCurrentInstance()?.parent?.props as Readonly<ExtractPropTypes<typeof RowProps>>;

        if (parentProps.gutter && isArray(parentProps.gutter)) {
            theme.gutter = parentProps.gutter[0] + 'px';
        } else {
            theme.gutter = parentProps.gutter + 'px';
        }

        theme.bemModifiers = [];

        if (props.span) {
            theme.bemModifiers.push(`col--span-${props.span}`);
        }

        if (props.offset) {
            theme.bemModifiers.push(`col--offset-${props.offset}`);
        }

        return theme;
    });
};

export const ColExpose = [...baseExpose, ...([] as const)];
export type ColExposeType = (typeof ColExpose)[number];
