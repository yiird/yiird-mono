import type { OverscrollOptions } from 'smooth-scrollbar/plugins/overscroll';
import { computed, ref, type ComputedRef, type ExtractPropTypes, type PropType, type SetupContext, type Slots } from 'vue';
import { toStyleValue } from '../../common/dom-utils';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import type { IconNameOrDefinition, ScrollDisableTrackPluginOptions, ScrollLifecirclePluginOptions } from '../../types/components';
import type { ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
import type { ScrollType } from '../scroll';

export interface PlacementOptions {
    /**
     * 横向位置
     */
    placeX?: 'right' | 'left' | 'center';
    /**
     * 纵向位置
     */
    placeY?: 'top' | 'bottom' | 'center';
    /**
     * 横向偏移，优先于`placeX`
     */
    offsetX?: number;
    /**
     * 纵向偏移，优先于`placeY`
     */
    offsetY?: number;
}

/**
 * 操作对象
 */
export interface PanelOperator {
    /**
     * 操作表述，如果没有图标，默认使用文本表现，如果有图标则为操作的提示信息
     */
    text?: string;
    /**
     * 图标
     */
    icon?: IconNameOrDefinition;
    /**
     * 操作动作
     */
    action: () => void;
}

export const PanelProps = {
    ...BaseProps,
    /**
     * 总高度，不设置则为unset
     */
    height: {
        type: [Number, String] as PropType<number | string>,
        default: 'unset'
    },
    /**
     * 最大高度，内容高度小于此高度，则高度自适应
     */
    maxHeight: {
        type: [Number, String] as PropType<number | string>
    },
    /**
     * 总宽度，不设置则为100%
     */
    width: {
        type: [Number, String] as PropType<number | string>,
        default: '100%'
    },
    padding: {
        type: [Number, String] as PropType<number | string>,
        default: '5px'
    },
    /**
     * 头部高度，在有标题或者工具时才生效
     */
    headerHeight: {
        type: [Number, String] as PropType<number | string>,
        default: '50px'
    },
    /**
     * 底部高度，有footer插槽有内容才生效
     */
    footerHeight: {
        type: [Number, String] as PropType<number | string>,
        default: '50px'
    },
    /**
     * 抬头
     */
    title: {
        type: String as PropType<string>
    },
    /**
     * 操作
     */
    operators: {
        type: Array as PropType<Array<PanelOperator>>
    },
    /**
     * 是否有边框
     */
    border: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * 设置为 true 以允许外部滚动条在当前滚动条到达边缘时继续滚动。
     */
    continuousScrolling: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。
     */
    damping: {
        type: Number as PropType<number>,
        default: 0.1
    },
    /**
     * 保持滚动条始终可见
     */
    alwaysShowTracks: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * 删掉滚动条
     */
    removeTrack: {
        type: String as PropType<'none' | 'x' | 'y' | 'both'>,
        default: 'none'
    },
    /**
     * 禁用滚动条
     */
    disabledTrack: {
        type: Object as PropType<ScrollDisableTrackPluginOptions>,
        default() {
            return {
                x: false,
                y: false
            };
        }
    },
    /**
     * 过屏效果
     */
    overscroll: {
        type: Object as PropType<OverscrollOptions>,
        default() {
            return {
                //滚动效果，iOS 风格效果为“弹跳”-`bounce`，Android 风格效果为“发光”-`glow`。
                effect: 'bounce',
                //动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。
                damping: 0.2,
                //最大允许的滚动距离。
                maxOverscroll: 150,
                //用于`glow`效果的颜色
                glowColor: '#87ceeb'
            };
        }
    },
    /**
     * 滚动生命周期
     */
    scrollbarLifecycle: {
        type: Object as PropType<ScrollLifecirclePluginOptions>
    }
} as const;
export type PanelPropsType = Readonly<ExtractPropTypes<typeof PanelProps>>;

export interface PanelTheme extends ThemeConfig {
    bemModifiers?: string[];
    padding: string;
    height: string;
    width: string;
    footerHeight: string;
    headerHeight: string;
}

const headerFooterState = (props: PanelPropsType, slots: Slots) => {
    let flag: 'none' | 'both' | 'header' | 'footer' = 'none';
    if (!slots.header && !props.title && slots.footer) {
        flag = 'footer';
    } else if (!slots.footer && (slots.header || props.title)) {
        flag = 'header';
    } else if ((slots.header || props.title) && slots.footer) {
        flag = 'both';
    }
    return flag;
};

export const PanelEmits = {};

const obtainTheme = (ctx: InternalSetupContext<PanelPropsType>, headerFooterState: ComputedRef) => {
    const themeConfig = useTheme();
    const { props, slots } = ctx;
    return computed<PanelTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: PanelTheme = {
            ..._themeConfig,
            padding: toStyleValue(props.padding),
            height: toStyleValue(props.height),
            width: toStyleValue(props.width),
            headerHeight: toStyleValue(props.headerHeight),
            footerHeight: toStyleValue(props.footerHeight)
        };

        theme.bemModifiers = [];

        const _headerFooterState = headerFooterState.value;
        if ('header' === _headerFooterState) {
            theme.bemModifiers.push('panel--no-footer');
        }
        if ('footer' === _headerFooterState) {
            theme.bemModifiers.push('panel--no-header');
        }
        if ('none' === _headerFooterState) {
            theme.bemModifiers.push('panel--no-header-footer');
        }

        if (!props.border) {
            theme.bemModifiers.push('panel--no-border');
        }

        if (!props.padding) {
            theme.bemModifiers.push('panel--no-padding');
        }

        return theme;
    });
};

export const setupPanel = (props: PanelPropsType, ctx: SetupContext<typeof PanelEmits>) => {
    const commonExposed = usePrefab(props);
    const obtainHeaderFooterState = computed(() => headerFooterState(props, ctx.slots));
    const obtainHasHeader = computed(() => 'both' === obtainHeaderFooterState.value || 'header' === obtainHeaderFooterState.value);
    const obtainHasFooter = computed(() => 'both' === obtainHeaderFooterState.value || 'footer' === obtainHeaderFooterState.value);

    const scroll = ref<ScrollType>();

    const obtainOperators = computed(() => props.operators);

    const theme = obtainTheme({ props, commonExposed, ...ctx }, obtainHeaderFooterState);

    /**
     * 将目标dom节点移动到可视区域
     *
     * @param {HTMLElement} targetEl 目标元素
     * @param {PlacementOptions} options 位置配置
     */
    const scrollIntoView = async (targetEl: HTMLElement, options?: PlacementOptions) => {
        const _scroll = scroll.value;
        if (_scroll) {
            const defaultOptions: PlacementOptions = {
                placeX: 'center',
                placeY: 'center'
            };

            const _options = Object.assign(defaultOptions, options);

            const { width, height } = targetEl.getBoundingClientRect();
            const { width: containerWidth, height: containerHeight } = _scroll.getSize().container || { width: 0, height: 0 };

            let offsetLeft = (containerWidth - width) / 2;
            let offsetTop = (containerHeight - height) / 2;
            if (_options.offsetX) {
                offsetLeft = _options.offsetX;
            } else if ('left' === _options.placeX) {
                offsetLeft = 0;
            } else if ('right' === _options.placeX) {
                offsetLeft = containerWidth - width;
            }

            if (_options.offsetY) {
                offsetTop = _options.offsetY;
            } else if ('top' === _options.placeY) {
                offsetTop = 0;
            } else if ('bottom' === _options.placeY) {
                offsetTop = containerHeight - height;
            }

            _scroll.update();
            _scroll.scrollIntoView(targetEl, {
                alignToTop: true,
                onlyScrollIfNeeded: false,
                offsetTop: offsetTop,
                offsetLeft: offsetLeft
            });
        }
    };

    return {
        ...commonExposed,
        scroll,
        theme,
        obtainOperators,
        obtainHasHeader,
        obtainHasFooter,
        scrollIntoView
    };
};

export const PanelExpose = [...baseExpose, ...(['scrollIntoView'] as const)];
export type PanelExposeType = (typeof PanelExpose)[number];
