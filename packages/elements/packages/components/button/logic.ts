import { faLoader } from '@fortawesome/pro-light-svg-icons';
import type { ExtractPropTypes, PropType } from 'vue';
import { computed, type SetupContext } from 'vue';
import { AffixProps, BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { createColorGroup, sizeToComponentHeight, sizeToFontSize } from '../../config';
import type { StateColor, StateColorGroup, StringOther, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

export type ButtonShape = `rectangle` | `circle` | `square` | `ellipse` | StringOther;
export type ButtonMode = 'default' | 'half' | 'empty' | 'link' | 'dashed' | StringOther;

export const ButtonProps = {
    ...BaseProps,
    ...AffixProps,
    /**
     * 图标位置
     */
    iconPosition: {
        type: String as PropType<'right' | 'left'>,
        default: 'left'
    },

    /**
     * 颜色
     */
    color: {
        type: [String, Object] as PropType<StateColor | StateColorGroup | (string & { fromT?: any })>,
        default: 'default'
    },
    /**
     * 形状可选
     */
    shape: {
        type: String as PropType<ButtonShape>,
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
        type: String as PropType<ButtonMode>,
        default: 'default'
    },
    /**
     * 加载状态
     */
    loading: {
        type: Boolean,
        default: false
    },
    /**
     * 是否使用阴影
     */
    shadow: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const;

export type ButtonPropsType = Readonly<ExtractPropTypes<typeof ButtonProps>>;

export interface ButtonTheme extends ThemeConfig {
    color: StateColorGroup;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    bemModifiers?: string[];
    shadow?: string;
}

export const ButtonEmits = {};

const obtainTheme = (ctx: InternalSetupContext<ButtonPropsType, typeof ButtonEmits>) => {
    const themeConfig = useTheme();
    const {
        props,
        commonExposed: { cType__ }
    } = ctx;
    return computed<ButtonTheme>(() => {
        const _themeConfig = themeConfig.value;

        const height = sizeToComponentHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: ButtonTheme = {
            ..._themeConfig,
            color: createColorGroup(_themeConfig, props.color),
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };

        if (props.shadow) {
            theme.shadow = `0 2px 0 ${theme.color.primary?.alpha(0.1)}`;
        }

        theme.bemModifiers = [];

        if (props.mode) {
            theme.bemModifiers.push(`${cType__}--${props.mode}`);
        }

        if (props.shape) {
            theme.bemModifiers.push(`${cType__}--${props.shape}`);
        }

        if (props.disabled) {
            theme.bemModifiers.push(`${cType__}--disabled`);
        }

        return theme;
    });
};

export const setupButton = (props: ButtonPropsType, ctx: SetupContext<typeof ButtonEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme({ props, commonExposed, ...ctx });

    return {
        ...commonExposed,
        theme,
        faLoader
    };
};
export const ButtonExpose = [...baseExpose, ...([] as const)];
export type ButtonExposeType = (typeof ButtonExpose)[number];
