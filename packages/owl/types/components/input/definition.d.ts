import { IconName } from '@fortawesome/fontawesome-svg-core';
import { PropType } from 'vue';
export declare const InputProps: {
    /**
     * 输入类型
     */
    readonly type: {
        readonly type: PropType<"date" | "text" | "password" | "time" | "datetime">;
        readonly default: "text";
    };
    /**
     * 提示语
     */
    readonly placeholder: {
        readonly type: PropType<string>;
    };
    /**
     * 文本域前缀图标
     */
    readonly prefix: {
        readonly type: PropType<IconName>;
    };
    /**
     * 文本域后缀图标
     */
    readonly suffix: {
        readonly type: PropType<IconName>;
    };
    /**
     * 前缀文本
     */
    readonly prefixText: {
        readonly type: PropType<string>;
    };
    /**
     * 后缀文本
     */
    readonly suffixText: {
        readonly type: PropType<string>;
    };
    /**
     * 输入的值，绑定前缀、后缀或两者的文本
     */
    readonly bind: {
        readonly type: PropType<"prefix" | "all" | "suffix">;
    };
    /**
     * 圆角
     */
    readonly radius: {
        readonly type: PropType<number | boolean>;
        readonly default: true;
    };
    /**
     * 加载状态
     */
    readonly loading: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /**
     * 禁用状态
     */
    readonly disabled: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /**
     * 禁用状态
     */
    readonly readonly: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    /**
     * @private
     */
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
};
export declare type InputVariables = {
    color?: string;
    placeholderColor?: string;
    lineHeight?: string;
    borderColor?: string;
    prefixBgColor?: string;
    suffixBgColor?: string;
    radius?: string;
};
export declare type InputBemKeys = {
    modifiers: 'radius' | 'state-success' | 'state-warning' | 'state-danger';
    elements: {
        input: string;
        prefix: string;
        suffix: string;
        remove: string;
        password: 'show';
        loading: string;
    };
};
export interface EventBinding {
    /**
     * Dom事件对象
     */
    event: Event;
    /**
     * 组件值
     */
    value: unknown;
}
export {};
