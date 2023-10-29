import type { Boundary } from '@floating-ui/vue';
import type Color from 'color';
import { computed, onScopeDispose, type ComputedRef, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { isLimitDimensions } from '../../common/check-type';
import { usePopover } from '../../common/composites-popover';
import { extractEl, toStyleValue } from '../../common/dom-utils';
import { BaseProps, ShadowProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { stateColor } from '../../config';
import type { PopoverEventArgs, PopoverReference, PoppoverMode } from '../../types/components';
import type { Dimensions, Offset, Placement, StateColor, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

export const PopoverProps = {
    ...BaseProps,
    /**
     * 显示隐藏
     */
    display: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 挂载元素或挂载元素的ID
     */
    reference: {
        type: [String, Object] as PropType<PopoverReference>
    },
    /**
     * 边界
     */
    boundary: {
        type: [String, Object] as PropType<Boundary>,
        default: 'clippingAncestors'
    },
    padding: {
        type: Number,
        default: 0
    },
    /**
     * 颜色
     */
    color: {
        type: String as PropType<StateColor | string>,
        default: 'default'
    },
    /**
     * 内容
     */
    text: {
        type: String as PropType<string>
    },
    /**
     * 文本颜色
     */
    textColor: {
        type: String as PropType<StateColor | string>,
        default: '#ffffff'
    },
    placement: {
        type: String as PropType<Placement>,
        default() {
            return 'bottom';
        }
    },
    /**
     * 允许出现的位置,相对于`reference`
     */
    allowPlacement: {
        type: Array as PropType<Placement[]>,
        default() {
            return [];
        }
    },
    /**
     * 箭头尺寸
     */
    arrowSize: {
        type: [String, Number] as PropType<string | number>,
        default: '8px'
    },
    /**
     * 显示隐藏箭头
     */
    arrow: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * 距离挂载元素的偏移
     */
    offset: {
        type: [Number, Object] as PropType<Offset>,
        default: 5
    },
    width: {
        type: [String, Number, Object] as PropType<Dimensions>
    },
    height: {
        type: [String, Number, Object] as PropType<Dimensions>
    },
    /**
     * 显示隐藏模式
     * `click` 点击挂载元素显示，点击其他非其他区域隐藏
     * `hover` 鼠标进入挂载元素显示，移出隐藏
     * `click-out` 点击挂载元素显示，点其他区域隐藏
     * `click-leave` 点击挂载元素显示，移到其他区域隐藏
     */
    mode: {
        type: String as PropType<PoppoverMode>,
        default: 'manual'
    },
    /**
     * 隐藏时是否考虑pop区域，如果为true时，隐藏的时候会考虑是否在pop区域内，如果不在pop区域才会隐藏
     */
    hideThinkOverPop: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    ...ShadowProps
} as const;
export type PopoverPropsType = Readonly<ExtractPropTypes<typeof PopoverProps>>;

export interface PopoverTheme extends ThemeConfig {
    bemModifiers?: string[];
    color: Color;
    textColor: string;
    arrowSize: string;
    radius: string;
    shadow: string;
    padding: string;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
}

export const PopoverEmits = {
    /**
     *
     * 打开事件
     *
     * @param {PopoverEventArgs} args
     * @returns
     */
    open(args: PopoverEventArgs) {
        return true;
    }
};

const obtainTheme = (ctx: InternalSetupContext<PopoverPropsType, typeof PopoverEmits>, arrowSide: ComputedRef) => {
    const themeConfig = useTheme();
    const {
        props,
        commonExposed: { cType__ }
    } = ctx;
    return computed<PopoverTheme>(() => {
        const { width, height, arrowSize, shadowLevel, shadowDirection, padding, color, textColor, arrow } = props;

        const _themeConfig = themeConfig.value;

        const theme: PopoverTheme = {
            ..._themeConfig,
            color: stateColor(_themeConfig, color).primary,
            textColor: textColor,
            arrowSize: toStyleValue(arrowSize, '8px'),
            minWidth: isLimitDimensions(width) ? toStyleValue(width.min, 'unset') : toStyleValue(width, 'unset'),
            maxWidth: isLimitDimensions(width) ? toStyleValue(width.max, 'unset') : toStyleValue(width, 'unset'),
            minHeight: isLimitDimensions(height) ? toStyleValue(height.min, 'unset') : toStyleValue(height, 'unset'),
            maxHeight: isLimitDimensions(height) ? toStyleValue(height.max, 'unset') : toStyleValue(height, 'unset'),
            radius: toStyleValue(_themeConfig.ye_radius_regular),
            shadow: _themeConfig.ye_boxshadow(shadowLevel, shadowDirection),
            padding: `${padding}px`
        };

        theme.bemModifiers = [];

        theme.bemModifiers.push(`${cType__}--arrow-${arrowSide.value}`);
        if (!arrow) {
            theme.bemModifiers.push(`${cType__}--arrow-hide`);
        }

        return theme;
    });
};

export const setupPopover = (props: PopoverPropsType, ctx: SetupContext<typeof PopoverEmits>) => {
    const commonExposed = usePrefab(props);

    const { el } = commonExposed;

    const obtainReference = computed(() => extractEl(props.reference));

    const { arrow, floatingStyles, visibility, arrowSide, clear } = usePopover(obtainReference, el, {
        placement: computed(() => props.placement),
        display: props.display,
        allowPlacement: props.allowPlacement,
        offset: props.offset,
        mode: props.mode,
        hideThinkOverPop: props.hideThinkOverPop,
        arrowSize: props.arrowSize
    });

    const theme = obtainTheme({ props, commonExposed, ...ctx }, arrowSide);

    const open = () => {
        visibility.value = true;
    };

    const close = () => {
        visibility.value = false;
    };

    const toggle = () => {
        visibility.value = !visibility.value;
    };

    onScopeDispose(() => {
        clear();
    });

    return {
        ...commonExposed,
        theme,
        arrow,
        floatingStyles,
        obtainSide: '',
        visibility,
        toggle,
        open,
        close
    };
};

export const PopoverExpose = [...baseExpose, ...(['toggle', 'open', 'close'] as const)];
export type PopoverExposeType = (typeof PopoverExpose)[number];
