import type Color from 'color';
import { startsWith } from 'lodash-es';
import { computed, h, unref, type CSSProperties, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, stateColor, textStateColor } from '../../config';
import type { ListEventArgs } from '../../types/event';
import type { Align, StateColor } from '../../types/global';
import type { IconNameOrDefinition } from '../../types/icon';
import type { InternalSetupContext } from '../../types/prefab';
import type { Size, ThemeConfig } from '../../types/theme';
import { Divider } from '../divider';
import { IconText } from '../icon/text';
import { Space } from '../space';

export type ListLayout = 'v' | 'v-reverse' | 'h' | 'h-reverse';

/**
 * 操作配置
 */
export interface ListAction {
    /**
     * 图标
     */
    icon?: IconNameOrDefinition;
    /**
     * 描述
     */
    text?: string;
    /**
     * 尺寸
     */
    size?: Size;
    /**
     * 操作
     * @param args 参数
     * @returns
     */
    opperator?: (...args: any[]) => any;
}

export const ListProps = {
    ...BaseProps,
    /**
     * 数据源
     */
    source: {
        type: Array as PropType<object[] | string[]>,
        default() {
            return [];
        }
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 列表项样式
     */
    itemStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    /**
     * 操作集合
     */
    actions: {
        type: Array as PropType<ListAction[]>
    },
    /**
     * 整体排列方向
     */
    layout: {
        type: String as PropType<ListLayout>,
        default: 'v'
    },
    /**
     * 内容区域排列方向
     */
    contentLayout: {
        type: String as PropType<ListLayout>,
        default(props: any) {
            if (startsWith(props.layout, 'v')) {
                return 'v';
            } else {
                return 'h';
            }
        }
    },
    /**
     * 垂直于内容排列方向上的对齐方式
     */
    extraAlign: {
        type: String as PropType<Align>,
        default: 'center'
    },
    /**
     * 垂直于整体排列方向上的对齐方式
     */
    actionsAlign: {
        type: String as PropType<Align>,
        default: 'center'
    },
    /**
     * actions 间距
     */
    actionsGap: {
        type: Number,
        default: 10
    },
    /**
     * actions样式
     */
    actionStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    /**
     * 反转actions图标文本
     */
    actionsReverse: {
        type: Boolean
    },
    /**
     * hover时背景色
     */
    hoverColor: {
        type: [String, Object] as PropType<string | StateColor>
    }
} as const;

export type ListPropsType = Readonly<ExtractPropTypes<typeof ListProps>>;

export interface ListTheme extends ThemeConfig {
    bemModifiers?: string[];
    gap: string;
    fontSize: string;
    hoverColor?: Color | string;
    hoverTextColor?: Color | string;
    extraAlign: string;
    actionsAlign: string;
}

export const ListEmits = {
    /**
     * 选项点击事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select(args: ListEventArgs<any>) {
        return true;
    }
};

const obtainTheme = (ctx: InternalSetupContext<ListPropsType, typeof ListEmits>) => {
    const { props, commonExposed } = ctx;
    const { cType__ } = commonExposed;

    const themeConfig = useTheme();
    return computed<ListTheme>(() => {
        const _themeConfig = themeConfig.value;

        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: ListTheme = {
            ..._themeConfig,
            fontSize: `${fontSize}px`,
            gap: `${fontSize}px`,
            actionsAlign: props.actionsAlign,
            extraAlign: props.extraAlign,
            hoverColor: props.hoverColor ? stateColor(_themeConfig, props.hoverColor).primary : '',
            hoverTextColor: props.hoverColor ? textStateColor(_themeConfig, props.hoverColor) : ''
        };

        theme.bemModifiers = [`${cType__}--${props.layout}`, `${cType__}--content-${props.contentLayout}`];

        return theme;
    });
};

export const setupList = (props: ListPropsType, ctx: SetupContext<typeof ListEmits>) => {
    const { slots, emit } = ctx;
    const commonExposed = usePrefab(props);
    const { el } = commonExposed;
    const theme = obtainTheme({ props, commonExposed, ...ctx });

    const obtainHasExtra = computed(() => {
        return !!slots.extra;
    });
    const obtainHasContent = computed(() => {
        return !!slots.content;
    });
    const obtainHasActions = computed(() => {
        return !!props.actions;
    });

    const obtainActions = computed(() => {
        const actions = props.actions?.filter((action) => action.icon || action.text) || [];
        return h(
            Space,
            {
                gap: props.actionsGap
            },
            () =>
                actions.map((action, a_index) => {
                    const ass = [
                        h(IconText, {
                            onClick: action.opperator,
                            revert: props.actionsReverse,
                            size: props.size,
                            icon: action.icon,
                            text: action.text
                        })
                    ];
                    if (actions.length - 1 !== a_index) {
                        ass.push(h(Divider, { direction: 'v', margin: 0 }));
                    }

                    return ass;
                })
        );
    });

    /**
     * @private
     */
    const doItemClick_ = (ev: Event, args: any) => {
        /**
         * 选项点击事件
         * @param {ListEventArgs} args 谁是谁
         */
        emit('select', {
            el: unref(el),
            value: args
        });
    };

    return {
        ...commonExposed,
        theme,
        obtainActions,
        obtainHasExtra,
        obtainHasContent,
        obtainHasActions,
        doItemClick_
    };
};

export const ListExpose = [...baseExpose, ...([] as const)];
export type ListExposeType = (typeof ListExpose)[number];
