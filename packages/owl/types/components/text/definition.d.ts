import { IconName } from '@fortawesome/fontawesome-svg-core';
import { PropType } from 'vue';
export declare const TextProps: {
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
        readonly type: PropType<'prefix' | 'all' | 'suffix'>;
    };
    /**
     * 圆角
     */
    readonly radius: {
        readonly type: PropType<number | boolean>;
        readonly default: true;
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
export declare type TextVariables = {
    color?: string;
    placeholderColor?: string;
    lineHeight?: string;
    borderColor?: string;
    prefixBgColor?: string;
    suffixBgColor?: string;
    radius?: string;
};
export declare type TextBemKeys = {
    modifiers: 'radius' | 'state-success' | 'state-warning' | 'state-danger';
    elements: {
        input: string;
        prefix: string;
        suffix: string;
    };
};
export interface EventBinding {
    event: UIEvent;
    value: unknown;
}
export {};
