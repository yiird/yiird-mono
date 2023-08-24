import { isNumber } from 'lodash-es';
import Scrollbar from 'smooth-scrollbar';
import { computed, nextTick, onMounted, onScopeDispose, ref, watch, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import type { InternalSetupContext } from '../../types/prefab';
import type { ScrollOptions, ScrollState, VScrollBoundary, VScrollPluginOptions } from '../../types/scroll';
import type { ThemeConfig } from '../../types/theme';

export const VscrollProps = {
    ...BaseProps,
    /**
     * 数据
     */
    source: {
        type: Array as PropType<any[]>,
        required: true
    },
    /**
     * 行高
     */
    rowHeight: {
        type: Number,
        required: true
    },
    /**
     * 预先渲染的屏数
     */
    prepareScreenCount: {
        type: Number,
        default: 3
    },
    /**
     * 虚拟滚动触发数量，小于此数量，使用正常滚动
     */
    triggerCount: {
        type: Number,
        required: true
    },
    /**
     * 高度
     */
    height: {
        type: [Number, String] as PropType<number | string>,
        default: '100%'
    },
    /**
     * 保持滚动条轨道始终可见。
     */
    alwaysShowTracks: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 设置为 true 时，允许外滚动条在当前滚动条到达边缘时继续滚动。
     */
    continuousScrolling: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const;
export type VscrollPropsType = Readonly<ExtractPropTypes<typeof VscrollProps>>;

export interface VscrollTheme extends ThemeConfig {
    bemModifiers?: string[];
    height: string;
}

export const VscrollEmits = {
    /**
     * 虚拟滚动状态改变事件
     * @param {boolean} flag `true` 虚拟滚动状态
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    virtualChange: (flag: boolean) => {
        return true;
    },
    beforeRender() {
        return true;
    },
    rendered() {
        return true;
    }
};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<VscrollPropsType, E>) => {
    const themeConfig = useTheme();
    const { props } = ctx;

    return computed<VscrollTheme>(() => {
        const _themeConfig = themeConfig.value;

        const { height } = props;

        const theme: VscrollTheme = {
            ..._themeConfig,
            height: isNumber(height) ? `${height}px` : height
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupVscroll = (props: VscrollPropsType, ctx: SetupContext<typeof VscrollEmits>) => {
    const { emit } = ctx;
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof VscrollEmits>({ props, commonExposed, ...ctx });
    const { prepareScreenCount, alwaysShowTracks, continuousScrolling } = props;

    const container = ref();

    const scrollState = ref<ScrollState>('init');

    const obtainTriggerCount = computed(() => props.triggerCount);
    const obtainTotalCount = computed(() => props.source.length);

    const isVirtual = computed(() => {
        return obtainTotalCount.value > obtainTriggerCount.value;
    });

    watch(
        isVirtual,
        (_isVirtual) => {
            emit('virtualChange', _isVirtual);
        },
        {
            immediate: true
        }
    );

    const obtainRowHeight = computed(() => props.rowHeight);

    const boundary = ref<VScrollBoundary>({ start: 0, end: 0 });

    const obtainSource = computed(() => {
        const { start, end } = boundary.value;
        return end
            ? props.source.map((it, index) => {
                  return {
                      inView: start <= index && end > index,
                      it,
                      index
                  };
              })
            : [];
    });

    let scroll: Scrollbar;

    onMounted(() => {
        const virtual: VScrollPluginOptions = {
            boundary,
            prepareScreenCount,
            rowHeight: obtainRowHeight,
            triggerCount: obtainTriggerCount,
            total: obtainTotalCount,
            callback(state: ScrollState) {
                scrollState.value = state;
            }
        };
        const options: ScrollOptions = {
            continuousScrolling,
            alwaysShowTracks,
            plugins: {
                virtual,
                overscroll: {},
                lifecircle: false,
                disableTrack: false,
                trackAux: false,
                hideTrack: false
            }
        };

        scroll = Scrollbar.init(container.value, options);
        if (isVirtual.value) {
            nextTick(() => {
                emit('rendered');
            });
        }
    });

    watch(
        scrollState,
        (state, prev_state) => {
            if ((prev_state === 'init' || prev_state === 'reset') && state === 'none') {
                emit('rendered');
            } else if (state === 'init' || state === 'reset') {
                emit('beforeRender');
            }
        },
        {
            immediate: true
        }
    );

    onScopeDispose(() => {
        scroll?.destroy();
    });

    return {
        ...commonExposed,
        theme,
        container,
        obtainSource,
        boundary
    };
};
export const VscrollExpose = [...baseExpose, ...([] as const)];
export type VscrollExposeType = (typeof VscrollExpose)[number];
