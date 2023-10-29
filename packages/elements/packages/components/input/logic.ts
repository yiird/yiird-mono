import { faEye, faEyeSlash, faLoader } from '@fortawesome/pro-light-svg-icons';
import { camelCase, omit, upperFirst } from 'lodash-es';
import { computed, h, reactive, ref, toRef, unref, type Component, type ExtractPropTypes, type PropType, type SetupContext, type VNode } from 'vue';
import { FormItemTextProps, obtainFormItemTheme, useFormItemText, type FormItemState } from '../../common/common-form';
import { useInputVModel } from '../../common/composites-vmodel';
import { baseExpose, usePrefab } from '../../common/prefab';
import { vnodeRef } from '../../common/vnode-utils';
import type { Affix } from '../../types/components';
import type { FormItemEventArgs } from '../../types/event';
import type { RenderedReturn, Size, ThemeConfig } from '../../types/global';
import { Button } from '../button';
import { Group } from '../group';
import { Icon } from '../icon';
import { IconText } from '../icon/text';

export type InputMode = 'text' | 'password' | 'number';

export const InputProps = {
    ...FormItemTextProps,
    /**
     * 类型
     */
    mode: {
        type: String as PropType<InputMode>,
        default: 'text'
    },
    prefixes: {
        type: Array as PropType<Affix[]>,
        default() {
            return [];
        }
    },
    suffixes: {
        type: Array as PropType<Affix[]>,
        default() {
            return [];
        }
    }
} as const;
export type InputPropsType = Readonly<ExtractPropTypes<typeof InputProps>>;

export const InputEmits = {
    /**
     * @private
     */
    'update:modelValue': null,
    /**
     * Change事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change(args: FormItemEventArgs) {
        return true;
    },
    /**
     * 焦点事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus(args: FormItemEventArgs) {
        return true;
    },
    /**
     * 失去事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(args: FormItemEventArgs) {
        return true;
    },
    /**
     * Input事件
     * @param args 参数
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input(args: FormItemEventArgs) {
        return true;
    },
    rightAction: null,
    leftAction: null,
    prefixAction: null,
    suffixAction: null,
    tabKeyDown: null
};

export interface InputState extends FormItemState {
    type: InputMode;
    checkPassword: boolean;
}

const __renderAffixies = (themeConfig: ThemeConfig, size: Size, affixes: Array<Affix>) => {
    const COMPONENS: Record<string, Component> = {
        Icon,
        Button,
        IconText
    };

    const slots: VNode = h(Group, () =>
        affixes
            .filter(({ kind }) => !!kind)
            .map((affix) => {
                const { kind, props, el } = affix;
                const Comp = COMPONENS[upperFirst(camelCase(kind))];

                const comp = h(Comp, {
                    ...omit(affix, 'kind', 'props'),
                    ...(props || {}),
                    rendered({ el: element }: RenderedReturn) {
                        if (el) {
                            el.value = element;
                        }
                    },
                    size
                });
                return comp;
            })
    );

    return () => slots;
};

export const createAffixis = (themeConfig: ThemeConfig, size: Size, affixes: Array<Affix>) => {
    return __renderAffixies(themeConfig, size, affixes);
};

export const setupInput = (props: InputPropsType, ctx: SetupContext<typeof InputEmits>) => {
    const { emit } = ctx;

    const state = reactive<FormItemState>({
        status: props.status,
        readonly: props.readonly,
        disabled: props.disabled
    });

    const selfState = reactive({
        mode: props.mode,
        checkPassword: false
    });

    const content = ref<Element>();

    const commonExposed = usePrefab(props);

    /**
     * @private
     */
    const _eventArgs = (inputValue: any) => {
        return { el: unref(commonExposed.el), value: inputValue };
    };

    const { modelValueRef } = useInputVModel(emit, {
        model: 'modelValue',
        modifiers: props.modelModifiers
    });

    const internalCtx = { props, commonExposed, ...ctx };

    const inputPrefab = useFormItemText(internalCtx, state);

    const theme = obtainFormItemTheme(internalCtx, state, (_theme) => {
        return _theme;
    });

    const obtainIsPassword = computed(() => {
        return selfState.mode === 'password' || selfState.checkPassword;
    });

    const obtainPasswordIcon = computed(() => {
        return selfState.checkPassword ? faEye : faEyeSlash;
    });

    const obtainPrefixies = vnodeRef(() => {
        const { size, prefixes } = props;
        return __renderAffixies(theme.value, size, prefixes);
    });

    const obtainSuffixies = vnodeRef(() => {
        const { size, suffixes } = props;
        return __renderAffixies(theme.value, size, suffixes);
    });

    const obtainPrefabAffixies = computed(() => {
        return props.loading || props.showCounter || props.mode === 'password';
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
            selfState.mode = 'text';
        } else {
            const index = bemModifiers.findIndex((_modifier) => _modifier === modifier);
            bemModifiers.splice(index, 1);
            selfState.mode = 'password';
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
    const doFoucs_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * focus 事件
             *
             * @param {InputEventArgs} arg0 事件参数
             *
             */
            emit('focus', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doBlur_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * blur 事件
             *
             * @param {InputEventArgs} arg0 事件参数
             *
             */
            emit('blur', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doChange_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * change 事件
             *
             * @param {InputEventArgs} arg0 事件参数
             *
             */
            emit('change', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doInput_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * input 事件
             *
             * @param {InputEventArgs} arg0 事件参数
             *
             */
            emit('input', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doTabKeyDown_ = () => {
        emit('tabKeyDown');
    };

    return {
        ...commonExposed,
        ...inputPrefab,
        theme,
        modelValueRef,
        obtainPasswordIcon,
        faLoader,
        doFoucs_,
        doBlur_,
        doChange_,
        doInput_,
        toggleCheckPassword_,
        doCheckPassword,
        doTabKeyDown_,
        type_: toRef(selfState, 'mode'),
        content,
        obtainPrefabAffixies,
        obtainPrefixies,
        obtainSuffixies,
        obtainIsPassword
    };
};
export const InputExpose = [...baseExpose, ...(['content'] as const)];
export type InputExposeType = (typeof InputExpose)[number];
