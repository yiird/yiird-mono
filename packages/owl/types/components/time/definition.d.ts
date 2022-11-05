import { PropType } from 'vue';
export declare const TimeProps: {
    readonly format: {
        readonly type: PropType<string>;
        readonly default: "yyyy-MM-dd";
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
export declare type TimeVariables = {};
export declare type TimeBemKeys = {
    modifiers: string;
    elements: {};
};
export interface TimeHour {
    hourNum: number;
    isCurrent: boolean;
    text: string;
    classes: Array<string>;
}
export {};
