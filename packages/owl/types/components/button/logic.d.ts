import { PropType } from 'vue';
export declare const props: {
    readonly name: {
        readonly type: PropType<"aaa" | "bbb">;
        readonly default: "aaa";
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
