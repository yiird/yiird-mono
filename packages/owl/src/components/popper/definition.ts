import {
    arrow as arrowMiddleware,
    autoUpdate,
    computePosition,
    flip as flipMiddleware,
    hide as hideMiddleware,
    Middleware,
    offset as offsetMiddleware,
    Placement,
    shift as shiftMiddleware
} from '@floating-ui/dom';
import { debounce, isElement, isObject, isString } from 'lodash-es';
import { inject, isRef, onMounted, onUnmounted, PropType, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { error } from '../../common/logger';
import { BaseProps, GlobalPopperWrapKey } from '../../common/prefab';

/**
 * 虚拟元素定义
 * 您可以使用虚拟元素而不是真实的 DOM 元素作为Popper参考。
 */
export interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}

export const isVirtualElement = (ve: VirtualElement): ve is VirtualElement => {
    return !!ve.getBoundingClientRect;
};

export type PopperMode = 'manul' | 'click' | 'hover' | 'click-out';

/**
 * 偏移量
 */
export interface PopperOffset {
    /**
     * 参照物侧方向滑动偏移量
     */
    crossAxis?: number;
    /**
     * 距离参照物距离偏移量
     */
    mainAxis?: number;
}

export type PopperPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';

export const PopperProps = {
    ...BaseProps,
    /**
     * 参照物
     * reference 可为DOM元素、虚拟DOM元素、vue refDOM对象、css选择器
     */
    reference: {
        type: [Element, Object, String] as PropType<Element | VirtualElement | string>
    },
    /**
     * 显示隐藏模式
     * `manul` 根据 `display` 进行显示隐藏
     * `click` 点击参照物显示，点击其他非参照物区域隐藏
     * `hover` 鼠标进入参照物隐藏，移出隐藏
     * `click-out` 点击参照物显示，移出参照物隐藏
     */
    mode: {
        type: String as PropType<PopperMode>,
        default: 'hover'
    },
    /**
     * 鼠标在popper上时是否允许隐藏
     */
    hideOnPopper: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 当参照物在裁剪区域内显示，参照物移动出裁剪区域则隐藏
     */
    hideOnOut: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 设置相对参照物的偏移
     */
    offset: {
        type: Object as PropType<PopperOffset>,
        default() {
            return {
                mainAxis: 8
            };
        }
    },
    /**
     * 设置相对参照物的位置
     */
    placement: {
        type: String as PropType<PopperPlacement>,
        default: 'bottom'
    },
    /**
     * 箭头位置
     * @values `edge` `*-start|*-end`靠近参照物边缘开始或结束, `fit` 自适应
     */
    arrowPlacement: {
        type: String as PropType<'edge' | 'fit'>,
        default: 'edge'
    },
    /**
     * 更新每一帧
     */
    updateEveryFrame: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    shadow: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    bgColor: {
        type: String as PropType<string>
    },
    borderColor: {
        type: String as PropType<string>
    }
};

export type PopperVariables = {
    bgColor?: string;
    borderColor?: string;
};

export type PopperBemKeys = {
    modifiers: 'shadow';
    elements: {
        arrow: string;
    };
};

export const extractDom = (propReference?: Element | VirtualElement | string) => {
    const { t } = useI18n();
    let reference: Element | VirtualElement | undefined;
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
            const el = Object.getOwnPropertyDescriptor(propReference, '$el');
            reference = el?.get?.apply(propReference);
        }
    }
    if (!reference) {
        throw error(t('message._lib_.errors.inValidProp', ['reference']));
    }
    return reference;
};

export type PopperOptions = {
    placement?: Ref<PopperPlacement> | PopperPlacement;
    offset?: Ref<PopperOffset> | PopperOffset;
    mode?: PopperMode;
    display?: Ref<boolean> | boolean;
    hideOnPopper?: Ref<boolean> | boolean;
    hideOnOut?: Ref<boolean> | boolean;
    arrowPlacement?: Ref<string> | string;
    updateEveryFrame?: boolean;
    onPopperOpen?: () => void;
    onPopperClose?: () => void;
};

const createPopper = (
    referenceEl: HTMLElement | VirtualElement,
    popperEl: HTMLElement,
    arrowEl: HTMLElement,
    arrowPlacement = 'fit',
    hideOnOut = false,
    placement?: Placement,
    offset?: PopperOffset,
    updateEveryFrame = false
) => {
    const middleware: Middleware[] = [offsetMiddleware(offset), flipMiddleware(), arrowMiddleware({ element: arrowEl }), shiftMiddleware()];
    if (hideOnOut) {
        middleware.push(hideMiddleware());
    }
    return autoUpdate(
        referenceEl,
        popperEl,
        () => {
            computePosition(referenceEl, popperEl, {
                placement,
                strategy: 'absolute',
                middleware
            }).then(({ x, y, placement: computedPlacement, middlewareData }) => {
                Object.assign(popperEl.style, {
                    left: `${x}px`,
                    top: `${y}px`
                });

                const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[computedPlacement.split('-')[0]];

                const position = {
                    top: arrowY != null ? `${arrowY}px` : '',
                    left: arrowX != null ? `${arrowX}px` : '',
                    right: '',
                    border: 'none',
                    [staticSide + '']: '-4px'
                };

                // 当带有 -start -end 时尽量靠近开始或者结束位置
                if (arrowPlacement === 'edge') {
                    if ('bottom-start' === computedPlacement || 'top-start' === computedPlacement) {
                        position.left = '5px';
                        position.right = '';
                    }

                    if ('bottom-end' === computedPlacement || 'top-end' === computedPlacement) {
                        position.left = '';
                        position.right = '5px';
                    }

                    if ('right-start' === computedPlacement || 'left-start' === computedPlacement) {
                        position.top = '5px';
                        position.bottom = '';
                    }

                    if ('right-end' === computedPlacement || 'left-end' === computedPlacement) {
                        position.top = '';
                        position.bottom = '5px';
                    }
                }
                // 箭头边框颜色
                if (computedPlacement.includes('bottom')) {
                    position.borderTop = 'inherit';
                    position.borderLeft = 'inherit';
                } else if (computedPlacement.includes('top')) {
                    position.borderBottom = 'inherit';
                    position.borderRight = 'inherit';
                } else if (computedPlacement.includes('right')) {
                    position.borderBottom = 'inherit';
                    position.borderLeft = 'inherit';
                } else if (computedPlacement.includes('left')) {
                    position.borderTop = 'inherit';
                    position.borderRight = 'inherit';
                }

                Object.assign(arrowEl.style, position);
            });
        },
        {
            animationFrame: updateEveryFrame
        }
    );
};

export const usePopper = (referenceEl: HTMLElement | VirtualElement, popperDom: Ref<HTMLElement | undefined>, arrowDom: Ref<HTMLElement | undefined>, options?: PopperOptions) => {
    const { t } = useI18n();

    const popperWrapKey = inject(GlobalPopperWrapKey);
    const popperTo = `div[data-o-key=${popperWrapKey}].o-popper-wrap`;

    if (!popperWrapKey) {
        throw error(t('message._lib_.errors.whereIsNoPopWapper'));
    }
    const { placement, offset, arrowPlacement, hideOnOut, mode, display, hideOnPopper, onPopperOpen, onPopperClose, updateEveryFrame } = options || {};

    let popperEl: HTMLElement;

    const show = () => {
        if (popperEl) {
            if (popperEl.style.display === 'block') return;
            popperEl.style.display = 'block';
        }
        if (onPopperOpen) {
            onPopperOpen.apply(null);
        }
    };

    const hide = () => {
        if (popperEl) {
            if (popperEl.style.display === 'none' || !popperEl.style.display) return;
            popperEl.style.display = 'none';
        }
        if (onPopperClose) {
            onPopperClose.apply(null);
        }
    };

    const clickMode = (event: Event) => {
        if (popperEl && referenceEl) {
            const _hideOnPopper = isRef(hideOnPopper) ? hideOnPopper.value : hideOnPopper;
            const paths = event.composedPath();
            const clickOnReferrence = referenceEl instanceof Element && paths.includes(referenceEl);
            const clickOnPopper = paths.includes(popperEl);
            if (_hideOnPopper ? clickOnReferrence : clickOnReferrence || clickOnPopper) {
                show();
            } else {
                hide();
            }
        }
    };

    const debounceHide = debounce((_event) => {
        if (popperEl && referenceEl) {
            const _hideOnPopper = isRef(hideOnPopper) ? hideOnPopper.value : hideOnPopper;
            const paths = _event.path;
            const clickOnReferrence = referenceEl instanceof Element && paths.includes(referenceEl);
            const clickOnPopper = paths.includes(popperEl);
            if (!(_hideOnPopper ? clickOnReferrence : clickOnReferrence || clickOnPopper)) {
                hide();
            }
        }
    }, 200);

    let cleanup: () => void;

    onMounted(() => {
        const _popperEl = popperDom.value;
        if (_popperEl) popperEl = _popperEl;
        const arrowEl = arrowDom.value;
        if (popperEl && arrowEl) {
            watchEffect(() => {
                if (cleanup) cleanup();
                const _offset = isRef(offset) ? offset.value : offset;
                const _placement = isRef(placement) ? placement.value : placement;
                const _arrowPlacement = isRef(arrowPlacement) ? arrowPlacement.value : arrowPlacement;
                const _hideOnOut = isRef(hideOnOut) ? hideOnOut.value : hideOnOut;
                cleanup = createPopper(referenceEl, popperEl, arrowEl, _arrowPlacement, _hideOnOut, _placement, _offset, updateEveryFrame);
            });

            if ('manul' === mode) {
                if (isRef(display)) {
                    watch(display, (flag) => (flag ? show() : hide()), {
                        immediate: true
                    });
                }
            } else if ('click' === mode) {
                if (referenceEl instanceof Element) {
                    document.addEventListener('click', clickMode, true);
                }
            } else if ('hover' === mode) {
                if (referenceEl instanceof Element) {
                    referenceEl.addEventListener('mouseenter', show);
                    document.addEventListener('mouseover', debounceHide);
                }
            } else if ('click-out' === mode) {
                if (referenceEl instanceof Element) {
                    referenceEl.addEventListener('click', clickMode, true);
                    document.addEventListener('mouseover', debounceHide, true);
                }
            }
        }
    });

    onUnmounted(() => {
        if ('click' === mode) {
            if (referenceEl instanceof Element) {
                document.removeEventListener('click', clickMode, true);
            }
        } else if ('hover' === mode) {
            if (referenceEl instanceof Element) {
                referenceEl.removeEventListener('mouseenter', show);
                document.removeEventListener('mouseover', debounceHide);
            }
        } else if ('click-out' === mode) {
            if (referenceEl instanceof Element) {
                referenceEl.removeEventListener('click', clickMode, true);
                document.removeEventListener('mouseover', debounceHide);
            }
        }

        if (cleanup) {
            cleanup();
        }
    });

    return {
        popperTo
    };
};

export {};
