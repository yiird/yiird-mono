import { faEye, faEyeSlash, faLoader } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, ref, toRef, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { useVModel } from '../../common/composites-vmodel';
import { baseExpose, usePrefab } from '../../common/prefab';
import { BaseInputEmits, BaseInputProps, obtainBaseInputTheme, useBaseInput, type BaseInputState, type EventArgs } from '../../common/prefab-input';
import type { IconNameOrDefinition } from '../icon';

export type InputType = 'text' | 'password' | 'number';

export interface InputAction {
    text?: string;
    icon?: IconNameOrDefinition;
}

export const InputProps = {
    ...BaseInputProps,
    /**
     * 类型
     */
    type: {
        type: String as PropType<InputType>,
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
        type: Object as PropType<InputAction>
    },
    /**
     * 左侧扩展
     */
    leftAction: {
        type: Object as PropType<InputAction>
    }
} as const;
export type InputPropsType = Readonly<ExtractPropTypes<typeof InputProps>>;

/**
 * 事件参数
 */
export interface InputEventArgs extends EventArgs {
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

export const InputEmits = {
    /**
     * @private
     */
    'update:data': null,
    /**
     * @replaceType EventArgs InputEventArgs
     */
    ...BaseInputEmits,
    rightAction: null,
    leftAction: null,
    prefixAction: null,
    suffixAction: null
};

export interface InputState extends BaseInputState {
    type: InputType;
    checkPassword: boolean;
}

export const setupInput = (props: InputPropsType, ctx: SetupContext<typeof InputEmits>) => {
    const { emit, slots } = ctx;

    const selfState = reactive({
        type: props.type,
        checkPassword: false
    });

    const prefix = ref<Element>();
    const suffix = ref<Element>();

    const commonExposed = usePrefab(props);

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

    const internalCtx = { props, commonExposed, ...ctx };

    const inputPrefab = useBaseInput<typeof InputEmits>(internalCtx, _opperatorArg);
    const { state } = inputPrefab;
    const theme = obtainBaseInputTheme<typeof InputEmits>(internalCtx, state);

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
        ...commonExposed,
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
export const InputExpose = [...baseExpose, ...([] as const)];
export type InputExposeType = (typeof InputExpose)[number];
