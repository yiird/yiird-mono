import type { IconDefinition } from '@fortawesome/pro-duotone-svg-icons';
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons';
import Color from 'color';
import { computed, ref, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight, stateColor, textStateColor } from '../../config';
import type { InternalSetupContext, Size, StateColor, ThemeConfig } from '../../types/global';

export type BtnShape = `rectangle` | `circle` | `square` | `ellipse`;
export type BtnMode = 'default' | 'half' | 'empty' | 'link' | 'dashed';

type BtnColor = {
    bg?: Color;
    text?: Color;
    border?: Color;
};

export const BtnProps = {
    ...BaseProps,
    icon: {
        type: [String, Object] as PropType<string | IconDefinition>
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
        type: String as PropType<StateColor>,
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
    },
    /**
     * 是否使用阴影
     */
    shadow: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const;

export type BtnPropsType = Readonly<ExtractPropTypes<typeof BtnProps>>;

export interface BtnTheme extends ThemeConfig {
    color: BtnColor;
    reverseColor: BtnColor;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    bemModifiers?: string[];
    shadow?: string;
}

export const BtnEmits = {};

const obtainTheme = (ctx: InternalSetupContext<BtnPropsType, typeof BtnEmits>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    return computed<BtnTheme>(() => {
        const _themeConfig = themeConfig.value;

        const bgColor = props.color === 'default' ? _themeConfig.ye_colorBorder : stateColor(_themeConfig, props.color);

        const textColor =
            props.mode === 'default' ? textStateColor(_themeConfig, props.textColor || bgColor) : props.color === 'default' ? _themeConfig.ye_colorPrimaryText : bgColor;

        const color: BtnColor = {
            bg: bgColor.alpha(0.8),
            text: textColor,
            border: props.mode === 'default' && props.shadow ? new Color('transparent') : bgColor
        };

        if (_themeConfig.ye_isDark) {
            if (props.color === 'default' && props.mode === 'default') {
                color.text = new Color('black');
            }
        }

        if (props.mode === 'half') {
            color.bg = bgColor.alpha(bgColor.alpha() * 0.15);
        }

        const reverseBgColor = props.color === 'default' ? new Color(_themeConfig.ye_colorPrimary.primary) : bgColor;
        const reverseTextColor = props.mode === 'default' ? textStateColor(_themeConfig, reverseBgColor) : reverseBgColor;

        const reverseColor: BtnColor = {
            bg: reverseBgColor,
            text: reverseTextColor,
            border: reverseBgColor
        };

        const height = sizeToHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: BtnTheme = {
            ..._themeConfig,
            color,
            reverseColor,
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };

        if (props.shadow) {
            theme.shadow = `0 2px 0 ${bgColor.alpha(0.1)}`;
        }

        theme.bemModifiers = [];

        if (props.mode) {
            theme.bemModifiers.push(`btn--${props.mode}`);
        }

        if (props.shape) {
            theme.bemModifiers.push(`btn--${props.shape}`);
        }

        if (props.disabled) {
            theme.bemModifiers.push('btn--disabled');
        }

        return theme;
    });
};

export const setupBtn = (props: BtnPropsType, ctx: SetupContext<typeof BtnEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme({ props, prefab, ...ctx });

    const buttonRef = ref();

    const { slots } = ctx;

    const obtainHasPopover = computed(() => !!slots.drop);
    return {
        ...prefab,
        theme,
        faSpinner,
        buttonRef,
        obtainHasPopover
    };
};
export const btnExpose = [...baseExpose];
