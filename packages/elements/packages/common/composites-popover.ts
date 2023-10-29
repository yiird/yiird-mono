import {
    arrow as arrowPlugin,
    autoUpdate,
    flip,
    hide,
    limitShift,
    offset as offsetPlugin,
    shift,
    useFloating,
    type Placement as FloatingPlacement,
    type MaybeReadonlyRef
} from '@floating-ui/vue';
import { debounce, isFunction, isObject } from 'lodash-es';
import { computed, isRef, nextTick, ref, unref, watch, watchEffect, type Ref } from 'vue';
import type { PoppoverMode } from '../types/components';
import type { Offset, Placement } from '../types/global';
import { checkPointInOneRect, isElement } from './dom-utils';

export const usePopoverDisplayEvent = (reference: Element, floating: HTMLElement, mode: PoppoverMode, hideThinkOverPop: boolean) => {
    const display = ref(false);
    const _debounceHide = debounce((_event) => {
        if (floating && reference) {
            const { x, y } = _event;
            if (hideThinkOverPop) {
                const rects = [floating.getBoundingClientRect(), reference.getBoundingClientRect()];
                if (checkPointInOneRect({ x, y }, ...rects)) {
                    return;
                }
            } else {
                const rects = [reference.getBoundingClientRect()];
                if (checkPointInOneRect({ x, y }, ...rects)) {
                    return;
                }
            }
            _removeDocumentListener();
            display.value = false;
        }
    }, 100);

    /**
     * @private
     */
    const _checkMousePositionIsOut = (_event: Event) => {
        if (_event instanceof MouseEvent) {
            if (floating && reference) {
                const { x, y } = _event;
                if (hideThinkOverPop) {
                    const rects = [floating.getBoundingClientRect(), reference.getBoundingClientRect()];

                    if (checkPointInOneRect({ x, y }, ...rects)) {
                        return;
                    }
                }
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
    const _toggle = () => {
        display.value = !display.value;
    };

    /**
     * @private
     */
    const _show = () => {
        display.value = true;
        if (isElement(reference)) {
            if ('hover' === mode || 'click-leave' === mode) {
                document.addEventListener('mouseover', _debounceHide);
            } else if ('click-out' === mode) {
                document.addEventListener('click', _debounceHide);
            }
        }
    };
    if ('click' === mode) {
        reference.addEventListener('click', _toggle);
    } else if ('hover' === mode) {
        reference.addEventListener('mouseenter', _show);
    } else if ('click-out' === mode) {
        reference.addEventListener('click', _show);
    } else if ('click-leave' === mode) {
        reference.addEventListener('click', _show);
    } else if ('manual' === mode) {
        // document.addEventListener('click', _checkMousePositionIsOut);
    }

    const removeListener = () => {
        if ('manual' !== mode) {
            reference.removeEventListener('click', _checkMousePositionIsOut);
            reference.removeEventListener('click', _toggle);
            reference.removeEventListener('mouseenter', _show);
            _removeDocumentListener();
        }
    };

    return { display, removeListener };
};

export interface PopoverOptions {
    display: boolean;
    placement: MaybeReadonlyRef<Placement>;
    allowPlacement: Placement[];
    offset: Offset;
    mode: PoppoverMode;
    hideThinkOverPop: boolean;
    arrowSize?: string | number;
}

export const unwrapElement = async <E>(getter: MaybeReadonlyRef<E | null> | (() => MaybeReadonlyRef<E | null>)) => {
    let el = null;
    if (isRef(getter) && getter.value) {
        el = getter;
    } else if (isFunction(getter)) {
        el = getter.call(null);
    }

    if (isRef(el)) {
        await nextTick();
        el = el.value;
    }
    return el;
};

export const popoverOffset = (offset: Offset) => {
    let mainAxis,
        crossAxis = 0;
    if (isObject(offset)) {
        mainAxis = offset.main || 0;
        crossAxis = offset.cross || 0;
    } else {
        mainAxis = offset;
    }
    return {
        mainAxis,
        crossAxis
    };
};

export const usePopover = (referenceGetter: Element | Ref<Element | null>, floatingGetter: HTMLElement | Ref<HTMLElement>, options: PopoverOptions) => {
    const { allowPlacement, display, offset, mode, hideThinkOverPop, placement: defaultPlacement, arrowSize } = options;

    const arrow = ref<HTMLElement>();

    const visibility = ref(display);

    const reference = computed(() => unref(referenceGetter));
    const floating = computed(() => unref(floatingGetter));

    const { floatingStyles, middlewareData, placement, x, y } = useFloating(reference, floating, {
        placement: defaultPlacement as MaybeReadonlyRef<FloatingPlacement>,
        middleware: [
            offsetPlugin(popoverOffset(offset)),
            flip({
                boundary: 'clippingAncestors',
                rootBoundary: 'viewport',
                altBoundary: true,
                fallbackPlacements: allowPlacement as Array<FloatingPlacement>
            }),
            shift({
                boundary: 'clippingAncestors',
                rootBoundary: 'viewport',
                altBoundary: true,
                limiter: limitShift()
            }),
            arrowPlugin({ element: arrow }),
            hide()
        ],
        whileElementsMounted(...args) {
            return autoUpdate(...args, {
                animationFrame: true
            });
        }
    });

    const arrowSide = computed(() => {
        return {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
        }[placement.value.split('-')[0]];
    });

    watchEffect(() => {
        const _x = x.value;
        const _y = y.value;
        const _middlewareData = middlewareData.value;
        const _floatingRef = floating.value;
        const { referenceHidden } = _middlewareData.hide || {};

        if (_floatingRef) {
            Object.assign(_floatingRef.style, {
                x: _x,
                y: _y,
                visibility: !visibility.value || referenceHidden ? 'hidden' : 'visible'
            });
        }
    });

    watch([arrowSide, () => middlewareData.value.arrow], ([_arrowSide, _arrow]) => {
        const _arrowRef = arrow.value;
        const _visibility = visibility.value;
        const { x: arrowX, y: arrowY } = _arrow || {};

        if (!_visibility) return;

        const position = {
            top: arrowY != null ? `${arrowY}px` : '',
            left: arrowX != null ? `${arrowX}px` : '',
            [_arrowSide + '']: '-4px'
        };

        if (_arrowRef) {
            Object.assign(_arrowRef.style, position);
        }
    });

    const { removeListener } = addPopoverEvent(reference, floating, visibility, mode, hideThinkOverPop);

    const clear = () => {
        removeListener();
    };

    return {
        reference,
        floating,
        arrow,
        floatingStyles,
        visibility,
        arrowSide,
        clear
    };
};
const addPopoverEvent = (reference: Ref<Element | null>, floating: Ref<HTMLElement | null>, visibility: Ref<boolean>, mode: PoppoverMode, hideThinkOverPop: boolean) => {
    const _hide = (ev: Event) => {
        const flag = visibility.value;
        const _reference = reference.value;
        const _floating = floating.value;
        if (!_reference || !_floating) return;

        if (flag) {
            let x, y;
            if (ev instanceof MouseEvent) {
                x = ev.x;
                y = ev.y;
            } else if (ev instanceof TouchEvent && ev.touches.length === 1) {
                const touch = ev.touches.item(0);
                if (touch) {
                    x = touch.pageX;
                    y = touch.pageY;
                }
            }

            if (x && y) {
                if (hideThinkOverPop) {
                    const rects = [_floating.getBoundingClientRect(), _reference.getBoundingClientRect()];
                    if (checkPointInOneRect({ x, y }, ...rects)) {
                        return;
                    }
                } else {
                    const rects = [_reference.getBoundingClientRect()];
                    if (checkPointInOneRect({ x, y }, ...rects)) {
                        return;
                    }
                }
            }
            _removeDocumentListener();
            visibility.value = false;
        }
    };

    const _debounceHide = debounce(_hide, 100);

    const _toggle = () => {
        visibility.value = !visibility.value;
    };

    /**
     * @private
     */
    const _show = (ev: Event) => {
        const _reference = reference.value;
        if (_reference) {
            if (isElement(_reference)) {
                if ('hover' === mode || 'click-leave' === mode) {
                    document.addEventListener('mouseover', _debounceHide);
                } else if ('click-out' === mode) {
                    document.addEventListener('click', _hide);
                }
            }
            visibility.value = true;
        }
    };

    /**
     * @private
     */
    const _removeDocumentListener = () => {
        document.removeEventListener('click', _hide);
        document.removeEventListener('click', _debounceHide);
        document.removeEventListener('mouseover', _debounceHide);
    };

    const removeListener = () => {
        const _reference = reference.value;
        if (_reference) {
            if ('manual' !== mode) {
                _reference.removeEventListener('click', _toggle);
                _reference.removeEventListener('mouseenter', _show);
                _removeDocumentListener();
            }
        }
    };

    const stop = watch(reference, (_reference) => {
        if (_reference) {
            if ('click' === mode) {
                _reference.addEventListener('click', _toggle);
            } else if ('hover' === mode) {
                _reference.addEventListener('mouseenter', _show);
            } else if ('click-out' === mode) {
                _reference.addEventListener('click', _show);
            } else if ('click-leave' === mode) {
                _reference.addEventListener('click', _show);
            } else if ('manual' === mode) {
                // document.addEventListener('click', _checkMousePositionIsOut);
            }
            stop();
        }
    });

    return {
        removeListener
    };
};
