import type { InternalTreeNode, TreeNodeKey } from './components';

export interface EventArgs {
    el: HTMLElement;
}

export interface FormItemEventArgs extends EventArgs {
    value: any;
}

export interface CheckboxEventArgs extends EventArgs {
    checked: Array<any>;
}

export interface ListEventArgs<I extends {}> extends EventArgs {
    value: I;
}

export interface DropEventArgs extends EventArgs {
    value: any;
    label: string;
}

export interface SelectEventArgs extends EventArgs {
    /**
     * 隐藏元素（记录有效值）
     */
    hiddenEl?: HTMLElement;
    /**
     * Label
     */
    label: string;
    value: any;
}

export interface ScrollEventArgs extends EventArgs {
    total: number;
    rendered: number;
    page: number;
    pageSize: number;
    pageCount: number;
}

export interface TreeEventArgs extends EventArgs {
    /**
     * 操作目标
     */
    target?: InternalTreeNode | InternalTreeNode[];
    /**
     * 选中的所有节点
     */
    checked: Array<InternalTreeNode>;
    /**
     * 选中所有节点的key
     */
    checkedKeys: Array<TreeNodeKey>;
    /**
     * 目前需要渲染的总数
     */
    shouldRenderCount: number;
}

//======================>

export interface EventArg<E extends Event> {
    ev: E;
}

export interface InputEventArg extends EventArg<InputEvent> {}
/**
 * Change事件回调参数类型
 */
export interface ChangeEventArg extends EventArg<Event> {}
export interface FocusEventArg extends EventArg<FocusEvent> {}
export interface BlurEventArg extends EventArg<FocusEvent> {}
