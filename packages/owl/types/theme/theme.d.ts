import { InjectionKey, UnwrapNestedRefs } from 'vue';
export declare type Variables = Record<string, string | undefined>;
export declare type GlobalVariables = {
    fontFamily: string;
    fontRemBaseSize: string;
    /** 文字颜色 */
    colorTextPrimary: string;
    colorTextSecondary: string;
    colorTextLight: string;
    colorTextLightest: string;
    /** 主体色 */
    colorPrimary: string;
    /** 功能色 */
    colorSuccess: string;
    colorWarning: string;
    colorDanger: string;
    colorInfo: string;
    /** 边框色 */
    colorBorderPrimary: string;
    colorBorderSecondary: string;
    colorBorderLight: string;
    colorBorderLightest: string;
    /** 背景色 */
    colorBgOpaque: string;
    colorBgBlack: string;
    colorBgTransparent: string;
    sizeBase: string;
    sizeXxs: string;
    sizeXs: string;
    sizeSm: string;
    sizeMd: string;
    sizeLg: string;
    sizeXl: string;
    sizeXxl: string;
    size1x: string;
    size2x: string;
    size3x: string;
    size4x: string;
    size5x: string;
    size6x: string;
    size7x: string;
    size8x: string;
    size9x: string;
    size10x: string;
    boxShadowHighUp: string;
    boxShadowHighDown: string;
    boxShadowHighLeft: string;
    boxShadowHighRight: string;
    boxShadowMiddleUp: string;
    boxShadowMiddleDown: string;
    boxShadowMiddleLeft: string;
    boxShadowMiddleRight: string;
    boxShadowLowUp: string;
    boxShadowLowDown: string;
    boxShadowLowLeft: string;
    boxShadowLowRight: string;
};
export declare class Theme<V extends Variables> {
    private __originVars;
    /**
     * css变量
     */
    private _vars;
    private _varNames;
    /**
     * 模块类型
     */
    private _componentType;
    /**
     * css变量 key前缀
     */
    private _keyPrefix;
    /**
     *
     * @param prefix var前缀
     * @param vars 主题变量
     */
    constructor(componentType: string, vars?: V);
    get originVars(): UnwrapNestedRefs<{ -readonly [key in keyof V]?: string | undefined }>;
    get vars(): UnwrapNestedRefs<object>;
    get namedVars(): Record<keyof V, string>;
    get varNames(): Record<string, string>;
    mount(dom?: Document | HTMLElement): void;
}
export declare const GlobalThemeKey: InjectionKey<Theme<GlobalVariables>>;
export declare const useTheme: <V extends Variables>(
    componentType: string,
    vars?: V | undefined
) => {
    originVars: UnwrapNestedRefs<{ -readonly [key in keyof V]?: string | undefined }>;
    vars: UnwrapNestedRefs<Record<string, string | undefined>>;
    varNames: Record<string, string>;
};
