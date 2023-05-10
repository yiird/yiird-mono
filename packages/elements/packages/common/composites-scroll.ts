import Scrollbar from 'smooth-scrollbar';
import type { ScrollbarOptions, ScrollStatus } from 'smooth-scrollbar/interfaces';
import { onBeforeUnmount, onMounted, reactive, type Ref } from 'vue';
import {
    AuxElPlugin,
    DisableScrollBarPlugin,
    HideTrackPlugin,
    LifecirclePlugin,
    type AuxElPluginOptions,
    type DisableScrollBarPluginOptions,
    type HideTrackPluginOptions,
    type LifecirclePluginOptions
} from './scrollbar-plugin';

Scrollbar.use(LifecirclePlugin, HideTrackPlugin, AuxElPlugin, DisableScrollBarPlugin);
/**
 * none 无溢出状态
 * left 左侧溢出状态
 * right 右侧溢出状态
 * both 两侧溢出溢出状态
 */
export type HorizontalOutBoundsState = 'none' | 'left' | 'right' | 'both';
export type VerticalOutBoundsState = 'none' | 'top' | 'bottom' | 'both';

export interface ScrollOptions extends Partial<ScrollbarOptions> {
    plugins?: {
        auxEl?: AuxElPluginOptions;
        hideTrack?: HideTrackPluginOptions;
        lifecircle?: LifecirclePluginOptions;
        disableScrollBar?: DisableScrollBarPluginOptions;
    };
}

export interface Scroll {
    scrollbar?: Scrollbar;
    overflowState: {
        x: HorizontalOutBoundsState;
        y: VerticalOutBoundsState;
    };
}

export const useScroll = (container: Ref<HTMLElement | undefined>, options?: ScrollOptions) => {
    const scroll = reactive<Scroll>({
        overflowState: {
            x: 'none',
            y: 'none'
        }
    });
    //溢出监听
    const overflowListener = ({ offset, limit }: ScrollStatus) => {
        const containerEl = scroll.scrollbar?.containerEl;
        if (containerEl && limit.x > 0) {
            //水平方向溢出状态
            if (offset.x === 0) {
                scroll.overflowState.x = 'right';
            } else if (offset.x === limit.x) {
                scroll.overflowState.x = 'left';
            } else {
                scroll.overflowState.x = 'both';
            }
            //垂直向溢出状态
            if (offset.y === 0) {
                scroll.overflowState.y = 'bottom';
            } else if (offset.y === limit.y) {
                scroll.overflowState.y = 'top';
            } else {
                scroll.overflowState.y = 'both';
            }
        }
    };
    onMounted(() => {
        if (container.value) {
            scroll.scrollbar = Scrollbar.init(container.value, options);
            scroll.scrollbar.addListener(overflowListener);
        }
    });

    onBeforeUnmount(() => {
        if (scroll.scrollbar) {
            scroll.scrollbar.removeListener(overflowListener);
            scroll.scrollbar.destroy();
        }
    });
    return scroll;
};
