import { InjectionKey, UnwrapNestedRefs } from 'vue';
export declare type Variables = {
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
    colorBgTransparent: string;
    /** T-shirt尺寸 最小值 */
    sizeXXS: string;
    /** 每个尺寸级别跨度 */
    sizeStep: string;
};
export declare class Theme<Var extends Record<string, string> = {}> {
    /**
     * css变量
     */
    private _vars;
    /**
     * css前缀
     */
    private _prefix;
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
     * @param mountedDom 被挂在的dom节点
     */
    constructor(prefix: string, componentType: string, vars?: Var);
    get vars(): UnwrapNestedRefs<Var>;
    get prefix(): string;
    getVar(name: keyof Var): string;
    setVar(name: keyof Var, value: string): void;
    /**
     * 挂在皮肤到节点
     * @param mountedDom 目标节点
     */
    mountTheme(mountedDom: HTMLElement): void;
}
export declare const ThemeKey: InjectionKey<Theme<{}>>;
