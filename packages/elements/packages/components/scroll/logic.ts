import { isNumber } from 'lodash-es';
import Scrollbar from 'smooth-scrollbar';
import type { ScrollIntoViewOptions, ScrollListener, ScrollbarSize, SetPositionOptions } from 'smooth-scrollbar/interfaces';
import { computed, onMounted, onScopeDispose, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import type { ScrollDisableTrackPluginOptions, ScrollHideTrackPluginOptions, ScrollOptions, ScrollOverflowState, ScrollTrackAuxPluginOptions } from '../../types/components';
import type { ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

export const ScrollProps = {
    ...BaseProps,
    width: {
        type: [Number, String] as PropType<number | string>,
        default: '100%'
    },
    height: {
        type: [Number, String] as PropType<number | string>,
        default: '100%'
    },
    hideTrack: {
        type: Object as PropType<ScrollHideTrackPluginOptions>
    },
    disableTrack: {
        type: Object as PropType<ScrollDisableTrackPluginOptions>
    },
    trackAux: {
        type: Object as PropType<ScrollTrackAuxPluginOptions>
    }
} as const;
export type ScrollPropsType = Readonly<ExtractPropTypes<typeof ScrollProps>>;

export interface ScrollTheme extends ThemeConfig {
    bemModifiers?: string[];
    width: string;
    height: string;
}

export const ScrollEmits = {
    /**
     * 滚动条溢出事件
     *
     * @param state 溢出状态
     */
    overflow(state: ScrollOverflowState) {
        return true;
    }
};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<ScrollPropsType, E>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    return computed<ScrollTheme>(() => {
        const _themeConfig = themeConfig.value;
        const { height, width } = props;

        const theme: ScrollTheme = {
            ..._themeConfig,
            height: isNumber(height) ? `${height}px` : height,
            width: isNumber(width) ? `${width}px` : width
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupScroll = (props: ScrollPropsType, ctx: SetupContext<typeof ScrollEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof ScrollEmits>({ props, commonExposed, ...ctx });
    const { el } = commonExposed;
    const { emit } = ctx;
    let scrollbar: Scrollbar;

    /**
     * @private
     */
    const __overflowListener: ScrollListener = ({ offset, limit }) => {
        const containerEl = scrollbar?.containerEl;
        const overflowState: ScrollOverflowState = {
            x: 'none',
            y: 'none'
        };
        if (containerEl && limit.x > 0) {
            //水平方向溢出状态
            if (offset.x === 0) {
                overflowState.x = 'right';
            } else if (offset.x === limit.x) {
                overflowState.x = 'left';
            } else {
                overflowState.x = 'both';
            }
            //垂直向溢出状态
            if (offset.y === 0) {
                overflowState.y = 'bottom';
            } else if (offset.y === limit.y) {
                overflowState.y = 'top';
            } else {
                overflowState.y = 'both';
            }
            emit('overflow', overflowState);
        }
    };

    onMounted(() => {
        const options: ScrollOptions = {
            plugins: {
                overscroll: {},
                lifecircle: false,
                virtual: false,
                trackAux: props.trackAux || false,
                disableTrack: props.disableTrack || false,
                hideTrack: props.hideTrack || false
            }
        };

        scrollbar = Scrollbar.init(el.value, options);
        scrollbar.addListener(__overflowListener);
    });

    onScopeDispose(() => {
        scrollbar.removeListener(__overflowListener);
        scrollbar.destroy();
    });

    /**
     * 目标元素滚动到视野内
     *
     * @param {HTMLElement} el 目标元素
     * @param {Partial<ScrollIntoViewOptions>} options 滚动配置
     */
    const scrollIntoView = (el: HTMLElement, options?: Partial<ScrollIntoViewOptions>) => {
        scrollbar.scrollIntoView(el, options);
    };

    /**
     * 判断元素是否在可视区域内
     * @param {HTMLElement} el 目标元素
     */
    const isVisible = (el: HTMLElement) => {
        return scrollbar.isVisible(el);
    };

    /**
     * 获取尺寸
     *
     */
    const getSize = (): ScrollbarSize => {
        return scrollbar.size;
    };

    const update = () => {
        scrollbar.update();
    };

    const setPosition = (x: number, y: number, options?: SetPositionOptions) => {
        scrollbar.setPosition(x, y, options);
    };

    return {
        ...commonExposed,
        theme,
        scrollIntoView,
        isVisible,
        getSize,
        update,
        setPosition
    };
};
export const ScrollExpose = [...baseExpose, ...(['scrollIntoView', 'isVisible', 'getSize', 'update', 'setPosition'] as const)];
export type ScrollExposeType = (typeof ScrollExpose)[number];
