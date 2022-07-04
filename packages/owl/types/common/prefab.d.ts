import { ExtractPropTypes, Ref, SetupContext } from 'vue';
import { Variables } from '../theme/theme';
import { BemKeys } from './bem';
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
export declare type OCommonOptions<P> = {
    props: Readonly<ExtractPropTypes<P>>;
    ctx: SetupContext;
};
export declare type OCommonPrefab = {
    id__: string;
    cType__: string;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    domRefresh: () => void;
};
export declare const usePrefab: <V extends Variables, B extends BemKeys>(options: OCommonOptions<typeof BaseProps>) => OCommonPrefab;
export {};
