import type { BemClasses } from '../../common/bem';
import type { Theme } from '../../theme';
import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import type { VirtualElement, PopperMode, PopperOffset, PopperBemKeys, PopperPlacement, PopperVariables } from './definition';
declare const _sfc_main: DefineComponent<
    {
        reference: {
            type: PropType<string | Element | VirtualElement>;
        };
        mode: {
            type: PropType<PopperMode>;
            default: string;
        };
        hideOnPopper: {
            type: PropType<boolean>;
            default: boolean;
        };
        hideOnOut: {
            type: PropType<boolean>;
            default: boolean;
        };
        offset: {
            type: PropType<PopperOffset>;
            default(): {
                mainAxis: number;
            };
        };
        placement: {
            type: PropType<PopperPlacement>;
            default: string;
        };
        arrowPlacement: {
            type: PropType<'edge' | 'fit'>;
            default: string;
        };
        shadow: {
            type: PropType<boolean>;
            default: boolean;
        };
        bgColor: {
            type: PropType<string>;
        };
        borderColor: {
            type: PropType<string>;
        };
        id: {
            type: StringConstructor;
        };
        display: {
            type: BooleanConstructor;
            default: boolean;
        };
    },
    {
        el_arrow: Ref<string>;
        popperTo: string;
        popper: Ref<HTMLElement | undefined>;
        arrow: Ref<HTMLElement | undefined>;
        id__: string;
        cType__: string;
        display__: Ref<boolean>;
        refresh__: Ref<boolean>;
        theme: Theme<PopperVariables>;
        bem: BemClasses<PopperBemKeys>;
        block: Ref<string[]>;
        domRefresh: () => void;
    },
    unknown,
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    Record<string, any>,
    string,
    VNodeProps & AllowedComponentProps & ComponentCustomProps,
    Readonly<
        ExtractPropTypes<{
            reference: {
                type: PropType<string | Element | VirtualElement>;
            };
            mode: {
                type: PropType<PopperMode>;
                default: string;
            };
            hideOnPopper: {
                type: PropType<boolean>;
                default: boolean;
            };
            hideOnOut: {
                type: PropType<boolean>;
                default: boolean;
            };
            offset: {
                type: PropType<PopperOffset>;
                default(): {
                    mainAxis: number;
                };
            };
            placement: {
                type: PropType<PopperPlacement>;
                default: string;
            };
            arrowPlacement: {
                type: PropType<'edge' | 'fit'>;
                default: string;
            };
            shadow: {
                type: PropType<boolean>;
                default: boolean;
            };
            bgColor: {
                type: PropType<string>;
            };
            borderColor: {
                type: PropType<string>;
            };
            id: {
                type: StringConstructor;
            };
            display: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>
    >,
    {
        mode: PopperMode;
        display: boolean;
        hideOnPopper: boolean;
        hideOnOut: boolean;
        offset: PopperOffset;
        placement: PopperPlacement;
        arrowPlacement: 'edge' | 'fit';
        shadow: boolean;
    }
>;
export default _sfc_main;
