import { faCaretDown, faCaretLeft } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, ref, unref, watch, type ExtractPropTypes, type PropType, type SetupContext, type UnwrapNestedRefs } from 'vue';
import { isLabelValue, isTreeNode } from '../../common/check-type';
import { FormItemSelectedProps, obtainFormItemTheme, type FormItemState, type FormItemTheme } from '../../common/common-form';
import type { LabelValue, LabelValueMapping, TreeNodeMapping } from '../../common/common-source';
import { baseExpose, usePrefab } from '../../common/prefab';
import type { Affix, PopoverEventArgs } from '../../types/components';
import type { FormItemEventArgs, ListEventArgs, SelectEventArgs, TreeEventArgs } from '../../types/event';
import type { Dimensions, Size } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
import type { InputType } from '../input';
import type { PopoverType } from '../popover';
import type { TreePropsType, TreeType } from '../tree';

export type SelectMode = 'list' | 'tree';

export interface SelectPopOptions {
    width?: Dimensions | 'fixed';
    height?: Dimensions;
}

export type SelectTreeOptions = Partial<Omit<TreePropsType, 'id' | 'display' | 'size' | 'source' | 'draggable' | 'multi' | 'defaultSelectedKeys'>>;

export const SelectProps = {
    ...FormItemSelectedProps,
    /**
     * 数据源
     */
    source: {
        type: Array as PropType<any[]>
    },
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
     * 是否可以搜索
     */
    searchable: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 下拉模式
     * `tree` 下拉树
     * `list` 下拉列表
     */
    mode: {
        type: String as PropType<'tree' | 'list'>,
        required: true
    },
    mapping: {
        type: Object as PropType<LabelValueMapping | TreeNodeMapping>,
        default(props: any) {
            return props.mode === 'tree' ? {} : {};
        }
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

    const pop = ref<PopoverType>();
    const tree = ref<TreeType>();
    // 有效值
    const value = ref(props.modelValue);
    // 显示值
    const displayValue = ref();

    const input = ref<InputType>();
    const hidden = ref<HTMLInputElement>();
    const toggleIcon = ref();
    const isOpen = ref(false);

    const internalCtx = { props, commonExposed, ...ctx };
    const theme = obtainTheme(internalCtx, state);

    const obtainInputSuffixes = computed<Array<Affix>>(() => {
        return [
            {
                kind: 'icon',
                el: toggleIcon,
                icon: isOpen.value ? faCaretDown : faCaretLeft,
                onClick() {
                    pop.value?.toggle();
                }
            }
        ];
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
    const _setValueAndDisplayValue = (label: string, realValue: any) => {
        value.value = realValue;
        displayValue.value = label;
        if (props.once) {
            pop.value?.close();
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

    const obtainWidth = computed(() => {
        const {
            popOptions: { width }
        } = props;
        return width === 'fixed' ? el.value?.offsetWidth : width;
    });

    const obtainHeight = computed(() => {
        const {
            popOptions: { height }
        } = props;
        return height;
    });

    const obtainSearchable = computed(() => {
        const { searchable } = props;
        return (mode === 'list' || mode === 'tree') && searchable;
    });

    return {
        ...commonExposed,
        theme,
        pop,
        tree,
        displayValue,
        value,
        input,
        hidden,
        isOpen,
        toggleIcon,
        obtainInputSuffixes,
        obtainSearchable,
        obtainIsList,
        obtainIsTree,
        obtainWidth,
        obtainHeight,
        doListSelect_,
        doTreeSelect_,
        doFilterData_,
        doPopoverOpen_
    };
};
export const SelectExpose = [...baseExpose, ...([] as const)];
export type SelectExposeType = (typeof SelectExpose)[number];
