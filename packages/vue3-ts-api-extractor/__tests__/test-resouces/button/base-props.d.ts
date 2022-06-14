export declare const BaseProps: {
    /**
     * 组件ID
     * @prop
     */
    readonly id: PropType<string>;
    /**
     * 显示 or 隐藏
     * @prop
     */
    readonly display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
export declare const FormItemProps: {
    name: {
        type: PropType<string>;
        default: boolean;
    };
    value: PropType<string | number | boolean | []>;
    id: PropType<string>;
    display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
