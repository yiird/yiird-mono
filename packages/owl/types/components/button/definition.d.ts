import { PropType } from 'vue';
import { ButtonColor, ButtonMode, ButtonShape, ButtonSize } from './type';
export declare const props: {
    /**
     * 尺寸
     * @values `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , `xxl`
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
        readonly default: "default";
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
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const cssVars: {
    readonly a: "1";
    readonly b: "b";
};
export declare const bemKeys: {
    readonly modifiers: readonly ["shape-rectangle", "shape-circle", "shape-square", "shape-ellipse", "state-hover", "state-active", "state-disabled"];
    readonly elements: {
        readonly text: readonly [];
        readonly icon: readonly [];
    };
};
