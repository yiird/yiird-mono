import type { BemClasses, BemKeys } from '../../common/bem';
import type { Theme, Variables } from '../../theme';
import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import type { VirtualElement, PopperMode, PopperOffset, PopperPlacement } from './definition';
declare const _sfc_main: DefineComponent<{
    reference: {
        type: PropType<string | Element | VirtualElement>;
    };
    mode: {
        type: PropType<PopperMode>;
        default: string;
    };
    offset: {
        type: PropType<PopperOffset>;
    };
    placement: {
        type: PropType<PopperPlacement>;
    };
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    popperTo: string;
    popper: Ref<HTMLElement | undefined>;
    show: () => void;
    hide: () => void;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    theme: Theme<Variables>;
    bem: BemClasses<BemKeys>;
    block: Ref<string[]>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    reference: {
        type: PropType<string | Element | VirtualElement>;
    };
    mode: {
        type: PropType<PopperMode>;
        default: string;
    };
    offset: {
        type: PropType<PopperOffset>;
    };
    placement: {
        type: PropType<PopperPlacement>;
    };
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    mode: PopperMode;
    display: boolean;
}>;
export default _sfc_main;
