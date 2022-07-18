import type { BemClasses, BemKeys } from '../../common/bem';
import type { HeaderVariables } from './definition';
import type { Theme } from '../../theme';
import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{
    readonly height: {
        readonly type: PropType<string>;
        readonly default: "5rem";
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    theme: Theme<HeaderVariables>;
    block: Ref<string[]>;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem: BemClasses<BemKeys>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly height: {
        readonly type: PropType<string>;
        readonly default: "5rem";
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
    readonly height: string;
}>;
export default _sfc_main;
