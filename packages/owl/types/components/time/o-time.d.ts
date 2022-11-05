import type { BemClasses } from '../../common/bem';
import type { Theme } from '../../theme';
import type { DefineComponent, PropType, ComputedRef, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { TimeBemKeys, TimeHour, TimeVariables } from './definition';
declare const _sfc_main: DefineComponent<{
    readonly format: {
        readonly type: PropType<string>;
        readonly default: "yyyy-MM-dd";
    };
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
}, {
    obtainHH: ComputedRef<TimeHour[]>;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    theme: Theme<TimeVariables>;
    bem: BemClasses<TimeBemKeys>;
    block: Ref<string[]>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly format: {
        readonly type: PropType<string>;
        readonly default: "yyyy-MM-dd";
    };
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
}>>, {
    readonly display: boolean;
    readonly format: string;
}>;
export default _sfc_main;
