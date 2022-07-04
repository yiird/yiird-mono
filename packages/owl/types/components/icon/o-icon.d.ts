import type { DefineComponent, PropType, ComputedRef, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { Theme } from '../../theme';
import type { IconPrefix, IconSize, IconRotation, IconFlip, IconAnimation, IconAnimationOptions, IconVariables } from './definition';
/**
 * Button使用
 * @name OIcon
 */
declare const _sfc_main: DefineComponent<{
    readonly prefix: {
        readonly type: PropType<IconPrefix>;
        readonly default: "fas";
    };
    readonly icon: {
        readonly type: PropType<string>;
        readonly required: true;
    };
    readonly size: {
        readonly type: PropType<IconSize>;
        readonly default: "md";
    };
    readonly fixedWidth: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly rotation: {
        readonly type: PropType<IconRotation>;
        readonly default: null;
    };
    readonly flip: {
        readonly type: PropType<IconFlip>;
    };
    readonly animation: {
        readonly type: PropType<IconAnimation>;
    };
    readonly animationOptions: {
        readonly type: PropType<IconAnimationOptions>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    obtainPrefix: ComputedRef<IconPrefix>;
    obtainIcon: ComputedRef<string>;
    obtainSize: ComputedRef<IconSize>;
    obtainFixedWidth: ComputedRef<boolean>;
    obtainRotation: ComputedRef<IconRotation>;
    obtainFlip: ComputedRef<IconFlip | undefined>;
    obtainFaClasses: ComputedRef<string>;
    obtainAnimationOptions: ComputedRef<Record<string, string>>;
    theme: Theme<IconVariables>;
    block: Ref<string[]>;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    domRefresh: () => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly prefix: {
        readonly type: PropType<IconPrefix>;
        readonly default: "fas";
    };
    readonly icon: {
        readonly type: PropType<string>;
        readonly required: true;
    };
    readonly size: {
        readonly type: PropType<IconSize>;
        readonly default: "md";
    };
    readonly fixedWidth: {
        readonly type: PropType<boolean>;
        readonly default: false;
    };
    readonly rotation: {
        readonly type: PropType<IconRotation>;
        readonly default: null;
    };
    readonly flip: {
        readonly type: PropType<IconFlip>;
    };
    readonly animation: {
        readonly type: PropType<IconAnimation>;
    };
    readonly animationOptions: {
        readonly type: PropType<IconAnimationOptions>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    readonly size: IconSize;
    readonly display: boolean;
    readonly fixedWidth: boolean;
    readonly rotation: IconRotation;
    readonly prefix: IconPrefix;
}>;
export default _sfc_main;
