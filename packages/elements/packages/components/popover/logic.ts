import {
    arrow,
    autoPlacement,
    autoUpdate,
    hide,
    limitShift,
    offset,
    shift,
    useFloating,
    type Boundary,
    type VirtualElement,
    type ReferenceElement as _ReferenceElement
} from '@floating-ui/vue';
import type Color from 'color';
import { debounce, isObject, isString } from 'lodash-es';
import {
    computed,
    getCurrentInstance,
    onBeforeMount,
    ref,
    watch,
    watchEffect,
    watchPostEffect,
    type ComputedRef,
    type ExtractPropTypes,
    type PropType,
    type SetupContext
} from 'vue';
import { checkPointInOneRect, isElement, toStyleValue } from '../../common/dom-utils';
import { BaseProps, ShadowProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { stateColor } from '../../config';
import type { CommonExposed, InternalSetupContext, Placement, StateColor, ThemeConfig } from '../../types/global';

export type PoppoverMode = 'border' | 'fill' | 'empty';
export type PoppoverHideMode = 'manual' | 'click' | 'hover' | 'click-out' | 'click-leave';

/**
 * 挂载元素
 */
export type ReferenceElement = _ReferenceElement;

const getAllowPlacement = (placement?: string) => {
    const _placement = placement ? placement.split('-')[0] : 'all';
    const allow = [];
    switch (_placement) {
        case 'top':
        case 'bottom': {
            allow.push('top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end');
            break;
        }
        case 'left':
        case 'right': {
            allow.push('left', 'right', 'left-start', 'left-end', 'right-start', 'right-end');
            break;
        }
        default: {
            allow.push('left', 'right', 'top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end');
            break;
        }
    }
    return allow;
};

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
        type: [String, Object] as PropType<string | ReferenceElement | CommonExposed>
    },
    /**
     * 边界
     */
    boundary: {
        type: [String, Object] as PropType<Boundary>,
        default: 'clippingAncestors'
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
     * 默认为`fill`填充模式，`border`:边框模式
     */
    mode: {
        type: String as PropType<PoppoverMode>,
        default: 'fill'
    },
    /**
     * 默认位置,相对于`reference`
     */
    defaultPlacement: {
        type: String as PropType<Placement>,
        default: 'bottom'
    },
    /**
     * 允许出现的位置,相对于`reference`
     */
    allowPlacement: {
        type: Array as PropType<Placement[]>,
        default(rawProps: any) {
            return getAllowPlacement(rawProps.defaultPlacement);
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
     * 最大宽度，默认自适应
     */
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
    hideMode: {
        type: String as PropType<PoppoverHideMode>,
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
}

export const PopoverEmits = {};

export const isVirtualElement = (ve: any): ve is VirtualElement => {
    return !!ve.getBoundingClientRect;
};

export const extractDom = (propReference?: ReferenceElement | CommonExposed | string) => {
    let reference: ReferenceElement | undefined;
    if (isString(propReference)) {
        const _reference = document.querySelector(propReference);
        if (_reference) {
            reference = _reference;
        }
    } else if (isElement(propReference)) {
        reference = propReference as Element;
    } else if (isObject(propReference)) {
        if (isVirtualElement(propReference)) {
            reference = propReference;
        } else {
            const $el = Object.getOwnPropertyDescriptor(propReference, '$el');
            const el = Object.getOwnPropertyDescriptor(propReference, 'el');
            reference = ($el || el)?.get?.apply(propReference);
        }
    }

    return reference;
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
            shadow: _themeConfig.ye_boxshadow(props.shadowLevel, props.shadowDirection)
        };

        theme.bemModifiers = [];

        if (props.mode) {
            theme.bemModifiers.push(`popover--${props.mode}`);
        }

        theme.bemModifiers.push(`popover--arrow-${arrowSide.value}`);

        return theme;
    });
};

export const setupPopover = (props: PopoverPropsType, ctx: SetupContext<typeof PopoverEmits>) => {
    const prefab = usePrefab(props);
    const arrowRef = ref();
    const { el } = prefab;

    const obtainReference = computed(() => {
        return extractDom(props.reference);
    });

    getCurrentInstance();

    const _display = ref(props.display);

    watchEffect(() => {
        _display.value = props.display;
    });

    const { floatingStyles, middlewareData, placement, x, y } = useFloating(obtainReference, el, {
        placement: props.defaultPlacement,
        middleware: [
            hide(),
            offset(props.offset),
            autoPlacement({
                allowedPlacements: props.allowPlacement,
                boundary: el.value?.getBoundingClientRect(),
                rootBoundary: document.querySelector('#container')?.getBoundingClientRect()
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
            left: arrowX != null ? `${arrowX}px` : '',
            bottom: '',
            right: '',
            [_side + '']: '-4px'
        };
        Object.assign(_arrowRef.style, position);
        Object.assign(_floatingRef.style, {
            x: _x,
            y: _y,
            visibility: !_display.value || referenceHidden ? 'hidden' : 'visible'
        });
    });

    const theme = obtainTheme({ props, commonExposed: prefab, ...ctx }, obtainArrowSide);

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
        const reference = obtainReference.value;
        _display.value = true;
        const hideMode = props.hideMode;
        if (isElement(reference)) {
            if ('hover' === hideMode || 'click-leave' === hideMode) {
                document.addEventListener('mouseover', _debounceHide);
            } else if ('click-out' === hideMode) {
                document.addEventListener('click', _debounceHide);
            }
        }
    };

    /**
     * @private
     */
    const _removeDocumentListener = () => {
        document.removeEventListener('click', _debounceHide);
        document.removeEventListener('mouseover', _debounceHide);
    };

    /**
     * @private
     */
    const _debounceHide = debounce((_event) => {
        const reference = obtainReference.value;
        const floating = el.value;
        const hideThinkOverPop = props.hideThinkOverPop;
        if (floating && reference) {
            const { x, y } = _event;
            if (hideThinkOverPop) {
                const rects = [floating.getBoundingClientRect(), reference.getBoundingClientRect()];

                if (checkPointInOneRect({ x, y }, ...rects)) {
                    return;
                }
            }
            _removeDocumentListener();
            _display.value = false;
        }
    }, 100);

    const referenceWatchStop = watch(obtainReference, (reference) => {
        const hideMode = props.hideMode;
        if (reference && isElement(reference)) {
            if ('click' === hideMode) {
                reference.addEventListener('click', _toggle);
            } else if ('hover' === hideMode) {
                reference.addEventListener('mouseenter', _show);
            } else if ('click-out' === hideMode) {
                reference.addEventListener('click', _show);
            } else if ('click-leave' === hideMode) {
                reference.addEventListener('click', _show);
            }
        }
        referenceWatchStop();
    });

    onBeforeMount(() => {
        const reference = obtainReference.value;
        if (reference && isElement(reference)) {
            reference.removeEventListener('click', _toggle);
            reference.removeEventListener('mouseenter', _show);
            _removeDocumentListener();
        }
    });

    return {
        ...prefab,
        theme,
        arrowRef,
        floatingRef: el,
        floatingStyles,
        obtainSide: obtainArrowSide,
        isOpen: _display
    };
};
export const popoverExpose = [...baseExpose];
