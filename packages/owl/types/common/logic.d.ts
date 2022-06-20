import { ExtractPropTypes, Ref, SetupContext } from 'vue';
import { Theme } from '../theme/theme';
import { BemClasses } from './bem';
export declare const BaseProps: {
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
/**
 * 组件setup预制方法参数定义
 */
export declare type OCommonOptions<P, V extends Record<string, string>, E extends ReadonlyArray<string>> = {
    props: Readonly<ExtractPropTypes<P>>;
    ctx: SetupContext;
    cssVars?: V;
    elements?: E;
};
export declare type OCommonPrefab<V extends Record<string, string>, E extends ReadonlyArray<string>> = {
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem__: BemClasses<E>;
    theme__: Theme<V>;
    domRefresh: () => void;
};
export declare const useCommon: <V extends Record<string, string>, E extends readonly string[]>(options: OCommonOptions<{
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, V, E>) => OCommonPrefab<V, E>;
export {};
