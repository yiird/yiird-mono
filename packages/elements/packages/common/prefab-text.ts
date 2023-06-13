import type Color from 'color';
import { computed, reactive, ref, toRefs, type EmitsOptions, type ExtractPropTypes, type PropType, type UnwrapNestedRefs } from 'vue';
import { sizeToFontSize, sizeToHeight, stateColor } from '../config';
import type { DataStatus, InternalSetupContext, Size, ThemeConfig } from '../types/global';
import { BaseProps, useTheme } from './prefab';

export const InputProps = {
    ...BaseProps,
    /**
     * <input>的名称
     */
    name: {
        type: String as PropType<string>
    },
    /**
     * 占位信息
     */
    placeholder: {
        type: String as PropType<string>
    },
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
     * 最大长度
     */
    maxLength: { type: Number as PropType<number> },
    /**
     * 是否显示计数
     */
    showCounter: {
        type: Boolean,
        default: false
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
     * 数据状态
     */
    status: {
        type: String as PropType<DataStatus>,
        default: 'default'
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
        default: false
    }
};

export type InputPropsType = Readonly<ExtractPropTypes<typeof InputProps>>;

export interface BaseInputState {
    status: DataStatus;
    focus: boolean;
    disabled: boolean;
    readonly: boolean;
}

export interface InputTheme extends ThemeConfig {
    bemModifiers: string[];
    colors: {
        text: Color;
        border: Color;
        borderLigher: Color;
        defaultBorder: Color;
        active: Color;
    };
    size: {
        fontSize: string;
        height: string;
        lineHeight: string;
    };
    shadow?: string;
}

export interface EventArgs {
    /**
     * 事件对象
     */
    ev: Event;
    /**
     * 输入数据
     */
    input: any;
}

export const InputEmits = {
    /**
     * @private
     */
    'update:modelValue': null,
    /**
     * Input事件
     * @param args 参数
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input(args: EventArgs) {
        return true;
    },
    /**
     * Change事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change(args: EventArgs) {
        return true;
    },
    /**
     * 焦点事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus(args: EventArgs) {
        return true;
    },
    /**
     * 失去事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(args: EventArgs) {
        return true;
    }
};

export const obtainInputTheme = <E extends EmitsOptions>(
    ctx: InternalSetupContext<InputPropsType, E>,
    state: UnwrapNestedRefs<BaseInputState>,
    onFlush?: (config: InputTheme) => InputTheme
) => {
    const themeConfig = useTheme();
    const { props, prefab } = ctx;
    const { cType__ } = prefab;
    const { focus, status, disabled, readonly } = toRefs(state);

    const bemModifiers = computed(() => {
        const modifiers = [];

        if (readonly.value) {
            modifiers.push(`${cType__}--readonly`);
        }

        if (disabled.value) {
            modifiers.push(`${cType__}--disabled`);
        }

        if (readonly.value) {
            modifiers.push(`${cType__}--readonly`);
        }
        if (focus.value) {
            modifiers.push(`${cType__}--focus`);
        }
        return modifiers;
    });

    const colors = computed(() => {
        const _status = status.value;
        const _themeConfig = themeConfig.value;

        const colorDefault = stateColor(_themeConfig, 'default');
        const _stateColor = stateColor(_themeConfig, _status === 'default' ? 'primary' : _status);
        let border = colorDefault.lighter;

        if (!disabled.value) {
            if (focus.value || 'default' !== _status) {
                border = _stateColor.lighter;
            }
        }

        const text = _themeConfig.ye_colorPrimaryText;
        return {
            text,
            border,
            borderLigher: _stateColor.translucent,
            defaultBorder: colorDefault.lighter,
            active: _stateColor.lighter
        };
    });

    const size = computed(() => {
        const _themeConfig = themeConfig.value;
        const height = sizeToHeight(_themeConfig, props.size);
        const fontSize = sizeToFontSize(_themeConfig, props.size);
        return {
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };
    });

    return computed<InputTheme>(() => {
        const _themeConfig = themeConfig.value;
        const _bemModifiers = bemModifiers.value;
        const _colors = colors.value;
        const _size = size.value;

        const theme: InputTheme = {
            ..._themeConfig,
            colors: _colors,
            size: _size,
            bemModifiers: _bemModifiers
        };

        if (props.shadow) {
            theme.shadow = `0 2px 0 ${theme.colors.border?.alpha(0.1)}`;
        }

        return onFlush ? onFlush(theme) : theme;
    });
};

export type OpperatorData = (inputValue: any, trim: boolean) => Record<string, any>;

export const useInput = <E extends EmitsOptions>(ctx: InternalSetupContext<InputPropsType, E>, opperatorData?: OpperatorData) => {
    const { props, emit } = ctx;
    const state = reactive<BaseInputState>({
        status: props.status,
        focus: false,
        readonly: props.readonly,
        disabled: props.disabled
    });
    const inputDom = ref<HTMLInputElement>();

    const _preEvent = (ev: Event, handler: <A extends EventArgs>(arg: A) => void) => {
        if (state.disabled) return;
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            const data = opperatorData ? opperatorData(target.value, props.modelModifiers.trim) : {};
            handler({
                ev,
                input: target.value,
                ...data
            });
        }
    };

    const obtainCounter = computed(() => {
        return props.maxLength && props.showCounter ? `${props.modelValue?.toString().length}/${props.maxLength}` : '';
    });

    /**
     * @private
     */
    const doFoucs_ = (ev: Event) =>
        _preEvent(ev, (arg) => {
            state.focus = true;
            /**
             * 焦点事件
             *
             * @param {EventArgs} arg0 事件参数
             *
             */
            emit('focus', arg);
        });

    /**
     * @private
     */
    const doBlur_ = (ev: Event) =>
        _preEvent(ev, (arg) => {
            state.focus = false;
            /**
             * 失去焦点事件
             *
             * @param {EventArgs} arg0 事件参数
             */
            emit('blur', arg);
        });

    /**
     * @private
     */
    const doInput_ = (ev: Event) =>
        _preEvent(ev, (arg) => {
            /**
             * input 事件
             *
             * @param {EventArgs} arg0 事件参数
             */
            emit('input', arg);
        });

    /**
     * @private
     */
    const doChange_ = (ev: Event) =>
        _preEvent(ev, (arg) => {
            /**
             * change 事件
             *
             * @param {EventArgs} arg0 事件参数
             */
            emit('change', arg);
        });

    return {
        inputDom,
        state,
        doFoucs_,
        doBlur_,
        doInput_,
        doChange_,
        obtainCounter
    };
};
