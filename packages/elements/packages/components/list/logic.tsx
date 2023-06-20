import { computed, type CSSProperties, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize } from '../../config';
import type { Align, InternalSetupContext, LabelValue, Position, Size, ThemeConfig } from '../../types/global';
import { Divider } from '../divider';
import type { IconNameOrDefinition } from '../icon';
import { IconText } from '../icon/text';
import { Space } from '../space';

export type ListLayout = 'h' | 'v';

export interface ListAction {
    icon?: IconNameOrDefinition;
    text?: string;
    size?: Size;
    opperator?: (...args: any[]) => any;
}

export const ListProps = {
    ...BaseProps,
    /**
     * 数据源
     */
    source: {
        type: Array as PropType<Array<object | string>>,
        default() {
            return [];
        }
    },
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    itemStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    /**
     * 操作
     */
    actions: {
        type: Array as PropType<ListAction[]>
    },
    actionsPosition: {
        type: String as PropType<Position>,
        default: 'bottom'
    },
    actionsAlign: {
        type: String as PropType<Align>,
        default: 'center'
    },
    actionsGap: {
        type: Number,
        default: 5
    },
    actionStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    actionsReverse: {
        type: Boolean
    },
    extraStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    extraPosition: {
        type: String as PropType<Position>,
        default: 'right'
    },
    extraAlign: {
        type: String as PropType<Align>,
        default: 'center'
    },
    hoverColor: {
        type: String
    }
} as const;

export type ListPropsType = Readonly<ExtractPropTypes<typeof ListProps>>;

export interface ListTheme extends ThemeConfig {
    bemModifiers?: string[];
    gap: string;
    fontSize: string;
    hoverColor?: string;
    itemDirection: string;
    contentDirection: string;
    contentJustifyContent: string;
    actionsAlign: string;
    extraAlign: string;
}

export const ListEmits = {
    /**
     * 选项点击事件
     */
    itemClick: null
};

const obtainTheme = (ctx: InternalSetupContext<ListPropsType, typeof ListEmits>) => {
    const { props, commonExposed } = ctx;

    const themeConfig = useTheme();
    return computed<ListTheme>(() => {
        const _themeConfig = themeConfig.value;

        const fontSize = sizeToFontSize(_themeConfig, props.size);

        let itemDirection = '';
        switch (props.actionsPosition) {
            case 'top':
                itemDirection = 'column-reverse';
                break;
            case 'bottom':
                itemDirection = 'column';
                break;
            case 'left':
                itemDirection = 'row-reverse';
                break;
            case 'right':
                itemDirection = 'row';
                break;
        }

        let contentDirection = '';
        switch (props.extraPosition) {
            case 'top':
                contentDirection = 'column-reverse';
                break;
            case 'bottom':
                contentDirection = 'column';
                break;
            case 'left':
                contentDirection = 'row-reverse';
                break;
            case 'right':
                contentDirection = 'row';
                break;
        }

        const theme: ListTheme = {
            ..._themeConfig,
            fontSize: `${fontSize}px`,
            gap: `${fontSize}px`,
            itemDirection,
            contentDirection,
            actionsAlign: props.actionsAlign,
            extraAlign: props.extraAlign,
            contentJustifyContent: props.extraPosition === 'right' ? 'space-between' : 'start',
            hoverColor: props.hoverColor
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupList = (props: ListPropsType, ctx: SetupContext<typeof ListEmits>) => {
    const { slots, emit } = ctx;
    const commonExposed = usePrefab(props);
    const theme = obtainTheme({ props, commonExposed, ...ctx });

    const obtainHasExtra = computed(() => {
        return !!slots.extra;
    });

    const obtainActions = computed(() => {
        const actions = props.actions?.filter((action) => action.icon || action.text) || [];
        return (
            <Space gap={props.actionsGap}>
                {actions.map((action, a_index) => {
                    return (
                        <>
                            <IconText
                                onClick={action.opperator}
                                revert={props.actionsReverse}
                                size={props.size}
                                icon={action.icon}
                                text={action.text}></IconText>
                            {actions.length - 1 !== a_index ? <Divider direction='v'></Divider> : null}
                        </>
                    );
                })}
            </Space>
        );
    });

    /**
     * @private
     */
    const doItemClick__ = (ev: Event, args: LabelValue) => {
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
        ...commonExposed,
        theme,
        obtainActions,
        obtainHasExtra,
        doItemClick__
    };
};

export const ListExpose = [...baseExpose, ...([] as const)];
export type ListExposeType = (typeof ListExpose)[number];
