import { ExtractPropTypes, Ref, SetupContext } from 'vue';
import { Theme } from '../theme/theme';
import { BemClasses, BemKeys } from './bem';
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
export declare type OCommonOptions<P, V extends Record<string, string>, B extends BemKeys> = {
    props: Readonly<ExtractPropTypes<P>>;
    ctx: SetupContext;
    bemKeys: B;
    cssVars?: V;
};
export declare type OCommonPrefab<V extends Record<string, string>, B extends BemKeys> = {
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    bem__: BemClasses<B>;
    theme__: Theme<V>;
    domRefresh: () => void;
};
export declare const useCommon: <V extends Record<string, string>, B extends BemKeys>(options: OCommonOptions<{
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
}, V, B>) => OCommonPrefab<V, B>;
export {};
