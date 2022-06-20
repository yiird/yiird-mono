import { InjectionKey, UnwrapNestedRefs } from 'vue';
export declare type Variables = {
    color: string;
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
