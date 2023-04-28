import { computed, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, useTheme } from '../../common/prefab';
import { SIZE_MAP } from '../../config';
import type { NumberSize, TshirtSize } from '../../types/global';

export type BtnShape = `rectangle` | `circle` | `square` | `ellipse`;
export type BtnColor = `default` | `primary` | `success` | `warning` | `danger`;
export type BtnSize = TshirtSize | NumberSize;
export type BtnMode = 'normal' | 'empty' | 'link' | 'dashed';

export const BtnProps = {
    ...BaseProps,
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<BtnSize>,
        default: 'md'
    },
    /**
     * 颜色
     */
    color: {
        type: String as PropType<BtnColor>,
        default: 'default'
    },
    /**
     * 文本颜色
     */
    textColor: {
        type: String as PropType<string>
    },
    /**
     * 形状可选
     */
    shape: {
        type: String as PropType<BtnShape>,
        default: 'rectangle'
    },
    /**
     * 是否禁用按钮
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 模式
     */
    mode: {
        type: String as PropType<BtnMode>,
        default: 'normal'
    },
    loading: {
        type: Boolean,
        default: false
    }
} as const;

export interface BtnTheme {
    color?: string;
    bgColor?: string;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    bemModifiers?: string[];
}

export const useBtnTheme = (props: Readonly<ExtractPropTypes<typeof BtnProps>>) => {
    const themeConfig = useTheme();
    return computed<BtnTheme>(() => {
        const _themeConfig = themeConfig!.value;
        let mainColor: string | undefined = _themeConfig.colorGray[2];

        switch (props.color) {
            case 'primary':
                mainColor = _themeConfig.colorPrimary.primary;
                break;
            case 'success':
                mainColor = _themeConfig.colorSuccess.primary;
                break;
            case 'warning':
                mainColor = _themeConfig.colorWarn.primary;
                break;
            case 'danger':
                mainColor = _themeConfig.colorError.primary;
                break;
        }

        const theme: BtnTheme = {
            color: '#fff',
            bgColor: mainColor,
            height: `${SIZE_MAP[props.size]}em`,
            lineHeight: `calc( ${SIZE_MAP[props.size]}em - 2px )`,
            fontSize: (_themeConfig.primaryTextSize * SIZE_MAP[props.size]) / 2 + 'px'
        };

        theme.bemModifiers = [];
        switch (props.mode) {
            case 'normal':
                break;
            case 'empty':
                theme.bemModifiers.push('btn--empty');
                break;
            case 'link':
                theme.bemModifiers.push('btn--link');
                break;
            case 'dashed':
                theme.bemModifiers.push('btn--dashed');
                break;
        }
        switch (props.shape) {
            case 'rectangle':
                theme.bemModifiers.push('btn--rectangle');
                break;
            case 'circle':
                theme.bemModifiers.push('btn--circle');
                break;
            case 'square':
                theme.bemModifiers.push('btn--square');
                break;
            case 'ellipse':
                theme.bemModifiers.push('btn--ellipse');
                break;
        }

        if (props.disabled) {
            theme.bemModifiers.push('btn--disabled');
        }

        return theme;
    });
};
