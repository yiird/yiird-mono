import { faCaretDown, faCaretLeft } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, ref, unref, watch, type ExtractPropTypes, type PropType, type SetupContext, type UnwrapNestedRefs } from 'vue';
import { isLabelValue, isTreeNode } from '../../common/check-type';
import { FormItemSelectedProps, obtainFormItemTheme, type FormItemState, type FormItemTheme } from '../../common/common-form';
import type { LabelValue, LabelValueMapping, TreeNode, TreeNodeMapping } from '../../common/common-source';
import { baseExpose, usePrefab } from '../../common/prefab';
import type { FormItemEventArgs, ListEventArgs, SelectEventArgs, TreeEventArgs } from '../../types/event';
import type { PopoverEventArgs } from '../../types/popover';
import type { InternalSetupContext } from '../../types/prefab';
import type { Size } from '../../types/theme';
import type { InputType } from '../input';
import type { TreePropsType, TreeType } from '../tree';

export type SelectMode = 'list' | 'tree';

export interface SelectPopOptions {
    fixedWidth?: boolean;
    maxWidth?: string | number;
    minWidth?: string | number;
    /**
     * 下拉最大高度
     * 对下拉树不起作用，下拉树的高度根据 `tree-options` 中的 `screenSize` 决定
     */
    maxHeight?: string | number;
    /**
     * 下拉最大高度
     * 对下拉树不起作用，下拉树的高度根据 `tree-options` 中的 `screenSize` 决定
     */
    minHeight?: string | number;
    /**
     * 是否可以搜索
     */
    searchable?: boolean;
    once?: boolean;
}

export type SelectTreeOptions = Partial<Omit<TreePropsType, 'id' | 'display' | 'source' | 'size' | 'draggable' | 'multi' | 'defaultSelectedKeys'>>;

export const SelectProps = {
    ...FormItemSelectedProps,
    loading: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 选择一次就关闭下拉
     */
    once: {
        type: Boolean,
        default: true
    },
    /**
     * 数据源
     */
    source: {
        type: Array as PropType<LabelValue[] | TreeNode[]>
    },
    mapping: {
        type: Object as PropType<LabelValueMapping | TreeNodeMapping>
    },
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    popOptions: {
        type: Object as PropType<SelectPopOptions>,
        default() {
            return {
                fixedWidth: false
            };
        }
    },
    treeOptions: {
        type: Object as PropType<SelectTreeOptions>,
        default() {
            return {
                screenSize: 10
            };
        }
    }
} as const;

export type SelectPropsType = Readonly<ExtractPropTypes<typeof SelectProps>>;

export interface SelectTheme extends FormItemTheme {
    MaxWidth: string;
    dropMinWidth: string;
}

export const SelectEmits = {
    'update:modelValue': null,
    change(args: SelectEventArgs) {
        return true;
    }
};

const obtainTheme = (ctx: InternalSetupContext<SelectPropsType, typeof SelectEmits>, state: UnwrapNestedRefs<FormItemState>) => {
    const { commonExposed, props } = ctx;
    const { mapping } = props;
    const mode = isLabelValue(mapping) ? 'list' : isTreeNode(mapping) ? 'tree' : null;
    return obtainFormItemTheme<SelectTheme>(ctx, state, (theme) => {
        theme.bemModifiers.push(`${commonExposed.cType__}--${mode}`);
        return theme;
    });
};

export const setupSelect = (props: SelectPropsType, ctx: SetupContext<typeof SelectEmits>) => {
    const { emit } = ctx;
    const commonExposed = usePrefab(props);
    const { el } = commonExposed;
    const { mapping } = props;

    const state = reactive<FormItemState>({
        status: props.status,
        readonly: props.readonly,
        disabled: props.disabled
    });

    const tree = ref<TreeType>();
    // 有效值
    const value = ref(props.modelValue);
    // 显示值
    const displayValue = ref();

    const input = ref<InputType>();
    const hidden = ref<HTMLInputElement>();
    const isOpen = ref(false);

    const internalCtx = { props, commonExposed, ...ctx };
    const theme = obtainTheme(internalCtx, state);

    const obtainRightAction = computed(() => {
        return {
            icon: isOpen.value ? faCaretDown : faCaretLeft
        };
    });
    const mode = isLabelValue(mapping) ? 'list' : isTreeNode(mapping) ? 'tree' : null;
    const obtainIsList = computed(() => {
        return mode === 'list';
    });

    const obtainIsTree = computed(() => {
        return mode === 'tree';
    });

    watch(value, (_value) => {
        emit('update:modelValue', _value);
        const args = {
            el: unref(el),
            hiddenEl: hidden.value,
            label: displayValue.value,
            value: _value
        };
        emit('change', args);
    });

    /**
     * @private
     */
    const doRightAction_ = () => {
        isOpen.value = !isOpen.value;
    };

    /**
     * @private
     */
    const _setValueAndDisplayValue = (label: string, realValue: any) => {
        value.value = realValue;
        displayValue.value = label;
        if (props.once) {
            isOpen.value = false;
        }
    };

    /**
     * @private
     */
    const doListSelect_ = (args: ListEventArgs<LabelValue>) => {
        if (args.value) {
            const { label, value: realValue } = args.value;
            _setValueAndDisplayValue(label, realValue);
        }
    };

    /**
     * @private
     */
    const doTreeSelect_ = (args: TreeEventArgs) => {
        if (args.checked) {
            const checked = args.checked;
            if (checked && checked.length === 1) {
                const node = checked[0];
                _setValueAndDisplayValue(node.text, node.key);
            }
        }
    };

    /**
     * @private
     */
    const doFilterData_ = (args: FormItemEventArgs) => {
        if (mode === 'tree') {
            if (tree.value) {
                tree.value.filter(args.value);
            }
        }
    };

    /**
     * @private
     */
    const doPopoverOpen_ = (args: PopoverEventArgs) => {
        isOpen.value = args.flag;
    };

    const obtainPopMaxWidth = computed(() => {
        const {
            popOptions: { fixedWidth, maxWidth }
        } = props;

        return fixedWidth ? el.value?.offsetWidth : maxWidth;
    });

    const obtainPopMinWidth = computed(() => {
        const {
            popOptions: { fixedWidth, minWidth }
        } = props;

        return fixedWidth ? el.value?.offsetWidth : minWidth;
    });

    const obtainPopMaxHeight = computed(() => {
        const {
            popOptions: { maxHeight }
        } = props;

        return obtainIsTree.value ? undefined : maxHeight;
    });

    const obtainPopMinHeight = computed(() => {
        const {
            popOptions: { minHeight }
        } = props;

        return obtainIsTree.value ? undefined : minHeight;
    });

    const obtainSearchable = computed(() => {
        const {
            popOptions: { searchable }
        } = props;
        return (mode === 'list' || mode === 'tree') && searchable;
    });

    return {
        ...commonExposed,
        theme,
        tree,
        displayValue,
        value,
        input,
        hidden,
        isOpen,
        obtainRightAction,
        obtainSearchable,
        obtainIsList,
        obtainIsTree,
        obtainPopMaxWidth,
        obtainPopMinWidth,
        obtainPopMaxHeight,
        obtainPopMinHeight,
        doRightAction_,
        doListSelect_,
        doTreeSelect_,
        doFilterData_,
        doPopoverOpen_
    };
};
export const SelectExpose = [...baseExpose, ...([] as const)];
export type SelectExposeType = (typeof SelectExpose)[number];
