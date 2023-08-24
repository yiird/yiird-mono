import { faClose } from '@fortawesome/pro-light-svg-icons';
import { isNumber, isString } from 'lodash-es';
import {
    computed,
    nextTick,
    onMounted,
    reactive,
    ref,
    shallowRef,
    toRef,
    watchEffect,
    type Component,
    type ExtractPropTypes,
    type PropType,
    type Ref,
    type SetupContext,
    type ShallowRef,
    type UnwrapNestedRefs,
    type VNodeRef
} from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToComponentHeight, sizeToFontSize } from '../../config';
import type { IconNameOrDefinition } from '../../types/icon';
import type { InternalSetupContext } from '../../types/prefab';
import type { ScrollOverflowState } from '../../types/scroll';
import type { Size, ThemeConfig } from '../../types/theme';
import type { ScrollType } from '../scroll';

/**
 * 标签对象
 */
export interface TabItem {
    id?: string;
    name: string;
    icon?: IconNameOrDefinition;
    closeable?: boolean;
    page?: string | Component;
}

export const TabsProps = {
    ...BaseProps,
    /**
     * 选项
     */
    items: {
        type: Array as PropType<TabItem[]>,
        default() {
            return [];
        }
    },
    /**
     * 当前激活的选项卡标识，可以是序号（从0开始），也可以是Tab ID
     */
    activeKey: {
        type: [Number, String] as PropType<number | string>,
        default: 0
    },
    /**
     * 禁用选项卡标识，可以是序号（从0开始），也可以是Tab ID
     */
    disabledKeys: {
        type: Array as PropType<Array<string | number>>,
        default() {
            return [];
        }
    },
    /**
     * 是否可关闭
     */
    closeable: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 文本模式
     */
    mode: {
        type: String as PropType<'text' | 'card'>,
        default: 'text'
    },
    /**
     * 间距
     */
    gutter: {
        type: Number as PropType<number>,
        default(rawProps: any) {
            if ('card' === rawProps.mode) {
                return 5;
            } else {
                return 15;
            }
        }
    }
} as const;

export type TabsPropsType = Readonly<ExtractPropTypes<typeof TabsProps>>;

export type InternalTabItem = TabItem & {
    page?: string | ShallowRef<Component>;
    isHtml?: boolean;
    disabled?: boolean;
};

export type TabsConfig = {
    items: Array<InternalTabItem>;
    currentActiveIndex: number;
    disabledIndexes: Array<number>;
};
const findItemIndex = (items: Array<InternalTabItem | TabItem>, key: string | number) => {
    const index = isNumber(key) ? key : items?.findIndex((item) => item.id == key);
    const max = items.length - 1;
    return max < index ? max : -1 === index ? 0 : index;
};

const findItemIndexes = (items: Array<InternalTabItem | TabItem>, ...keys: Array<string | number>) => {
    return keys.map((key) => findItemIndex(items, key)).filter((key) => key != undefined);
};

export interface TabsTheme extends ThemeConfig {
    bemModifiers?: string[];
    barBottomWidth?: string;
    barBottomLeft?: string;
    gutter?: string;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    auxLeftShadow?: string;
    auxRightShadow?: string;
}

const obtainTheme = (ctx: InternalSetupContext<TabsPropsType>, tabsConfig: UnwrapNestedRefs<TabsConfig>, barRefs: Ref<Element[]>, overflowState: Ref<ScrollOverflowState>) => {
    const themeConfig = useTheme();
    const isMounted = ref(false);

    const { props } = ctx;

    onMounted(() => {
        isMounted.value = true;
    });

    return computed<TabsTheme>(() => {
        const _themeConfig = themeConfig.value;

        const height = sizeToComponentHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: TabsTheme = {
            ..._themeConfig,
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`,
            gutter: props.gutter + 'px'
        };

        if (barRefs.value) {
            if (isMounted.value && props.mode === 'text') {
                const barEls = Object.values(barRefs.value).filter((bar) => !!bar);
                //计算底部滑块尺寸和左侧距离
                if (barEls.length > 0) {
                    let barBottomLeft = 0;
                    barEls.every((el) => {
                        const _el = el as HTMLElement;
                        const isCurrentTabBar = _el.dataset.key === tabsConfig.currentActiveIndex + '';
                        const width = _el.offsetWidth;
                        if (!isCurrentTabBar) {
                            barBottomLeft += (props.gutter || 0) + width;
                            return true;
                        } else {
                            theme.barBottomWidth = width + 'px';
                            return false;
                        }
                    });
                    theme.barBottomLeft = barBottomLeft + 'px';
                }
            }
        }

        theme.bemModifiers = [];

        if (props.mode) {
            theme.bemModifiers.push(`tabs--${props.mode}`);
        }

        if (overflowState.value.x) {
            theme.bemModifiers.push(`tabs--overflow-${overflowState.value.x}`);
        }

        theme.auxLeftShadow = theme.ye_boxshadow('low', 'right');
        theme.auxRightShadow = theme.ye_boxshadow('low', 'left');

        return theme;
    });
};

export const setupTabs = (props: TabsPropsType, ctx: SetupContext) => {
    const commonExposed = usePrefab(props);

    const scroll = ref<ScrollType>();

    const barRefs: VNodeRef = ref({});

    const tabsConfig = reactive<TabsConfig>({
        disabledIndexes: [],
        items: [],
        currentActiveIndex: 0
    });

    watchEffect(() => {
        const rawDisabledIndexes = findItemIndexes(props.items, ...props.disabledKeys);
        const items = props.items.map((item, index) => {
            return {
                ...item,
                id: item.id ? item.id : `${commonExposed.id__}-${index}`,
                name: item.name.trim(),
                closeable: item.closeable,
                page: !item.page ? item.page : isString(item.page) ? item.page : shallowRef(item.page),
                isHtml: isString(item.page),
                disabled: rawDisabledIndexes.includes(index)
            };
        });
        tabsConfig.currentActiveIndex = findItemIndex(items, props.activeKey);
        tabsConfig.items = items;
        tabsConfig.disabledIndexes = rawDisabledIndexes;
    });

    const items = toRef(tabsConfig, 'items');
    const currentActiveIndex = toRef(tabsConfig, 'currentActiveIndex');
    const disabledIndexes = toRef(tabsConfig, 'disabledIndexes');

    const overflowState = ref<ScrollOverflowState>({
        x: 'none',
        y: 'none'
    });

    /**
     * @private
     */
    const doOnScrollOverflow_ = (state: ScrollOverflowState) => {
        overflowState.value = state;
    };

    /**
     * @private
     */
    const _findItemIndex = (key: string | number) => {
        return findItemIndex(tabsConfig.items, key);
    };

    /**
     * @private
     * @param key 序号|或Item ID
     */
    const moveTo = (key: number | string) => {
        nextTick(() => {
            const index = _findItemIndex(key);
            const _scroll = scroll.value;
            const activeBar = _scroll?.el.querySelector<HTMLElement>(`[data-key="${index}"]`);
            if (activeBar) {
                const isVisible = _scroll?.isVisible(activeBar);
                if (!isVisible) {
                    _scroll?.scrollIntoView(activeBar, {
                        offsetLeft: 30
                    });
                }
            }
        });
    };

    /**
     * 激活目标选项卡
     *
     * @param {number | string} activeKey - TAB序号或ID
     * @param {boolean} inView - 知否移动到可视区域，默认：true
     */
    const active = (activeKey: number | string, inView: boolean = true) => {
        if (activeKey === -1) {
            tabsConfig.currentActiveIndex = -1;
        } else {
            const index = _findItemIndex(activeKey);
            if (disabledIndexes.value.includes(index)) return;
            tabsConfig.currentActiveIndex = index;
            if (inView) moveTo(index);
        }
    };

    /**
     * @private
     */
    const _findNearAvaliableIndex = (index: number, asc: boolean = true) => {
        let target = index;
        if (tabsConfig.items.length === disabledIndexes.value.length) {
            target = -1;
        } else if (target >= tabsConfig.items.length) {
            target = _findNearAvaliableIndex(asc ? target + 1 : target - 1, false);
        } else if (target < 0) {
            target = _findNearAvaliableIndex(asc ? target + 1 : target - 1, true);
        } else if (disabledIndexes.value.includes(target)) {
            target = _findNearAvaliableIndex(asc ? target + 1 : target - 1, asc);
        }
        return target;
    };

    /**
     * 关闭指定Tab
     * @param key 目标序号或者ID
     */
    const close = (key: number | string) => {
        const index = _findItemIndex(key);
        tabsConfig.items.splice(index, 1);
        disabledIndexes.value.forEach((_index, i) => {
            if (_index > index) {
                disabledIndexes.value[i] -= 1;
            }
        });
        let activeIndex = tabsConfig.currentActiveIndex;

        if (index < tabsConfig.currentActiveIndex) {
            activeIndex = _findNearAvaliableIndex(tabsConfig.currentActiveIndex);
        } else if (index === tabsConfig.currentActiveIndex) {
            activeIndex = _findNearAvaliableIndex(index);
        }
        active(activeIndex);
    };

    const theme = obtainTheme({ props, commonExposed, ...ctx }, tabsConfig, barRefs, overflowState);

    onMounted(() => {
        const activeIndex = _findNearAvaliableIndex(_findItemIndex(props.activeKey));
        active(activeIndex, true);
    });

    return {
        ...commonExposed,
        theme,
        scroll,
        tabs: items,
        barRefs,
        currentActiveIndex,
        disabledIndexes,
        faClose,
        doOnScrollOverflow_,
        moveTo,
        active,
        close
    };
};

export const TabsExpose = [...baseExpose, ...(['active', 'close', 'moveTo'] as const)];
export type TabsExposeType = (typeof TabsExpose)[number];
