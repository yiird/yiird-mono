import { Ref } from 'vue';
/**
 * @public
 */
export declare type ClsType = undefined | string | Array<string | Ref> | Record<string, boolean> | Ref;
/**
 * 给组件添加类样式，必须在组件实例上或者setup中调用
 * 当在setup或生命周期函数中调用用是可以传入响应式的数据
 * @public
 * @typeParam ClsType - the type of the items in the collection
 * @param cls - 样式表
 */
export declare const addClass: (this: void | unknown, cls: ClsType | ClsType[]) => void;
/**
 * @internal
 */
export declare const _cssVar: (this: void | unknown, name: string, value: unknown, prefix?: boolean) => void;
//# sourceMappingURL=dom.d.ts.map