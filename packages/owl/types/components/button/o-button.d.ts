import type { Theme } from '../../theme';
import type { BemClasses } from '../../common/bem';
import type { ButtonSize, ButtonColor, ButtonShape, ButtonMode } from './type';
import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
/**
 * Button使用
 * @name OButton
 */
declare const _sfc_main: DefineComponent<{
    readonly size: {
        readonly type: PropType<ButtonSize>;
        readonly default: "md";
    };
    readonly color: {
        readonly type: PropType<ButtonColor>;
        readonly default: "default";
    };
    readonly shape: {
        readonly type: PropType<ButtonShape>;
        readonly default: "rectangle";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: PropType<ButtonMode>;
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
    elements: Record<"text" | "icon", string[]>;
    domRefresh2: () => void;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem__: BemClasses<{
        readonly modifiers: readonly ["shape-rectangle", "shape-circle", "shape-square", "shape-ellipse", "state-hover", "state-active", "state-disabled"];
        readonly elements: {
            readonly text: readonly [];
            readonly icon: readonly [];
        };
    }>;
    theme__: Theme<{
        readonly a: "1";
        readonly b: "b";
    }>;
    domRefresh: () => void;
}, unknown, {}, {
    doClick(): void;
}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly size: {
        readonly type: PropType<ButtonSize>;
        readonly default: "md";
    };
    readonly color: {
        readonly type: PropType<ButtonColor>;
        readonly default: "default";
    };
    readonly shape: {
        readonly type: PropType<ButtonShape>;
        readonly default: "rectangle";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: PropType<ButtonMode>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    readonly size: ButtonSize;
    readonly color: ButtonColor;
    readonly shape: ButtonShape;
    readonly disabled: boolean;
    readonly display: boolean;
}>;
export default _sfc_main;
