import { isArray } from 'lodash-es';
import { computed, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps } from '../../common/prefab';
export const RowProps = {
    ...BaseProps,
    /**
     * 槽的尺寸
     */
    gutter: {
        type: [Number, String, Array] as PropType<number | number[] | string | string[]>,
        default: 5
    },
    /**
     * 水平方向的对齐方式
     */
    justify: {
        type: String as PropType<'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>,
        default: 'start'
    },
    /**
     * 垂直方向对齐方式
     */
    align: {
        type: String as PropType<'start' | 'end' | 'center' | 'stretch'>,
        default: 'stretch'
    }
} as const;
export interface RowTheme {
    bemModifiers?: string[];
    //主轴间隔
    gutterMainAxis?: string;
    //附轴间隔
    gutterAuxiliaryAxis?: string;
    justify?: string;
    align?: string;
}

export const useRowTheme = (props: Readonly<ExtractPropTypes<typeof RowProps>>) => {
    return computed<RowTheme>(() => {
        const theme: RowTheme = {
            gutterMainAxis: '0px',
            gutterAuxiliaryAxis: '0px'
        };
        if (props.gutter) {
            if (isArray(props.gutter)) {
                theme.gutterMainAxis = props.gutter[0] + 'px';
                theme.gutterAuxiliaryAxis = props.gutter[1] + 'px';
            } else {
                theme.gutterMainAxis = theme.gutterAuxiliaryAxis = props.gutter + 'px';
            }
        }

        if (props.align) {
            theme.align = props.align;
        }
        if (props.justify) {
            theme.justify = props.justify;
        }

        theme.bemModifiers = [];
        return theme;
    });
};
