import type { IconNameOrDefinition } from '../types/components';

export interface SourceType {}

export interface LabelValue extends SourceType {
    /**
     * 标签
     */
    label: string;
    value: any;
    options?: { icon?: IconNameOrDefinition };
}

export type TreeNodeKey = number | string;

export interface TreeNode<C extends TreeNode<C> = TreeNode<any>> extends SourceType {
    /**
     * 标识
     */
    key: TreeNodeKey;
    /**
     * 父级标识
     */
    parentKey: TreeNodeKey;
    /**
     * 显示文本
     */
    text: string;
    /**
     * 子节点
     *
     * @ignore
     */
    children?: C[];
}

export type LabelValueMapping = {
    [K in keyof LabelValue]: string;
};

export type TreeNodeMapping = {
    [K in keyof TreeNode]: string;
};
