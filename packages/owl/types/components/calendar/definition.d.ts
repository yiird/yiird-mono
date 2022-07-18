import { PropType } from 'vue';
export declare const CalendarProps: {
    /**
     * 初始化日期
     *
     * @values
     * @default 'new Date()'
     */
    readonly value: {
        readonly type: PropType<string | Date>;
        readonly default: () => Date;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type CalendarVariables = {};
export declare type CalendarBemKeys = {
    modifiers: string;
    elements: {
        mainWrap: string;
        selectorWrap: string;
        selectorButton: string;
        selectorText: string;
        weekWrap: string;
        weekItem: string;
        weekItemText: string;
        daysWrap: string;
        daysItem: string;
        daysItemText: string;
        yearWrap: string;
        yearItem: string;
        yearItemText: string;
        monthWrap: string;
        monthItem: string;
        monthItemText: string;
        currentText: string;
    };
};
export interface CalendarDay {
    date: Date;
    dateNum: number;
    isCurrent: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    classes: Array<string>;
}
export interface CalendarYear {
    yearNum: number;
    isCurrent: boolean;
    classes: Array<string>;
}
export interface CalendarMonth {
    monthNum: number;
    isCurrent: boolean;
    shortText: string;
    longText: string;
    classes: Array<string>;
}
export interface CalendarWeek {
    weekNum: number;
    shortText: string;
    longText: string;
    classes: Array<string>;
}
export interface CalendarEventBinding {
    date: Date;
    type: 'year' | 'month' | 'day';
    value: number;
}
export {};
