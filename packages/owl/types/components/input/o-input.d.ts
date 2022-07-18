import type { BemClasses } from '../../common/bem';
import type { Theme } from '../../theme';
import type { IconName } from '@fortawesome/fontawesome-common-types';
import type { DefineComponent, PropType, Ref, WritableComputedRef, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { InputBemKeys, InputVariables } from './definition';
/**
 * :::warning 功能描述
 * 此组件为文本域组件，[查看样例](/examples/text)。
 *
 * 1、可用`v-model`进行数据绑定
 *
 * 2、支持前、后缀图标和文本
 *
 * 3、支持前、后缀文本绑定到值
 *
 * 4、支持表单内使用、表格内使用、单独使用
 *
 * 5、支持数据校验
 *
 * 6、支持类型复原，比如输入字符串为数字，绑定值会转化为数字类型；输入字符串为boolean，绑定值会转化为boolean类型，undefined会转为null
 *
 * 7、支持输入类型：文本类型🟢、密码模式🟢、日期模式🔴、日期时间模式🔴、时间模式🔴
 * :::
 *
 * ## Css 变量
 *
 * `--o-input-color` 字体颜色
 *
 * `--o-input-placeholder-color` 提示语颜色
 *
 * `--o-input-line-height` 行高
 *
 * `--o-input-border-color` 边框颜色
 *
 * `--o-input-prefix-bg-color` 前缀背景色
 *
 * `--o-input-suffix-bg-color` 后缀背景色
 */
declare const _sfc_main: DefineComponent<{
    readonly type: {
        readonly type: PropType<"date" | "text" | "password" | "time" | "datetime">;
        readonly default: "text";
    };
    readonly placeholder: {
        readonly type: PropType<string>;
    };
    readonly prefix: {
        readonly type: PropType<IconName>;
    };
    readonly suffix: {
        readonly type: PropType<IconName>;
    };
    readonly prefixText: {
        readonly type: PropType<string>;
    };
    readonly suffixText: {
        readonly type: PropType<string>;
    };
    readonly bind: {
        readonly type: PropType<"prefix" | "all" | "suffix">;
    };
    readonly radius: {
        readonly type: PropType<number | boolean>;
        readonly default: true;
    };
    readonly loading: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly disabled: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly readonly: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly modelValue: {
        readonly type: PropType<string>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    theme: Theme<InputVariables>;
    block: Ref<string[]>;
    el_prefix: Ref<string>;
    el_suffix: Ref<string>;
    el_input: Ref<string>;
    el_password: Ref<string>;
    el_remove: Ref<string>;
    el_loading: Ref<string>;
    obtainValue: WritableComputedRef<unknown>;
    obtainPlaceholder: ComputedRef<string | undefined>;
    obtainHasPrefix: ComputedRef<string | true | undefined>;
    obtainHasSuffix: ComputedRef<string | boolean | undefined>;
    obtainPrefixIcon: ComputedRef<{
        icon: IconName;
    } | undefined>;
    obtainSuffixIcon: ComputedRef<{
        icon: IconName;
    } | undefined>;
    obtainPrefixText: ComputedRef<string | undefined>;
    obtainSuffixText: ComputedRef<string | undefined>;
    obtainPasswordEye: ComputedRef<"eye" | "eye-slash">;
    obtainType: ComputedRef<"text" | "password">;
    obtainLoading: ComputedRef<boolean>;
    obtainDisabled: ComputedRef<boolean>;
    obtainReadonly: ComputedRef<boolean>;
    onBlur: (e: FocusEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onPrefixIconClick: (e: PointerEvent) => void;
    onSuffixIconClick: (e: PointerEvent) => void;
    onPasswordEyeClick: () => void;
    onRemoveClick: () => void;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem: BemClasses<InputBemKeys>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("update:modelValue" | "blur" | "focus" | "click-suffix-icon" | "click-prefix-icon")[], "update:modelValue" | "blur" | "focus" | "click-suffix-icon" | "click-prefix-icon", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly type: {
        readonly type: PropType<"date" | "text" | "password" | "time" | "datetime">;
        readonly default: "text";
    };
    readonly placeholder: {
        readonly type: PropType<string>;
    };
    readonly prefix: {
        readonly type: PropType<IconName>;
    };
    readonly suffix: {
        readonly type: PropType<IconName>;
    };
    readonly prefixText: {
        readonly type: PropType<string>;
    };
    readonly suffixText: {
        readonly type: PropType<string>;
    };
    readonly bind: {
        readonly type: PropType<"prefix" | "all" | "suffix">;
    };
    readonly radius: {
        readonly type: PropType<number | boolean>;
        readonly default: true;
    };
    readonly loading: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly disabled: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly readonly: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly modelValue: {
        readonly type: PropType<string>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    "onClick-suffix-icon"?: ((...args: any[]) => any) | undefined;
    "onClick-prefix-icon"?: ((...args: any[]) => any) | undefined;
}, {
    readonly type: "date" | "text" | "password" | "time" | "datetime";
    readonly disabled: boolean;
    readonly display: boolean;
    readonly radius: number | boolean;
    readonly loading: boolean;
    readonly readonly: boolean;
}>;
export default _sfc_main;
