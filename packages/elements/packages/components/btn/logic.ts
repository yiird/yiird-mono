import type { IconDefinition, IconName } from '@fortawesome/pro-duotone-svg-icons';
import { computed, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight } from '../../config';
import type { Size } from '../../types/global';

export type BtnShape = `rectangle` | `circle` | `square` | `ellipse`;
export type BtnColor = `default` | `primary` | `success` | `warning` | `danger`;
export type BtnMode = 'default' | 'empty' | 'link' | 'dashed';

export const BtnProps = {
    ...BaseProps,
    icon: {
        type: [String, Object] as PropType<IconDefinition | IconName>
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
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
        default: 'default'
    },
    /**
     * 加载状态
     */
    loading: {
        type: Boolean,
        default: false
    }
} as const;

export type BtnPropsType = ExtractPropTypes<typeof BtnProps>;

export interface BtnTheme {
    color?: string;
    bgColor?: string;
    borderColor?: string;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    bemModifiers?: string[];
}

export const useBtnTheme = (props: Readonly<BtnPropsType>) => {
    const themeConfig = useTheme();
    return computed<BtnTheme>(() => {
        const _themeConfig = themeConfig!.value;
        let bgColor: string | undefined = _themeConfig.ye_colorBg;
        let color: string | undefined = '#fff';
        let borderColor: string | undefined = _themeConfig.ye_colorBorder;

        switch (props.color) {
            case 'primary':
                bgColor = borderColor = _themeConfig.ye_colorPrimary.primary;
                break;
            case 'success':
                bgColor = borderColor = _themeConfig.ye_colorSuccess.primary;
                break;
            case 'warning':
                bgColor = borderColor = _themeConfig.ye_colorWarn.primary;
                break;
            case 'danger':
                bgColor = borderColor = _themeConfig.ye_colorError.primary;
                break;
            default: {
                color = _themeConfig.ye_colorPrimaryText;
            }
        }

        const height = sizeToHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: BtnTheme = {
            color: color,
            bgColor: bgColor,
            borderColor: borderColor,
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];
        switch (props.mode) {
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
        if (props.color !== 'default') {
            if (props.mode !== 'default') {
                theme.color = theme.borderColor;
            }
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
