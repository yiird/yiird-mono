declare const _default: import("vue").DefineComponent<{
    readonly size: {
        readonly type: import("vue").PropType<string | 1>;
        readonly default: "md";
        readonly required: true;
        readonly validator: (value: string) => boolean;
    };
    readonly color: {
        readonly type: import("vue").PropType<import("../..").OThemeColor>;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    readonly shape: {
        readonly type: StringConstructor;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: import("vue").PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
    };
    readonly id: import("vue").PropType<string>;
    readonly display: {
        readonly type: import("vue").PropType<boolean>;
        readonly default: true;
    };
}, {
    rootRef: import("vue").Ref<HTMLButtonElement | null>;
    obtainText: import("vue").Ref<string | undefined>;
    aa: boolean;
    addClass: (cls: string | import("vue").Ref<any> | (string | import("vue").Ref<any>)[] | Record<string, boolean>) => void;
    cssVar: (name: string, value: unknown, prefix?: boolean | undefined) => void;
    domRefresh: () => void;
    cType__: string;
    id__: string;
    cssVars__?: Record<string, unknown> | undefined;
    class__?: string[] | undefined;
    display__: import("vue").ComputedRef<boolean>;
    refresh__: import("vue").Ref<boolean>;
    bemModifier__: (cls: string) => string;
    bemElement__: (cls: string) => string;
}, unknown, {}, {
    fn1(): string | number | undefined;
    /**
     * 中国人最牛逼
     * @param {string} <a=str> A的描述
     * @param {number} b - B的描述
     * @returns {string,string} 加那那那
     */
    fn2: (a: string, b: number | string) => null;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("aa" | "bb")[], "aa" | "bb", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly size: {
        readonly type: import("vue").PropType<string | 1>;
        readonly default: "md";
        readonly required: true;
        readonly validator: (value: string) => boolean;
    };
    readonly color: {
        readonly type: import("vue").PropType<import("../..").OThemeColor>;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    readonly shape: {
        readonly type: StringConstructor;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: import("vue").PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
    };
    readonly id: import("vue").PropType<string>;
    readonly display: {
        readonly type: import("vue").PropType<boolean>;
        readonly default: true;
    };
}>> & {
    onAa?: ((...args: any[]) => any) | undefined;
    onBb?: ((...args: any[]) => any) | undefined;
}, {
    size: string | 1;
    color: import("../..").OThemeColor;
    disabled: boolean;
    display: boolean;
}>;
/**
 * 按钮组件
 * ddddd
 * dddddddd
 */
export default _default;
//# sourceMappingURL=o-button.vue.d.ts.map