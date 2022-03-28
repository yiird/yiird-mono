import { PropType } from 'vue';
import { OThemeColor } from '../../types/base-define';
export * as B from '../../types/base-define';
/**
 * @public
 */
export declare const ButtonProps: {
    /**
     * 尺寸
     * @prop
     * @values - `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
     */
    readonly size: {
        readonly type: PropType<string | 1>;
        readonly default: "md";
        readonly required: true;
        readonly validator: (value: string) => boolean;
    };
    /**
     * 颜色
     * @prop
     * @values - `default`, `primary`, `success`, `warning`, `danger`
     */
    readonly color: {
        readonly type: PropType<OThemeColor>;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    /**
     * 形状可选
     * @prop
     * @values - `circle` 圆形, `square` 正方形, `ellipse` 椭圆形
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
     * @prop
     * @values - `light` `empty` `link`
     */
    readonly mode: {
        readonly type: PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
    };
    readonly id: PropType<string>;
    readonly display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
//# sourceMappingURL=o-button-props.d.ts.map