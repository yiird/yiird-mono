import type Color from 'color';
import { computed, toRefs, type ExtractPropTypes, type PropType, type UnwrapNestedRefs } from 'vue';
import { sizeToComponentHeight, sizeToFontSize, sizeToGap, sizeToTextLineHeight, stateColor } from '../config';
import type { FormItemEventArgs } from '../types/event';
import type { DataStatus, Size, ThemeConfig } from '../types/global';
import type { CommonExposed, InternalSetupContext } from '../types/prefab';
import { BaseProps, useTheme } from './prefab';
export interface FormItemState {
    disabled: boolean;
    readonly: boolean;
    status: DataStatus;
}

/**
 * 表单项公共 Props
 */
export const FormItemCommonProps = {
    ...BaseProps,
    /**
     * 表单项 `name`
     */
    name: {
        type: String as PropType<string>
    },
    /**
     * 占位提示内容
     */
    placeholder: {
        type: String as PropType<string>
    },
    /**
     * 禁用
     */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 只读
     */
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 数据状态
     */
    status: {
        type: String as PropType<DataStatus>,
        default: 'default'
    }
} as const;

export type FormItemCommonPropsType = Readonly<ExtractPropTypes<typeof FormItemCommonProps>>;

/**
 * 文本输入型 Props
 */
export const FormItemTextProps = {
    ...FormItemCommonProps,
    /**
     * 数据双向绑定
     *
     * @name
     * @model
     */
    modelValue: {
        type: [String, Number] as PropType<string | number>
    },
    /**
     * v-model 修饰符
     *
     * @private
     */
    modelModifiers: {
        type: Object as PropType<{ lazy: boolean; number: boolean; trim: boolean }>,
        default: () => ({})
    },

    /**
     * 加载标志
     */
    loading: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 最大长度
     */
    maxLength: {
        type: Number as PropType<number>
    },
    /**
     * 是否显示计数
     */
    showCounter: {
        type: Boolean,
        default: false
    },
    /**
     * 是否使用阴影
     */
    shadow: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const;

export type FormItemTextPropsType = Readonly<ExtractPropTypes<typeof FormItemTextProps>>;

/**
 * 选择型 Props
 */
export const FormItemSelectedProps = {
    ...FormItemCommonProps,
    /**
     * 数据双向绑定
     *
     * @name
     * @model
     */
    modelValue: {
        type: [String, Number, Boolean, Array] as PropType<string | boolean | number | string[] | number[]>
    },
    /**
     * 是否是多选
     */
    multi: {
        type: Boolean as PropType<boolean>,
        default: false
    }
};

export type FormItemSelectedPropsType = Readonly<ExtractPropTypes<typeof FormItemSelectedProps>>;

export interface FormItemTheme extends ThemeConfig {
    bemModifiers: string[];
    colors: {
        text: Color;
        border: Color;
        placeholder: Color;
        shadow: Color;
        primary: Color;
    };
    size: {
        gap: string;
        fontSize: string;
        height: string;
        lineHeight: string;
        borderWidth: string;
    };
}

export const FormItemTextEmits = {
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
    }
};

export const obtainFormItemTheme = <T extends FormItemTheme = FormItemTheme>(
    ctx: { props: FormItemCommonPropsType; commonExposed: CommonExposed },
    state: UnwrapNestedRefs<FormItemState>,
    onFlush?: (_theme: T) => T
) => {
    const themeConfig = useTheme();
    const { props, commonExposed } = ctx;
    const { cType__ } = commonExposed;
    const { status, disabled, readonly } = toRefs(state);

    const bemModifiers = computed(() => {
        const modifiers = [];

        if (readonly.value) {
            modifiers.push(`${cType__}--readonly`);
        }

        if (disabled.value) {
            modifiers.push(`${cType__}--disabled`);
        }

        return modifiers;
    });

    const colors = computed(() => {
        const _status = status.value;
        const _readonly = readonly.value;
        const _disabled = disabled.value;
        const _themeConfig = themeConfig.value;
        const _defaultColor = stateColor(_themeConfig, 'default');
        const primaryColor = stateColor(_themeConfig, 'primary');
        const _stateColor = stateColor(_themeConfig, _status === 'default' ? 'primary' : _status);

        let border = _defaultColor.lighter;
        let placeholder = _defaultColor.lighter;
        let text = _themeConfig.ye_colorPrimaryText;

        if (!_disabled) {
            if ('default' !== _status) {
                border = _stateColor.lighter;
                text = _stateColor.primary;
                placeholder = _stateColor.primary;
            }
        }
        const shadow = primaryColor.lighter.lighten(0.6);

        return {
            text,
            border,
            shadow,
            primary: primaryColor.primary,
            placeholder
        };
    });

    const size = computed(() => {
        const _themeConfig = themeConfig.value;
        const height = sizeToComponentHeight(_themeConfig, props.size);
        const lineHeight = sizeToTextLineHeight(_themeConfig, props.size);
        const fontSize = sizeToFontSize(_themeConfig, props.size);
        const gap = sizeToGap(_themeConfig, props.size);
        return {
            gap: `${gap}px`,
            height: `${height}px`,
            lineHeight: `${lineHeight}px`,
            fontSize: `${fontSize}px`,
            borderWidth: '1px'
        };
    });
    return computed(() => {
        const _themeConfig = themeConfig.value;
        const _bemModifiers = bemModifiers.value;
        const _colors = colors.value;
        const _size = size.value;

        const theme = {
            ..._themeConfig,
            colors: _colors,
            size: _size,
            bemModifiers: _bemModifiers
        } as T;

        return onFlush ? onFlush(theme) : theme;
    });
};

export const useFormItemText = <E extends typeof FormItemTextEmits>(ctx: InternalSetupContext<FormItemTextPropsType, E>, state: UnwrapNestedRefs<FormItemState>) => {
    const { props } = ctx;

    const obtainCounter = computed(() => {
        return props.maxLength && props.showCounter ? `${props.modelValue?.toString().length}/${props.maxLength}` : '';
    });

    return {
        obtainCounter
    };
};
