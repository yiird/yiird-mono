import { isObject as _isObject } from 'lodash-es';
import { computed, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight } from '../../config';
import type { InternalSetupContext, LabelValue, Size, ThemeConfig } from '../../types/global';

export type ListLayout = 'h' | 'v';

export const ListProps = {
    ...BaseProps,
    /**
     * 列表项
     */
    // items: {
    //     type: Array as PropType<ListItem[] | LabelValue[]>,
    //     default() {
    //         return [];
    //     }
    // },

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
    gap: {
        type: Number,
        default: 5
    }
} as const;
export type ListPropsType = Readonly<ExtractPropTypes<typeof ListProps>>;

export interface ListTheme extends ThemeConfig {
    bemModifiers?: string[];
    height: string;
    fontSize: string;
    gap: string;
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
            gap: `${props.gap}px`
        };

        theme.bemModifiers = [];

        return theme;
    });
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

    const obtainItems = computed<[]>(() => {
        return [];
    });

    const isObject__ = _isObject;

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
        ...prefab,
        theme,
        obtainItems,
        obtainHasLeft,
        obtainHasRight,
        isObject__,
        // isLabelValue__,
        doItemClick__
    };
};
export const ListExpose = [...baseExpose];
