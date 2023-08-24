import type { UnwrapNestedRefs } from 'vue';
import type { TreeNode } from '../common/common-source';
import type { IconNameOrDefinition, SelectIcons } from './icon';

export type TreeKeyConfig = {
    /**
     * 主键标识
     */
    key: string;
    /**
     * 父级标识
     */
    pkey: string;
    /**
     * 子节点标识(如果是扁平数据，则不需要配置ckey)
     */
    ckey: string;
    /**
     * 图标标识，如果数据中没有图标属性，则使用props中配置的图标
     */
    ikey: string;
    /**
     * 文本内容标识
     */
    tkey: string;
};

export interface InternalTreeNode extends TreeNode<InternalTreeNode> {
    /**
     * 父级节点
     *
     * @ignore
     */
    parent?: InternalTreeNode;
    /**
     * 选择状态图标
     */
    selectIcon?: IconNameOrDefinition;
    /**
     * 选择状态图标
     */
    switchIcon?: IconNameOrDefinition;
    /**
     * 图标
     */
    icon?: IconNameOrDefinition;
    /**
     * 是否是folder节点
     */
    isFolder: boolean;
    /**
     * 路径标识
     */
    path: Array<TreeNodeKey>;
    /**
     * 路径节点
     *
     * @ignore
     */
    pathNodes: Array<InternalTreeNode>;
    /**
     * 级别
     */
    level: number;
    /**
     * 在整个扁平数据中的序号
     */
    index: number;
    /**
     * 在兄弟中的排行
     */
    brotherIndex: number;
    /**
     * 兄弟节点数量
     */
    brotherCount: number;
    /**
     * 是否只有一个子节点
     */
    hasOnlyChild: boolean;
    /**
     * 是否打开状态
     */
    isOpen?: boolean;
    /**
     * 是否显示
     */
    isShow: boolean;
    /**
     * 是否半选中
     */
    isHalfCheck: boolean;
    /**
     * 是否选中
     */
    isChecked: boolean;
    /**
     * 是否是焦点
     */
    isFocus: boolean;
    /**
     * 是否是兄弟中的最后一个节点
     */
    isLastInBrother: boolean;
    /**
     * 源节点数据
     */
    original: any;
}

/**
 * 根据状态确认图标类型
 */
export type TreeNodeStateIcons = {
    /**
     * 正常状态
     */
    default?: IconNameOrDefinition;
    /**
     * 选中状态
     */
    selected?: IconNameOrDefinition;
};

/**
 * 通过节点类型（folder｜leaf）确定图标类型，每种节点类型可配置不同状态显示不同图标，如果直接使用`IconNameOrDefinition`赋给`folder`或`leaf`择不管选中还是未选中只显示一种图标
 */
export type TreeNodeTypeIcons = {
    /**
     * 组节点
     */
    folder?: IconNameOrDefinition | TreeNodeStateIcons;
    /**
     * 叶子结点
     */
    leaf?: IconNameOrDefinition | TreeNodeStateIcons;
};

/**
 * 节点图标类型
 * 1、根据节点类型和选中状态来配置不同图标，使用 `TreeNodeTypeIcons`
 * 2、根据节点类型配置，使用 `TreeNodeTypeIcons`
 * 3、根据节点状态配置，使用 `TreeNodeStateIcons`
 * 4、不管节点类型和状态，使用 `IconNameOrDefinition`
 *
 */
export type TreeNodeFinalIcons = TreeNodeStateIcons | TreeNodeTypeIcons | IconNameOrDefinition;

/**
 * 根据不同的节点数据返回不同的图标配置
 */
export type TreeNodeIconFunction = (node: InternalTreeNode) => TreeNodeFinalIcons;

export type TreeNodeIcons = TreeNodeFinalIcons | TreeNodeIconFunction;

export interface TreeNodeSelectIcons extends SelectIcons {
    /**
     * 半选中状态图标
     */
    halfChecked?: IconNameOrDefinition;
}

export type TreeNodeSwitchIcons = {
    /**
     * 展开状态的图标
     */
    open?: IconNameOrDefinition;
    /**
     * 关闭状态的图标
     */
    close?: IconNameOrDefinition;
};
export type FlatTreeSourceState = {
    map: UnwrapNestedRefs<Map<string | number, InternalTreeNode>>;
    tree: Array<InternalTreeNode>;
    flat: Array<InternalTreeNode>;
};

export type TreeNodeKey = number | string;
export type CheckState = {
    checkedKeys: Set<TreeNodeKey>;
    halfCheckKeys: Set<TreeNodeKey>;
};
export type ExpandState = {
    openedKeys: Set<TreeNodeKey>;
};

export type CheckOptions = {
    orignalState?: CheckState;
    target: InternalTreeNode | Array<InternalTreeNode>;
    flag: boolean;
    cascade: boolean;
    multi: boolean;
};

export type ExpandOptions = {
    orignalState?: ExpandState;
    target: InternalTreeNode | Array<InternalTreeNode>;
    flag: boolean;
};

export type FlatTreeOperatorState = {
    expandState?: ExpandState;
    checkState?: CheckState;
};

export type FlatTreeSourceOptions = {
    icons?: TreeNodeIcons;
    selectIcons?: TreeNodeSelectIcons;
    switchIcons?: TreeNodeSwitchIcons;
    defaultExpandFlag: boolean;
    defaultExpandKeys?: TreeNodeKey[];
    defaultExpandLevel?: number;
    defaultCheckedKeys?: TreeNodeKey[];
    cascade: boolean;
    multi: boolean;
};
