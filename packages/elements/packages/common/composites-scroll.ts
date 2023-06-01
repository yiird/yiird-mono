import { merge } from 'lodash-es';
import Scrollbar from 'smooth-scrollbar';
import type { ScrollStatus } from 'smooth-scrollbar/interfaces';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { onBeforeUnmount, onMounted, reactive, type Ref } from 'vue';
import type { Scroll, ScrollOptions } from '../types/scroll';
import { AuxElPlugin, DisableScrollBarPlugin, HideTrackPlugin, LifecirclePlugin, VirtualPagePlugin } from './scrollbar-plugin';
Scrollbar.use(LifecirclePlugin, HideTrackPlugin, AuxElPlugin, DisableScrollBarPlugin, VirtualPagePlugin, OverscrollPlugin);

export const useScroll = (container: Ref<HTMLElement | undefined>, options?: ScrollOptions) => {
    if (options) {
        options = merge(
            {
                plugins: {
                    // 过屏效果,禁用此效果 overscroll:false 默认为false
                    overscroll: {
                        // iOS风格的“bounce”效果，Android风格的“glow”效果
                        effect: 'bounce',
                        // onScroll: undefined,
                        // 动量衰减阻尼因子，介于（0，1）之间的浮点值。值越低，滚动越平滑（绘制帧也越多）。
                        damping: 0.1,
                        // 允许的最大过屏距离。
                        maxOverscroll: 100,
                        // glow 效果时 过屏遮罩的演示
                        glowColor: 'red'
                    },

                    virtualPage: false
                }
            },
            options
        );
    }

    const scroll: Scroll = reactive({
        overflowState: { x: 'none', y: 'none' },
        setOptions(_options?: ScrollOptions) {
            options = merge(options, _options);
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
            console.log('iii 2');
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
