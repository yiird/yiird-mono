import type { Theme } from '../../theme';
import type { BemClasses } from '../../common/bem';
import type { DefineComponent, PropType, Ref, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue';
declare const _sfc_main: DefineComponent<{
    readonly size: {
        readonly type: PropType<"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl">;
        readonly default: "md";
        readonly validator: (value: string) => boolean;
    };
    readonly color: {
        readonly type: PropType<"default" | "primary" | "success" | "warning" | "danger">;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    readonly shape: {
        readonly type: PropType<"rectangle" | "circle" | "square" | "ellipse">;
        readonly default: "rectangle";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
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
    el_text: Ref<string[]>;
    domRefresh: () => void;
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem__: BemClasses<readonly ["text"]>;
    theme__: Theme<{
        readonly a: "1";
        readonly b: "b";
    }>;
}, unknown, {}, {
    doClick(): void;
}, ComponentOptionsMixin, ComponentOptionsMixin, Record<string, any>, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly size: {
        readonly type: PropType<"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl">;
        readonly default: "md";
        readonly validator: (value: string) => boolean;
    };
    readonly color: {
        readonly type: PropType<"default" | "primary" | "success" | "warning" | "danger">;
        readonly default: "default";
        readonly validator: (value: string) => boolean;
    };
    readonly shape: {
        readonly type: PropType<"rectangle" | "circle" | "square" | "ellipse">;
        readonly default: "rectangle";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mode: {
        readonly type: PropType<"link" | "light" | "empty">;
        readonly validator: (value: string) => boolean;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    readonly color: "default" | "primary" | "success" | "warning" | "danger";
    readonly size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    readonly shape: "rectangle" | "circle" | "square" | "ellipse";
    readonly disabled: boolean;
    readonly display: boolean;
}>;
export default _sfc_main;
