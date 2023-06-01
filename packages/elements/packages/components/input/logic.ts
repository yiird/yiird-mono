import { faCaretRight, faLoader } from '@fortawesome/pro-light-svg-icons';
import { clone } from 'lodash-es';
import { computed, ref, type ExtractPropTypes, type PropType, type Ref, type SetupContext } from 'vue';
import { useVModel } from '../../common/composites-input';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight, stateColor2 } from '../../config';
import type { InternalSetupContext, Size, StateColorGroup, ThemeConfig } from '../../types/global';
import type { IconNameOrDefinition } from '../icon/logic';
export interface InputAction {
    text?: string;
    icon?: IconNameOrDefinition;
}

export type InputState = 'default' | 'disabled' | 'focus' | 'warn' | 'error';

export const InputProps = {
    ...BaseProps,
    /**
     * @name
     * @model
     */
    modelValue: {
        type: [String, Number] as PropType<string | number>
    },
    /**
     * @private
     */
    modelModifiers: {
        type: Object as PropType<{ lazy: boolean; number: boolean; trim: boolean }>,
        default: () => ({})
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
     * 标题
     */
    label: {
        type: String as PropType<string>
    },
    /**
     * 是否禁用
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 是否禁用
     */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * 最小宽度
     * @private
     */
    minWidth: {
        type: Number
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },

    /**
     * 是否使用阴影
     */
    shadow: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * 是否使用阴影
     */
    loading: {
        type: Boolean as PropType<boolean>,
        default: true
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

export interface InputTheme extends ThemeConfig {
    bemModifiers?: string[];
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    actionColor: StateColorGroup;
    color: StateColorGroup;
    shadow?: string;
}

export const InputEmits = {
    'update:modelValue': null,
    'update:data': null
};

const obtainTheme = (ctx: InternalSetupContext<InputPropsType, typeof InputEmits>, state: Ref<InputState>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    return computed<InputTheme>(() => {
        const _themeConfig = themeConfig.value;
        const _state = state.value;

        const height = sizeToHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const colorName = _state === 'disabled' || _state === 'default' ? 'default' : _state === 'focus' ? 'primary' : _state;

        const actionColor = stateColor2(_themeConfig, colorName);

        const color = clone(actionColor);
        if (_state === 'default') {
            color.text = _themeConfig.ye_colorPrimaryText;
        }

        const theme: InputTheme = {
            ..._themeConfig,
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`,
            actionColor,
            color
        };

        theme.bemModifiers = [];

        if (props.shadow) {
            theme.shadow = `0 2px 0 ${theme.color.primary?.alpha(0.1)}`;
        }

        if (props.disabled) {
            theme.bemModifiers.push('input--disabled');
        }

        if (_state === 'focus') {
            theme.bemModifiers.push('input--focus');
        }

        return theme;
    });
};

export const setupInput = (props: InputPropsType, ctx: SetupContext<typeof InputEmits>) => {
    const { emit, slots } = ctx;
    const state = ref<InputState>(props.disabled ? 'disabled' : 'default');
    const prefab = usePrefab(props);
    const theme = obtainTheme({ props, prefab, ...ctx }, state);
    const inputDom = ref<HTMLInputElement>();
    const prefix = ref<Element>();
    const suffix = ref<Element>();

    const { modelValueRef } = useVModel(
        emit,
        { model: 'modelValue', modifiers: props.modelModifiers },
        {
            model: 'data',
            reference: 'modelValue',
            modifiers: props.dataModifiers,
            opperator(input, binder) {
                const inputValue = input;
                const _suffix = suffix.value;
                const _prefix = prefix.value;
                const suffixText = _suffix?.textContent;
                const prefixText = _prefix?.textContent;
                let value;
                if (binder && binder?.modifiers.trim) {
                    value = (prefixText || '').trim() + (inputValue ? inputValue + '' : '').trim() + (suffixText || '').trim();
                } else {
                    value = `${prefixText || ''}${inputValue}${suffixText || ''}`;
                }
                return { input, value, prefix: _prefix, suffix: _suffix, prefixText, suffixText };
            }
        }
    );

    const obtainHasPrefix = computed(() => {
        return slots.prefix;
    });

    const obtainHasSuffix = computed(() => {
        return slots.suffix;
    });

    const doFoucs_ = () => {
        if (props.disabled) return;
        if (state.value === 'default') {
            state.value = 'focus';
        }
    };
    const doBlur_ = () => {
        if (props.disabled) return;
        if (state.value === 'focus') {
            state.value = 'default';
        }
    };

    return {
        ...prefab,
        theme,
        inputDom,
        modelValueRef,
        faCaretRight,
        faLoader,
        doFoucs_,
        doBlur_,
        prefix,
        suffix,
        obtainHasPrefix,
        obtainHasSuffix
    };
};
export const InputExpose = [...baseExpose];
