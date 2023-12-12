import { computed, ref, unref, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { isLabelValue } from '../../common/check-type';
import type { LabelValue } from '../../common/common-source';
import { toStyleValue } from '../../common/dom-utils';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import type { PopoverReference, PoppoverMode } from '../../types/components';
import type { DropEventArgs, InputEventArg, ListEventArgs } from '../../types/event';
import type { Placement, Size, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
import type { TreeType } from '../tree';

export interface ListPropsOptions {}
export interface TreePropsOptions {}

export const DropProps = {
    ...BaseProps,
    /**
     * 显示隐藏
     */
    display: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    reference: {
        type: [String, Object] as PropType<PopoverReference>
    },
    source: {
        type: Array as PropType<LabelValue[]>
    },
    searchable: {
        type: Boolean,
        default: true
    },
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 下拉类型
     * `list` 列表结构
     * `tree` 树形结构
     */
    type: {
        type: String as PropType<'list' | 'tree'>,
        default: 'list'
    },
    listOptions: {
        type: Object as PropType<ListPropsOptions>
    },
    treeOptions: {
        type: Object as PropType<TreePropsOptions>
    },
    allowPlacement: {
        type: Array as PropType<Placement[]>,
        default() {
            return ['bottom'];
        }
    },
    offset: {
        type: Number,
        default: 5
    },
    mode: {
        type: String as PropType<PoppoverMode>,
        default: 'click-leave'
    },
    minWidth: {
        type: [Number, String] as PropType<number | string>
    },
    maxWidth: {
        type: [Number, String] as PropType<number | string>
    },
    maxHeight: {
        type: [Number, String] as PropType<number | string>
    }
} as const;
export type DropPropsType = Readonly<ExtractPropTypes<typeof DropProps>>;

export interface DropTheme extends ThemeConfig {
    bemModifiers?: string[];
    minWidth: string;
    maxWidth: string;
}

export const DropEmits = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select(args: DropEventArgs) {
        return true;
    },
    /**
     * 点击下拉组件、挂载组件以外的区域
     */
    clickOut: null
};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<DropPropsType, E>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    return computed<DropTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: DropTheme = {
            ..._themeConfig,
            minWidth: toStyleValue(props.minWidth, 'unset'),
            maxWidth: toStyleValue(props.maxWidth, 'unset')
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupDrop = (props: DropPropsType, ctx: SetupContext<typeof DropEmits>) => {
    const commonExposed = usePrefab(props);
    const { el } = commonExposed;
    const theme = obtainTheme<typeof DropEmits>({ props, commonExposed, ...ctx });
    const { emit } = ctx;
    const tree = ref<TreeType>();

    /**
     * @private
     * @param args
     */
    const doSelect_ = (args: ListEventArgs<LabelValue>) => {
        if (isLabelValue(args.value)) {
            const { label, value } = args.value;
            emit('select', {
                el: unref(el),
                value,
                label
            });
        }
    };

    const obtainIsList = computed(() => {
        return props.type === 'list';
    });

    const obtainIsTree = computed(() => {
        return props.type === 'tree';
    });

    const doFilterData_ = (args: InputEventArg) => {
        if (tree.value) {
            //tree.value.filter(args.ev.target.value);
        }
    };

    return {
        ...commonExposed,
        theme,
        tree,
        doSelect_,
        doFilterData_,
        obtainIsList,
        obtainIsTree
    };
};
export const DropExpose = [...baseExpose, ...([] as const)];
export type DropExposeType = (typeof DropExpose)[number];
