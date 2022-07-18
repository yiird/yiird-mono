import { ExtractPropTypes, InjectionKey, Ref } from 'vue';
import { Theme, Variables } from '../theme';
import { BemClasses, BemKeys } from './bem';
export declare const BaseProps: {
    /**
     * 组件id，若不设置会自动生成
     */
    id: {
        type: StringConstructor;
    };
    /**
     * 显示隐藏
     */
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type OCommonPrefab<V extends Variables, B extends BemKeys> = {
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    theme: Theme<V>;
    bem: BemClasses<B>;
    block: Ref<string[]>;
    domRefresh: () => void;
};
export declare const usePrefab: <V extends Variables, B extends BemKeys = BemKeys>(props: ExtractPropTypes<typeof BaseProps>) => OCommonPrefab<V, B>;
export declare const GlobalPopperWrapKey: InjectionKey<string>;
export {};
