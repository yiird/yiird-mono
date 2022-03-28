import { ComponentPublicInstance, ComputedRef, ExtractPropTypes, Ref } from 'vue';
/**
 * 组件实例挂载预制，每个owl组件都可以this.来获取调用一下参数或方法
 * @public
 */
export declare type OPrefabExpose = {
    addClass: (cls: string | Array<string | Ref> | Record<string, boolean> | Ref) => void;
    cssVar: (name: string, value: unknown, prefix?: boolean) => void;
    domRefresh: () => void;
};
/**
 * 组件实例挂载预制，每个owl组件都可以this.来获取调用一下参数或方法
 * @internal
 */
export declare type OPrefabPrivate = {
    cType__: string;
    id__: string;
    cssVars__?: Record<string, unknown>;
    class__?: Array<string>;
    display__: ComputedRef<boolean>;
    refresh__: Ref<boolean>;
    bemModifier__: (cls: string) => string;
    bemElement__: (cls: string) => string;
};
export declare type ORawBinding<E = Record<string, unknown>, P = Record<string, unknown>> = E & P & OPrefabExpose & OPrefabPrivate;
/**
 * owl组件实例定义
 * @public
 */
export declare type OComponentInstance<Props = Record<string, unknown>, RawBinding extends ORawBinding = ORawBinding> = ComponentPublicInstance<Props, RawBinding>;
export declare type OPropsType<T> = Readonly<ExtractPropTypes<T>>;
/**
 * @public
 */
export declare type OResponsive = {
    xs: number | string;
    sm: number | string;
    md: number | string;
    lg: number | string;
    xl: number | string;
    xxl: number | string;
};
/**
 * @public
 */
export declare type OThemeSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
/**
 * @public
 */
export declare type OThemeColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';
/**
 * 间距
 * h水平方向，v垂直方向
 * @public
 */
export declare type OGutter = {
    h: number | string;
    v: number | string;
};
export default OGutter;
export declare const user = 111;
//# sourceMappingURL=base-define.d.ts.map