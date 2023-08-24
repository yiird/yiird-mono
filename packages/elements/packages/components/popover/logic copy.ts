import { arrow, autoPlacement, autoUpdate, hide, limitShift, offset, shift, useFloating, type Boundary, type MiddlewareState } from '@floating-ui/vue';
import type Color from 'color';
import { debounce } from 'lodash-es';
import { computed, onBeforeMount, onMounted, ref, watch, watchEffect, watchPostEffect, type ComputedRef, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { checkPointInOneRect, extractEl, isElement, styleValueToNumber, toStyleValue } from '../../common/dom-utils';
import { BaseProps, ShadowProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { stateColor } from '../../config';
import type { Placement, StateColor } from '../../types/global';
import type { PopoverReference, PoppoverMode } from '../../types/popover';
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
    maxWidth: {
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
        default: true
    },
    ...ShadowProps
} as const;
export type PopoverPropsType = Readonly<ExtractPropTypes<typeof PopoverProps>>;

export interface PopoverTheme extends ThemeConfig {
    bemModifiers?: string[];
    color: Color;
    textColor: string;
    arrowSize: string;
    maxWidth: string;
    radius: string;
    shadow: string;
    padding: string;
}

export const PopoverEmits = {
    /**
     * 点击气泡、挂载组件以外的区域
     */
    clickOut: null
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
            maxWidth: toStyleValue(props.maxWidth),
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
    const { emit } = ctx;
    const { el } = commonExposed;

    const reference = ref();

    watchEffect(() => {
        if (props.reference) {
            reference.value = extractEl(props.reference);
        }
    });

    onMounted(() => {
        if (props.reference && !reference.value) {
            reference.value = extractEl(props.reference);
        }
    });

    const _display = ref(props.display);

    watchEffect(() => {
        _display.value = props.display;
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
            right: '',
            bottom: '',
            left: arrowX != null ? `${arrowX}px` : '',
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

    /**
     * @private
     */
    const _toggle = () => {
        _display.value = !_display.value;
    };

    /**
     * @private
     */
    const _show = () => {
        const _reference = reference.value;
        _display.value = true;
        const mode = props.mode;
        if (isElement(_reference)) {
            if ('hover' === mode || 'click-leave' === mode) {
                document.addEventListener('mouseover', _debounceHide);
            } else if ('click-out' === mode) {
                document.addEventListener('click', _debounceHide);
            }
        }
    };

    /**
     * @private
     */
    const _removeDocumentListener = () => {
        document.removeEventListener('click', _debounceHide);
        document.removeEventListener('click', _checkMousePositionIsOut);
        document.removeEventListener('mouseover', _debounceHide);
    };

    /**
     * @private
     */
    const _checkMousePositionIsOut = (_event: Event) => {
        if (_event instanceof MouseEvent) {
            const _reference = reference.value;
            const floating = el.value;
            const hideThinkOverPop = props.hideThinkOverPop;
            if (floating && _reference) {
                const { x, y } = _event;
                if (hideThinkOverPop) {
                    const rects = [floating.getBoundingClientRect(), _reference.getBoundingClientRect()];

                    if (checkPointInOneRect({ x, y }, ...rects)) {
                        return;
                    }
                }

                emit('clickOut');
            }
        }
    };

    /**
     * @private
     */
    const _debounceHide = debounce((_event) => {
        const _reference = reference.value;
        const floating = el.value;
        const hideThinkOverPop = props.hideThinkOverPop;
        if (floating && _reference) {
            const { x, y } = _event;
            if (hideThinkOverPop) {
                const rects = [floating.getBoundingClientRect(), _reference.getBoundingClientRect()];

                if (checkPointInOneRect({ x, y }, ...rects)) {
                    return;
                }
            }
            _removeDocumentListener();
            _display.value = false;
            emit('clickOut');
        }
    }, 100);

    const referenceWatchStop = watch(reference, (_reference) => {
        const mode = props.mode;
        if (_reference && isElement(_reference)) {
            if ('click' === mode) {
                _reference.addEventListener('click', _toggle);
            } else if ('hover' === mode) {
                _reference.addEventListener('mouseenter', _show);
            } else if ('click-out' === mode) {
                _reference.addEventListener('click', _show);
            } else if ('click-leave' === mode) {
                _reference.addEventListener('click', _show);
            } else if ('manual' === mode) {
                document.addEventListener('click', _checkMousePositionIsOut);
            }
        }
        referenceWatchStop();
    });

    onBeforeMount(() => {
        const _reference = reference.value;
        if (_reference && isElement(_reference)) {
            _reference.removeEventListener('click', _checkMousePositionIsOut);
            _reference.removeEventListener('click', _toggle);
            _reference.removeEventListener('mouseenter', _show);
            _removeDocumentListener();
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
