import type { DefineComponent, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { Theme } from '../../theme';
import { MainVariables } from './definition';
declare const _sfc_main: DefineComponent<{
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    theme: Theme<MainVariables>;
    block: Ref<string[]>;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    readonly display: boolean;
}>;
export default _sfc_main;
