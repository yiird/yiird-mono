import type Color from 'color';
import { isObject as _isObject, isArray, isFunction } from 'lodash-es';
import { computed, isVNode, type ExtractPropTypes, type PropType, type SetupContext, type VNode } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight } from '../../config';
import type { InternalSetupContext, LabelValue, Size, ThemeConfig } from '../../types/global';
import { Icon, type IconNameOrDefinition } from '../icon';

const isLabelValue__ = (arg: any): arg is LabelValue => {
    return arg.label && arg.value;
};

export interface ListItemEventArg {
    ev: Event;
    data: ListItem | LabelValue;
}

/**
 * 列表项
 */
export interface ListItem {
    /**
     * 头像
     */
    avatarIcon?: IconNameOrDefinition;
    /**
     * 头像
     */
    avatarSrc?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 概述
     */
    summary?: string;
    others?: Array<LabelValue>;
}

export type RenderItem = (ListItem | LabelValue) & {
    operators?: VNode;
};

export interface ListOperatorObject {
    icon?: IconNameOrDefinition;
    text?: string;
    size?: Size;
    action?: () => void;
}

export type ListOperatorFunction = (data: any) => ListOperatorObject[] | VNode;

export type ListLayout = 'h' | 'v';

export const ListProps = {
    ...BaseProps,
    /**
     * 列表项
     */
    items: {
        type: Array as PropType<ListItem[] | LabelValue[]>,
        default() {
            return [];
        }
    },

    /**
     * 操作项
     */
    operators: {
        type: [Array, Function] as PropType<ListOperatorObject[] | ListOperatorFunction>
    },
    /**
     * 布局
     * `h`: 横向
     * `v`: 纵向
     */
    layout: {
        type: String as PropType<'h' | 'v'>,
        default: 'h'
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 间距
     */
    gutter: {
        type: Number as PropType<number>,
        default: 20
    },
    hoverColor: {
        type: String as PropType<string | Color>,
        default: 'transparent'
    }
} as const;
export type ListPropsType = Readonly<ExtractPropTypes<typeof ListProps>>;

export interface ListTheme extends ThemeConfig {
    bemModifiers?: string[];
    height: string;
    fontSize: string;
    gutter: string;
    hoverColor: Color | string;
}

export const ListEmits = {
    /**
     * 选项点击事件
     */
    itemClick: null
};

const obtainTheme = (ctx: InternalSetupContext<ListPropsType, typeof ListEmits>) => {
    const { props } = ctx;

    const themeConfig = useTheme();
    return computed<ListTheme>(() => {
        const _themeConfig = themeConfig.value;

        const height = sizeToHeight(_themeConfig, props.size);
        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: ListTheme = {
            ..._themeConfig,
            height: `${height}px`,
            fontSize: `${fontSize}px`,
            gutter: `${props.gutter}px`,
            hoverColor: props.hoverColor || _themeConfig.ye_colorBg
        };

        theme.bemModifiers = [];

        return theme;
    });
};

const renderOperator = (data: any, operator: ListOperatorObject) => {
    return (
        <>
            {operator.icon ? (
                <Icon
                    size={operator.size}
                    name={operator.icon}></Icon>
            ) : undefined}
            <span>{operator.text}</span>
            &nbsp;&nbsp;
        </>
    );
};

const renderOperators = (data: any, operators: ListOperatorObject[] | ListOperatorFunction) => {
    if (isFunction(operators)) {
        const _operators = operators(data);
        if (isVNode(_operators)) {
            return _operators;
        } else if (isArray(_operators)) {
            return (
                <>
                    {_operators.map((operator) => {
                        return renderOperator(data, operator);
                    })}
                </>
            );
        }
    } else if (isArray(operators)) {
        return (
            <>
                {operators.map((operator) => {
                    return renderOperator(data, operator);
                })}
            </>
        );
    }
};

export const setupList = (props: ListPropsType, ctx: SetupContext<typeof ListEmits>) => {
    const { slots, emit } = ctx;
    const prefab = usePrefab(props);
    const theme = obtainTheme({ props, prefab, ...ctx });

    const obtainHasLeft = computed(() => {
        return !!slots.left;
    });
    const obtainHasRight = computed(() => {
        return !!slots.right;
    });
    const obtainHasOperators = computed(() => {
        return !!slots.operators || props.operators;
    });

    const obtainItems = computed<RenderItem[]>(() => {
        const items = props.items;

        return items.map((item) => {
            if (isLabelValue__(item)) {
                return item;
            } else {
                const _item: RenderItem = { ...item };
                if (props.operators) {
                    _item.operators = renderOperators(item, props.operators);
                }
                return _item;
            }
        });
    });

    const isObject__ = _isObject;

    /**
     * @private
     */
    const doItemClick__ = (ev: Event, args: LabelValue | ListItem) => {
        /**
         * 选项点击事件
         * @param {ListItemEventArg} args 谁是谁
         */
        emit('itemClick', {
            ev,
            data: args
        });
    };

    return {
        ...prefab,
        theme,
        obtainItems,
        obtainHasLeft,
        obtainHasRight,
        obtainHasOperators,
        isObject__,
        isLabelValue__,
        doItemClick__
    };
};
export const ListExpose = [...baseExpose];
