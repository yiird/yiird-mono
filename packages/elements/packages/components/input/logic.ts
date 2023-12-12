import { faEye, faEyeSlash, faLoader } from '@fortawesome/pro-light-svg-icons';
import { camelCase, omit, upperFirst } from 'lodash-es';
import { computed, h, reactive, toRef, type Component, type ExtractPropTypes, type PropType, type SetupContext, type VNode } from 'vue';
import { FormItemTextProps, bindEvent, obtainFormItemTheme, useTextCounter, useVModel, type FormItemState } from '../../common/common-form';
import { BaseEmits, OpperatorTheme, StatusTheme, baseExpose, usePrefab, useStatusTheme } from '../../common/prefab';
import { vnodeRef } from '../../common/vnode-utils';
import type { Affix } from '../../types/components';
import type { BlurEventArg, ChangeEventArg, FocusEventArg, InputEventArg } from '../../types/event';
import type { RenderedReturn, Size, ThemeConfig } from '../../types/global';
import { Button } from '../button';
import { Group } from '../group';
import { Icon } from '../icon';
import { IconText } from '../icon/text';
import type { InputTheme } from './theme';

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
    },
    theme: {
        type: Object as PropType<InputTheme | OpperatorTheme<InputTheme>>
    }
} as const;
export type InputPropsType = Readonly<ExtractPropTypes<typeof InputProps>>;

export const InputEmits = {
    ...BaseEmits,
    /**
     * @private
     */
    'update:modelValue': null,
    /**
     * Change事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change(args: ChangeEventArg) {
        return true;
    },
    /**
     * 焦点事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus(args: FocusEventArg) {
        return true;
    },
    /**
     * 失去事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(args: BlurEventArg) {
        return true;
    },
    /**
     * Input事件
     * @param args 参数
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input(args: InputEventArg) {
        return true;
    }
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
    const commonExposed = usePrefab(props);
    const internalCtx = { props, commonExposed, ...ctx };

    const {
        theme: themex,
        themeKey,
        toggleTheme
    } = useStatusTheme(props, (globalTheme) => {
        const statusTheme = new StatusTheme({
            color_border: globalTheme.ye_colorBg,
            color_text: globalTheme.ye_colorError.primary,
            color_placement: globalTheme.ye_colorBg,
            color_primary: globalTheme.ye_colorBg,
            color_shadow: globalTheme.ye_colorBg,
            size_gap: '',
            size_border_width: '0px',
            size_font_size: '',
            size_height: '',
            size_line_height: ''
        });

        statusTheme.addTheme('hover', {
            size_border_width: '2px'
        });
        return statusTheme;
    });

    const state = reactive<FormItemState>({
        status: props.status,
        readonly: props.readonly,
        disabled: props.disabled
    });

    const selfState = reactive({
        mode: props.mode,
        checkPassword: false
    });

    const { value } = useVModel(emit, props);

    const doEvent_ = bindEvent(emit, (e) => {
        if (e.type === 'mouseover' || e.type === 'mouseout') {
            toggleTheme('hover');
        }
    });

    const theme = obtainFormItemTheme(internalCtx, state, (_theme) => {
        return _theme;
    });

    const obtainTextCounter = useTextCounter<typeof InputEmits>(internalCtx);

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

    return {
        ...commonExposed,
        theme,
        themex,
        obtainPasswordIcon,
        faLoader,
        value,
        doEvent_,
        toggleCheckPassword_,
        doCheckPassword,
        type_: toRef(selfState, 'mode'),
        obtainTextCounter,
        obtainPrefabAffixies,
        obtainPrefixies,
        obtainSuffixies,
        obtainIsPassword
    };
};
export const InputExpose = [...baseExpose, ...([] as const)];
export type InputExposeType = (typeof InputExpose)[number];
