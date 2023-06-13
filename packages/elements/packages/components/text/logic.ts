import { faEye, faEyeSlash, faLoader } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, ref, toRef, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { useVModel } from '../../common/composites-vmodel';
import { baseExpose, usePrefab } from '../../common/prefab';
import { InputEmits, InputProps, obtainInputTheme, useInput, type BaseInputState, type EventArgs } from '../../common/prefab-text';
import type { IconNameOrDefinition } from '../icon';

export type TextType = 'text' | 'password' | 'number';

export interface TextAction {
    text?: string;
    icon?: IconNameOrDefinition;
}

export const TextProps = {
    ...InputProps,
    /**
     * 类型
     */
    type: {
        type: String as PropType<TextType>,
        default: 'text'
    },
    /**
     * @name data
     * @model
     */
    data: {
        type: Object as PropType<object>
    },
    /**
     * @private
     */
    dataModifiers: {
        type: Object as PropType<{ lazy: boolean; number: boolean; trim: boolean }>,
        default: () => ({})
    },
    /**
     * 前缀
     */
    prefixIcon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    /**
     * 前缀
     */
    prefixText: {
        type: String as PropType<string>
    },
    /**
     * 后缀
     */
    suffixIcon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    /**
     * 后缀
     */
    suffixText: {
        type: String as PropType<string>
    },
    /**
     * 右侧扩展
     */
    rightAction: {
        type: Object as PropType<TextAction>
    },
    /**
     * 左侧扩展
     */
    leftAction: {
        type: Object as PropType<TextAction>
    }
} as const;
export type TextPropsType = Readonly<ExtractPropTypes<typeof TextProps>>;

/**
 * 事件参数
 */
export interface TextEventArgs extends EventArgs {
    /**
     * 包括前后缀完整数据
     */
    whole: any;
    /**
     * 前缀DOM元素
     */
    prefix?: Element;
    /**
     * 后缀DOM元素
     */
    suffix?: Element;
    /**
     * 前缀文本
     */
    prefixText?: string | null;
    /**
     * 后缀文本
     */
    suffixText?: string | null;
}

export const TextEmits = {
    /**
     * @private
     */
    'update:data': null,
    /**
     * @replaceType EventArgs TextEventArgs
     */
    ...InputEmits,
    rightAction: null,
    leftAction: null,
    prefixAction: null,
    suffixAction: null
};

export interface TextState extends BaseInputState {
    type: TextType;
    checkPassword: boolean;
}

export const setupText = (props: TextPropsType, ctx: SetupContext<typeof TextEmits>) => {
    const { emit, slots } = ctx;

    const selfState = reactive({
        type: props.type,
        checkPassword: false
    });

    const prefix = ref<Element>();
    const suffix = ref<Element>();

    const prefab = usePrefab(props);

    const _opperatorArg = (inputValue: any, trim: boolean) => {
        const _suffix = suffix.value;
        const _prefix = prefix.value;
        const suffixText = _suffix?.textContent;
        const prefixText = _prefix?.textContent;
        let whole;
        if (trim) {
            whole = (prefixText || '').trim() + (inputValue ? inputValue + '' : '').trim() + (suffixText || '').trim();
        } else {
            whole = `${prefixText || ''}${inputValue}${suffixText || ''}`;
        }
        return { whole, prefix: _prefix, suffix: _suffix, prefixText, suffixText };
    };

    const { modelValueRef } = useVModel(
        emit,
        {
            model: 'modelValue',
            modifiers: props.modelModifiers
        },
        {
            model: 'data',
            reference: 'modelValue',
            modifiers: props.dataModifiers,
            opperator(input, binder) {
                return _opperatorArg(input, !!(binder && binder?.modifiers.trim));
            }
        }
    );

    const internalCtx = { props, prefab, ...ctx };

    const inputPrefab = useInput<typeof TextEmits>(internalCtx, _opperatorArg);
    const { state } = inputPrefab;
    const theme = obtainInputTheme<typeof TextEmits>(internalCtx, state);

    const obtainIsPassword = computed(() => {
        return selfState.type === 'password' || selfState.checkPassword;
    });

    const obtainPasswordIcon = computed(() => {
        return selfState.checkPassword ? faEye : faEyeSlash;
    });

    const obtainHasPrefix = computed(() => {
        return slots.prefix || props.prefixIcon || props.prefixText;
    });

    const obtainHasSuffix = computed(() => {
        return slots.suffix || props.suffixIcon || props.suffixText;
    });

    /**
     * 显示隐藏密码
     *
     * @param flag `true` 显示密码
     */
    const doCheckPassword = (flag: boolean) => {
        if (state.disabled) return;
        const { bemModifiers } = theme.value;
        const modifier = 'input--check-password';
        if (flag) {
            bemModifiers.push(modifier);
            selfState.type = 'text';
        } else {
            const index = bemModifiers.findIndex((_modifier) => _modifier === modifier);
            bemModifiers.splice(index, 1);
            selfState.type = 'password';
        }
    };

    /**
     * @private
     */
    const toggleCheckPassword_ = () => {
        if (state.disabled) return;
        selfState.checkPassword = !selfState.checkPassword;
        doCheckPassword(selfState.checkPassword);
    };

    /**
     * @private
     */
    const doAction_ = (position: 'right' | 'left' | 'prefix' | 'suffix') => {
        if ('right' === position) {
            /**
             * 右侧action点击事件
             */
            emit('rightAction');
        } else if ('left' === position) {
            /**
             * 左侧action点击事件
             */
            emit('leftAction');
        } else if ('prefix' === position) {
            /**
             * 前缀点击事件
             */
            emit('rightAction');
        } else if ('suffix' === position) {
            /**
             * 后缀点击事件
             */
            emit('leftAction');
        }
    };

    return {
        ...prefab,
        ...inputPrefab,
        theme,
        modelValueRef,
        obtainPasswordIcon,
        faLoader,
        doAction_,
        toggleCheckPassword_,
        doCheckPassword,
        type_: toRef(selfState, 'type'),
        prefix,
        suffix,
        obtainHasPrefix,
        obtainHasSuffix,
        obtainIsPassword
    };
};
export const TextExpose = [...baseExpose];
