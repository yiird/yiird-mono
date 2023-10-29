import { arrow as arrowPlugin, autoUpdate, computePosition, flip, hide, limitShift, offset as offsetPlugin, shift, type Placement as FloatingPlacement } from '@floating-ui/vue';

import { toRef, watch, type ComponentPublicInstance, type Directive, type UnwrapNestedRefs } from 'vue';
import { isLimitDimensions } from '../common/check-type';
import { popoverOffset, usePopoverDisplayEvent } from '../common/composites-popover';
import { toStyleValue } from '../common/dom-utils';
import { injectInDirective } from '../common/vnode-utils';
import type { PopoverPropsType } from '../components/popover';
import '../components/theme/scss/_tooltip.scss';
import { OPTIONS_KEY } from '../config';
import type { PlatformOptions } from '../types/global';

type TooltipOptions = Partial<Omit<PopoverPropsType, 'id' | 'reference' | 'arrowSize' | 'boundary'>>;

const TOOLTIP_EVENT_CALLBACKS = new Map<string, Function>();

const createTooltipElement = (id: string) => {
    const tooltip = document.createElement('div');
    tooltip.id = id;
    tooltip.classList.add('tooltip');

    const arrow = document.createElement('div');
    arrow.classList.add('arrow');

    tooltip.append(arrow);
    document.body.append(tooltip);
    return {
        tooltip,
        arrow
    };
};

const styleTooltip = (instance: ComponentPublicInstance, options: TooltipOptions, el: HTMLElement) => {
    const { text, padding, color, textColor, width, height, shadowLevel = 'low', shadowDirection = 'down' } = options;
    const tooltip = document.getElementById(`${el.id}-tooltip`);

    if (tooltip) {
        if (text) {
            const globalOptions = injectInDirective<UnwrapNestedRefs<PlatformOptions>>(instance, OPTIONS_KEY as symbol);

            const themeConfig = toRef(globalOptions, 'themeConfig');
            const arrow = tooltip.querySelector<HTMLElement>('.arrow');
            tooltip.setAttribute('data-text', text);
            tooltip.style.padding = `${padding}px`;
            tooltip.style.color = `${textColor}`;
            tooltip.style.backgroundColor = `${color}`;

            tooltip.style.minWidth = isLimitDimensions(width) ? toStyleValue(width.min, 'unset') : toStyleValue(width, 'unset');
            tooltip.style.maxWidth = isLimitDimensions(width) ? toStyleValue(width.max, 'unset') : toStyleValue(width, 'unset');
            tooltip.style.minHeight = isLimitDimensions(height) ? toStyleValue(height.min, 'unset') : toStyleValue(height, 'unset');
            tooltip.style.maxHeight = isLimitDimensions(height) ? toStyleValue(height.max, 'unset') : toStyleValue(height, 'unset');

            tooltip.style.boxShadow = themeConfig.value.ye_boxshadow(shadowLevel, shadowDirection);
            if (arrow) {
                arrow.style.backgroundColor = `${color}`;
            }
        } else {
            tooltip.style.visibility = 'hidden';
        }
    }
};

export const Tooltip: Directive<HTMLElement, TooltipOptions> = {
    beforeUpdate(el, binding) {
        console.log('update');
        const { value, instance } = binding;
        if (instance) {
            styleTooltip(instance, value, el);
        }
    },
    mounted(el, binding) {
        const { value: options, instance } = binding;

        if (instance) {
            const { mode = 'hover', hideThinkOverPop = true, display, offset = 5, allowPlacement = ['bottom'] } = options;
            const { tooltip, arrow } = createTooltipElement(`${el.id}-tooltip`);
            const cleanup = autoUpdate(
                el,
                tooltip,
                () => {
                    computePosition(el, tooltip, {
                        placement: 'top',
                        middleware: [
                            offsetPlugin(popoverOffset(offset)),
                            flip({
                                boundary: 'clippingAncestors',
                                rootBoundary: 'viewport',
                                altBoundary: false,
                                fallbackPlacements: allowPlacement as Array<FloatingPlacement>
                            }),
                            shift({
                                boundary: 'clippingAncestors',
                                rootBoundary: 'viewport',
                                altBoundary: false,
                                limiter: limitShift()
                            }),
                            arrowPlugin({ element: arrow }),
                            hide()
                        ]
                    }).then(({ x, y, placement, middlewareData }) => {
                        const side = {
                            top: 'bottom',
                            right: 'left',
                            bottom: 'top',
                            left: 'right'
                        }[placement.split('-')[0]];
                        const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
                        const position = {
                            top: arrowY != null ? `${arrowY}px` : '',
                            right: '',
                            bottom: '',
                            left: arrowX != null ? `${arrowX}px` : '',
                            [side + '']: '-4px'
                        };
                        Object.assign(tooltip.style, {
                            left: `${x}px`,
                            top: `${y}px`
                        });
                        if (arrow) {
                            Object.assign(arrow.style, position);
                        }
                    });
                },
                {
                    animationFrame: true
                }
            );

            tooltip.style.visibility = display ? 'visible' : 'hidden';

            styleTooltip(instance, options, el);

            if (mode !== 'manual') {
                const { display: __display, removeListener } = usePopoverDisplayEvent(el, tooltip, mode, hideThinkOverPop);
                TOOLTIP_EVENT_CALLBACKS.set(`${el.id}_removeListener`, removeListener);
                watch(__display, (flag) => {
                    tooltip.style.visibility = flag ? 'visible' : 'hidden';
                });
            }

            TOOLTIP_EVENT_CALLBACKS.set(`${el.id}_cleanup`, cleanup);
        }
    },
    unmounted(el) {
        document.getElementById(`${el.id}-tooltip`)?.remove();

        const removeListener = TOOLTIP_EVENT_CALLBACKS.get(`${el.id}_removeListener`);
        if (removeListener) {
            removeListener();
            TOOLTIP_EVENT_CALLBACKS.delete(`${el.id}_removeListener`);
        }
        const cleanup = TOOLTIP_EVENT_CALLBACKS.get(`${el.id}_cleanup`);

        if (cleanup) {
            cleanup();
        }
    }
};
