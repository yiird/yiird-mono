import { OThemeColor, OThemeSize } from './types';
/**
 * 复杂对象说明
 */
interface User {
    /**
     * 姓名
     */
    name: string;
    /**
     * 年龄
     */
    age: number;
}
/**
 * 对象描述
 */
interface AdvanceType {
    /**
     * 属性a描述
     */
    a: Array<User>;
    /**
     * 属性b描述
     */
    b: number;
}
export declare const ButtonProps: {
    /**
     * 尺寸
     * @prop
     * @values `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
     */
    readonly size: {
        readonly type: PropType<OThemeSize>;
        readonly required: true;
        readonly default: "md";
        readonly validator: (value: string) => boolean;
    };
    /**
     * 颜色
     * @prop
     * @values `default`, `primary`, `success`, `warning`, `danger`
     */
    readonly color: {
        readonly type: PropType<OThemeColor>;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    /**
     * 形状可选
     * @prop
     * @values `circle` 圆形, `square` 正方形, `ellipse` 椭圆形
     */
    readonly shape: {
        readonly type: StringConstructor;
    };
    /**
     * 是否禁用按钮
     * @prop
     */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 模式
     * @values `light` 模式1,`empty` 模式2,`link` 模式3
     */
    readonly mode: {
        readonly type: PropType<"light" | "empty" | "link">;
        readonly validator: (value: string) => boolean;
    };
    /**
     * 复杂prop举例
     *
     * @default
     * {
     *  // a 说明
     * 	a:[{
     * 		name:'a',
     * 		age:1
     * 	}],
     * 	b:2
     * }
     */
    readonly obj: {
        readonly type: PropType<AdvanceType>;
        readonly default: () => {
            a: number;
            b: number;
        };
    };
    readonly id: PropType<string>;
    readonly display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
export {};
