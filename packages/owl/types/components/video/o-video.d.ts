import type { BemClasses } from '../../common/bem';
import type { Theme } from '../../theme';
import type { DefineComponent, PropType, Ref, ComputedRef, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { VideoBemKeys, VideoVariables } from './definition';
declare const _sfc_main: DefineComponent<
    {
        readonly src: {
            readonly type: PropType<string>;
        };
        readonly id: {
            type: StringConstructor;
        };
        readonly display: {
            type: BooleanConstructor;
            default: boolean;
        };
    },
    {
        el_video: Ref<string>;
        el_control: Ref<string>;
        el_options: Ref<string>;
        el_optionsLeft: Ref<string>;
        el_optionsRight: Ref<string>;
        el_switch: Ref<string>;
        el_timer: Ref<string>;
        el_progress: Ref<string>;
        el_progressBuffer: Ref<string>;
        el_progressCurrent: Ref<string>;
        el_progressBar: Ref<string>;
        sliderX: Ref<number>;
        obtainSwitchIcon: ComputedRef<'pause' | 'play'>;
        resolutionDom: Ref<any>;
        speedDom: Ref<any>;
        volumeDom: Ref<any>;
        fullScreenDom: Ref<any>;
        onMouseOver: (e: MouseEvent) => void;
        onSelected: (e: MouseEvent) => void;
        play: () => void;
        id__: string;
        cType__: string;
        display__: Ref<boolean>;
        refresh__: Ref<boolean>;
        theme: Theme<VideoVariables>;
        bem: BemClasses<VideoBemKeys>;
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
            readonly src: {
                readonly type: PropType<string>;
            };
            readonly id: {
                type: StringConstructor;
            };
            readonly display: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>
    >,
    {
        readonly display: boolean;
    }
>;
export default _sfc_main;
