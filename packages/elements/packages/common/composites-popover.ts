import { debounce } from 'lodash-es';
import { ref } from 'vue';
import type { PoppoverMode } from '../types/popover';
import { checkPointInOneRect, isElement } from './dom-utils';

export const usePopoverDisplayEvent = (reference: HTMLElement, floating: HTMLElement, mode: PoppoverMode, hideThinkOverPop: boolean) => {
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
