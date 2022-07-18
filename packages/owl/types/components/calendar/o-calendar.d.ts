import type { TranslateOptions } from './vue-i18n/dist/vue-i18n.runtime.esm-bundler.js';
import type { BemClasses } from '../../common/bem';
import type { Theme } from '../../theme';
import type { DefineComponent, PropType, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { CalendarBemKeys, CalendarDay, CalendarMonth, CalendarVariables, CalendarWeek, CalendarYear } from './definition';
/**
 * 日历
 */
declare const _sfc_main: DefineComponent<{
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
}, {
    block: Ref<string[]>;
    el_mainWrap: Ref<string>;
    el_yearWrap: Ref<string>;
    el_yearItem: Ref<string>;
    el_monthWrap: Ref<string>;
    el_monthItem: Ref<string>;
    el_selectorWrap: Ref<string>;
    el_selectorButton: Ref<string>;
    el_selectorText: Ref<string>;
    el_weekWrap: Ref<string>;
    el_weekItem: Ref<string>;
    el_daysWrap: Ref<string>;
    el_daysItem: Ref<string>;
    el_currentText: Ref<string>;
    theme: Theme<CalendarVariables>;
    obtainYear: ComputedRef<number>;
    obtainMonth: ComputedRef<number>;
    obtainDays: ComputedRef<CalendarDay[]>;
    obtainYears: ComputedRef<CalendarYear[]>;
    obtainMonths: ComputedRef<CalendarMonth[]>;
    obtainWeeks: ComputedRef<CalendarWeek[]>;
    isYearSelector: Ref<boolean>;
    isMonthSelector: Ref<boolean>;
    yearRangeStart: Ref<number>;
    openSelectYear: () => void;
    openSelectMonth: () => void;
    onHeavyPrev: () => void;
    onHeavyNext: () => void;
    onPrev: () => void;
    onNext: () => void;
    onSelectDay: (_day: CalendarDay) => void;
    onSelectYear: (_year: CalendarYear) => void;
    onSelectMonth: (_month: CalendarMonth) => void;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem: BemClasses<CalendarBemKeys>;
    domRefresh: () => void;
    t: {
        (key: string | number): string;
        (key: string | number, plural: number, options?: TranslateOptions | undefined): string;
        (key: string | number, defaultMsg: string, options?: TranslateOptions | undefined): string;
        (key: string | number, list: unknown[], options?: TranslateOptions | undefined): string;
        (key: string | number, list: unknown[], plural: number): string;
        (key: string | number, list: unknown[], defaultMsg: string): string;
        (key: string | number, named: Record<string, unknown>, options?: TranslateOptions | undefined): string;
        (key: string | number, named: Record<string, unknown>, plural: number): string;
        (key: string | number, named: Record<string, unknown>, defaultMsg: string): string;
    };
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("selected-year" | "selected-month" | "selected-day")[], "selected-year" | "selected-month" | "selected-day", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
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
}>> & {
    "onSelected-year"?: ((...args: any[]) => any) | undefined;
    "onSelected-month"?: ((...args: any[]) => any) | undefined;
    "onSelected-day"?: ((...args: any[]) => any) | undefined;
}, {
    readonly display: boolean;
    readonly value: string | Date;
}>;
export default _sfc_main;
