import { PropType } from 'vue';
export declare const props: {
    /**
     * 尺寸
     */
    readonly size: {
        readonly type: PropType<"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl">;
        readonly default: "md";
        readonly validator: (value: string) => boolean;
    };
    /**
     * 颜色
     */
    readonly color: {
        readonly type: PropType<"default" | "primary" | "success" | "warning" | "danger">;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    /**
     * 形状可选
     */
    readonly shape: {
        readonly type: PropType<"rectangle" | "circle" | "square" | "ellipse">;
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
        readonly type: PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
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
export declare const elements: readonly ["text"];
