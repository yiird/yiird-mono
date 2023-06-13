import { faLoader } from '@fortawesome/pro-light-svg-icons';
import { isObject } from 'lodash-es';
import { computed, ref, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight, stateColor } from '../../config';
import type { InternalSetupContext, Size, StateColor, StateColorGroup, ThemeConfig } from '../../types/global';
import type { IconNameOrDefinition } from '../icon/logic';

export type BtnShape = `rectangle` | `circle` | `square` | `ellipse`;
export type BtnMode = 'default' | 'half' | 'empty' | 'link' | 'dashed';

export const BtnProps = {
    ...BaseProps,
    icon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    /**
     * 图标位置
     */
    iconPosition: {
        type: String as PropType<'right' | 'left'>,
        default: 'left'
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
        type: [String, Object] as PropType<StateColor | StateColorGroup>,
        default: 'default'
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
    color: StateColorGroup;
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

        const height = sizeToHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: BtnTheme = {
            ..._themeConfig,
            color: isObject(props.color) ? props.color : stateColor(_themeConfig, props.color),
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };

        if (props.shadow) {
            theme.shadow = `0 2px 0 ${theme.color.primary?.alpha(0.1)}`;
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
        faLoader,
        buttonRef,
        obtainHasPopover
    };
};
export const btnExpose = [...baseExpose];
