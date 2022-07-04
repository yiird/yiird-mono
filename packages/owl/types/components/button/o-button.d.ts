import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
import { Theme } from '../../theme';
import type { ButtonSize, ButtonColor, ButtonShape, ButtonMode, ButtonVariables } from './definition';
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
        readonly default: "info";
    };
    readonly textColor: {
        readonly type: PropType<string>;
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
        readonly default: "normal";
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    theme: Theme<ButtonVariables>;
    block: Ref<string[]>;
    elements: Record<"text" | "icon", string[]>;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
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
        readonly default: "info";
    };
    readonly textColor: {
        readonly type: PropType<string>;
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
        readonly default: "normal";
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
    readonly mode: ButtonMode;
    readonly display: boolean;
}>;
export default _sfc_main;
