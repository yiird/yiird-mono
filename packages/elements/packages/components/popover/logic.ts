import { arrow, autoPlacement, autoUpdate, hide, limitShift, offset, shift, useFloating, type Boundary, type MiddlewareState } from '@floating-ui/vue';
import type Color from 'color';
import {
    computed,
    onMounted,
    onScopeDispose,
    ref,
    unref,
    watch,
    watchEffect,
    watchPostEffect,
    type ComputedRef,
    type ExtractPropTypes,
    type PropType,
    type SetupContext
} from 'vue';
import { usePopoverDisplayEvent } from '../../common/composites-popover';
import { extractEl, isElement, styleValueToNumber, toStyleValue } from '../../common/dom-utils';
import { BaseProps, ShadowProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { stateColor } from '../../config';
import type { Placement, StateColor } from '../../types/global';
import type { PopoverEventArgs, PopoverReference, PoppoverMode } from '../../types/popover';
import type { InternalSetupContext } from '../../types/prefab';
import type { ThemeConfig } from '../../types/theme';

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
    /**
     * 允许出现的位置,相对于`reference`
     */
    allowPlacement: {
        type: Array as PropType<Placement[]>,
        default() {
            return ['bottom'];
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
     * 距离挂载元素的偏移
     */
    offset: {
        type: Number as PropType<number>,
        default: 5
    },
    /**
     * 最小宽度
     */
    minWidth: {
        type: [String, Number] as PropType<string | number>
    },
    /**
     * 最大宽度
     */
    maxWidth: {
        type: [String, Number] as PropType<string | number>
    },
    /**
     * 最小高度
     */
    minHeight: {
        type: [String, Number] as PropType<string | number>
    },
    /**
     * 最大高度
     */
    maxHeight: {
        type: [String, Number] as PropType<string | number>
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
    const { props } = ctx;
    return computed<PopoverTheme>(() => {
        const _themeConfig = themeConfig.value;
        const theme: PopoverTheme = {
            ..._themeConfig,
            color: stateColor(_themeConfig, props.color).primary,
            textColor: props.textColor,
            arrowSize: toStyleValue(props.arrowSize, '8px'),
            minWidth: toStyleValue(props.minWidth, 'unset'),
            maxWidth: toStyleValue(props.maxWidth, 'unset'),
            minHeight: toStyleValue(props.minHeight, 'unset'),
            maxHeight: toStyleValue(props.maxHeight, 'unset'),
            radius: toStyleValue(_themeConfig.ye_radius_regular),
            shadow: _themeConfig.ye_boxshadow(props.shadowLevel, props.shadowDirection),
            padding: `${props.padding}px`
        };

        theme.bemModifiers = [];

        theme.bemModifiers.push(`popover--arrow-${arrowSide.value}`);

        return theme;
    });
};

const computedOffset = (state: MiddlewareState, mainOffset: number) => {
    const reference = state.elements.reference;
    const placement = state.placement;
    if (isElement(reference)) {
        const styles = getComputedStyle(reference);
        let crossAxis = 0;
        if (styles.borderInlineWidth === '0px' || styles.borderLeftWidth === '0px' || styles.borderRightWidth === '0px') {
            if (placement.endsWith('start')) {
                crossAxis = styleValueToNumber(styles.paddingLeft);
            } else if (placement.endsWith('end')) {
                crossAxis = -styleValueToNumber(styles.paddingRight);
            }
        }

        return {
            mainAxis: mainOffset,
            crossAxis: crossAxis
        };
    }

    return {
        mainAxis: mainOffset
    };
};

export const setupPopover = (props: PopoverPropsType, ctx: SetupContext<typeof PopoverEmits>) => {
    const commonExposed = usePrefab(props);
    const arrowRef = ref();
    const { el } = commonExposed;
    const { emit } = ctx;

    const reference = ref();

    let removeListener: Function;
    const _display = ref(props.display);

    watchEffect(() => {
        if (props.reference) {
            reference.value = extractEl(props.reference);
            if (props.mode !== 'manual' && reference.value) {
                const { display: __display, removeListener: _removeListener } = usePopoverDisplayEvent(reference.value, el.value, props.mode, props.hideThinkOverPop);
                removeListener = _removeListener;
                watch(__display, (flag) => {
                    _display.value = flag;
                    emit('open', {
                        el: unref(el),
                        flag: flag
                    });
                });
            } else {
                watch(
                    () => props.display,
                    (flag) => {
                        _display.value = flag;
                        emit('open', {
                            el: unref(el),
                            flag: flag
                        });
                    }
                );
            }
        }
    });
    onMounted(() => {
        if (props.reference && !reference.value) {
            reference.value = extractEl(props.reference);
        }
    });

    const { floatingStyles, middlewareData, placement, x, y } = useFloating(reference, el, {
        placement: props.allowPlacement[0],
        middleware: [
            hide(),
            offset((state) => computedOffset(state, props.offset)),
            autoPlacement({
                allowedPlacements: props.allowPlacement,
                boundary: el.value?.getBoundingClientRect(),
                rootBoundary: 'viewport'
            }),
            shift({
                limiter: limitShift()
            }),
            arrow({ element: arrowRef, padding: 3 })
        ],
        whileElementsMounted(...args) {
            return autoUpdate(...args, {
                animationFrame: true
            });
        }
    });

    const obtainArrowSide = computed(() => {
        return {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
        }[placement.value.split('-')[0]];
    });

    watchPostEffect(() => {
        const _x = x.value;
        const _y = y.value;
        const _middlewareData = middlewareData.value;
        const _arrowRef = arrowRef.value;
        const _side = obtainArrowSide.value;
        const _floatingRef = el.value;
        const { referenceHidden } = _middlewareData.hide || {};
        const { x: arrowX, y: arrowY } = _middlewareData.arrow || {};

        const position = {
            top: arrowY != null ? `${arrowY}px` : '',
            left: '',
            bottom: '',
            right: arrowX != null ? `${arrowX}px` : '',
            [_side + '']: '-4px'
        };
        Object.assign(_arrowRef.style, position);
        Object.assign(_floatingRef.style, {
            x: _x,
            y: _y,
            visibility: !_display.value || referenceHidden ? 'hidden' : 'visible'
        });
    });

    const theme = obtainTheme({ props, commonExposed, ...ctx }, obtainArrowSide);

    onScopeDispose(() => {
        if (removeListener) {
            removeListener();
        }
    });

    return {
        ...commonExposed,
        theme,
        arrowRef,
        floatingRef: el,
        floatingStyles,
        obtainSide: obtainArrowSide,
        isOpen: _display
    };
};

export const PopoverExpose = [...baseExpose, ...([] as const)];
export type PopoverExposeType = (typeof PopoverExpose)[number];
