import { Ref } from 'vue';
declare type ClsType = undefined | string | Array<string | Ref> | Record<string, boolean> | Ref;
/**
 * 给组件添加类样式，必须在组件实例上或者setup中调用
 * 当在setup或生命周期函数中调用用是可以传入响应式的数据
 * @public
 * @method
 * @param cls {string | Array<string> | Record<string, boolean>} 样式表
 */
export declare const addClass: (this: void | unknown, cls: ClsType | ClsType[]) => void;
export declare const cssVar: (this: void | unknown, name: string, value: unknown, prefix?: boolean) => void;
export {};
