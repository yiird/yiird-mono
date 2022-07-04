import { PropType } from 'vue';
import { NumberSize, TshirtSize } from '../../common/type';
export declare type ButtonShape = `rectangle` | `circle` | `square` | `ellipse`;
export declare type ButtonColor = `info` | `primary` | `success` | `warning` | `danger`;
export declare type ButtonSize = TshirtSize | NumberSize;
export declare type ButtonMode = 'normal' | 'light' | 'empty' | 'link' | 'apple';
export declare type ButtonVariables = {
    bgColor: string;
    textColor: string;
};
export declare const ButtonProps: {
    /**
     * 尺寸
     */
    readonly size: {
        readonly type: PropType<ButtonSize>;
        readonly default: "md";
    };
    /**
     * 颜色
     */
    readonly color: {
        readonly type: PropType<ButtonColor>;
        readonly default: "info";
    };
    /**
     * 文本颜色
     */
    readonly textColor: {
        readonly type: PropType<string>;
    };
    /**
     * 形状可选
     */
    readonly shape: {
        readonly type: PropType<ButtonShape>;
        readonly default: "rectangle";
    };
    /**
     * 是否禁用按钮
     */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 模式
     */
    readonly mode: {
        readonly type: PropType<ButtonMode>;
        readonly default: "normal";
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type ButtonBemKeys = {
    modifiers: 'shape-rectangle' | 'shape-circle' | 'shape-square' | 'shape-ellipse' | 'mode-light' | 'mode-empty' | 'mode-link' | 'state-hover' | 'state-active' | 'state-disabled';
    elements: {
        text: string;
        icon: string;
    };
};
