import { isArray, remove, union } from 'lodash-es';

export type CheckStat = { checkedKeys: Array<string | number>; halfCheckKeys: Array<string | number> };

export type ExpandStat = {
    opened: Array<string | number>;
};

type CheckOptions = {
    orignalState?: CheckStat;
    target: TreeNode | Array<TreeNode>;
    keyConfig: KeyConfig;
    flag: boolean;
    cascade: boolean;
};

type ExpandOptions = {
    orignalState?: ExpandStat;
    target: TreeNode | Array<TreeNode>;
    keyConfig: KeyConfig;
    flag: boolean;
};

export type KeyConfig = {
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
    operatorNodeFn?: (node: TreeNode) => void;
};

export type TreeNode = {
    /**
     * 是否是folder节点
     */
    isFolder?: boolean;
    /**
     * 父级节点
     */
    parent?: TreeNode;
    /**
     * 路径
     */
    path: Array<string>;
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
     * 是否打开状态
     */
    isOpen?: boolean;
    /**
     * 是否显示
     */
    isShow: boolean;
    /**
     * 是否在dom中渲染
     */
    inView: boolean;
    /**
     * 在可渲染中的排行
     */
    inViewIndex?: number;
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
    data: any;
    [key: string]: any;
};

export interface RawNode {
    /**
     * 是否是folder节点
     */
    isFolder?: boolean;
    /**
     * 父级节点
     */
    parent?: RawNode;
    /**
     * 路径
     */
    path: Array<string>;
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
     * 是否打开状态
     */
    isOpen?: boolean;
    /**
     * 是否半选中
     */
    isHalfCheck: boolean;
    /**
     * 是否选中
     */
    isChecked: boolean;

    /**
     * 源节点数据
     */
    data: any;
}

/**
 * 将扁平对象数组转化成节点Map，并保持引用<br>
 * @param {Array} flatData 扁平数据
 * @param {Object} {key:标识字段名称,pkey:父标识字段,tkey:文本内容标识,operatorNodeFn:数据处理}
 * @returns key-value 结构数据
 */
export const flatDataToNodeMap = (flatDatas: Array<any>, transforOptions: Partial<KeyConfig>) => {
    const { key, pkey, tkey, operatorNodeFn } = transforOptions;
    const map: Record<string, TreeNode> = {};
    if (key && pkey && tkey) {
        for (const data of flatDatas) {
            const node: TreeNode = {
                [key]: data[key],
                [pkey]: data[pkey],
                [tkey]: data[tkey],
                level: 0,
                path: [],
                index: 0,
                brotherIndex: 0,
                brotherCount: 0,
                isShow: true, // 控制是否显示
                inView: true, // 是否在可视区域内，如果不在可视区域内则不显示
                isFocus: false,
                isHalfCheck: false,
                isChecked: false,
                isLastInBrother: false,
                data
            };
            if (operatorNodeFn) {
                operatorNodeFn(node);
            }
            map[data[key]] = node;
        }
    } else {
        console.log('未配置：key、pkey、tkey');
    }
    return map;
};

/**
 * 将Map数据的values转化成树型结构，并保持应用
 * @param {Map} mapDatas 有树属性的Map数据
 * @param {Array} dataSorts 数据排序，即为有序的key数组
 * @param {Object} {pkey:父标识字段名称,ckey:子集标识字段名称}
 * @returns Tree结构数据
 */
export const mapNodesToTreeNodes = (mapDatas: Record<string, TreeNode>, dataSorts: Array<any>, { pkey = 'pid', ckey = 'children' }: Partial<KeyConfig>) => {
    const treeNodes: TreeNode[] = [];

    for (const key in mapDatas) {
        mapDatas[key][ckey] = [];
    }
    for (const key of dataSorts) {
        if (mapDatas[key] && mapDatas[key][pkey] !== (undefined || null) && mapDatas[mapDatas[key][pkey]]) {
            mapDatas[mapDatas[key][pkey]][ckey].push(mapDatas[key]);
        } else {
            treeNodes.push(mapDatas[key]);
        }
    }
    return treeNodes;
};

/**
 * 将树型结构数据转化成自上而下顺序的扁平数据，并保持引用<br>
 * 增加字段:<br>
 * level 级别、path 路径、brotherCount 兄弟节点个数、brotherIndex 在兄弟节点中的位置
 * @param {Array} treeData 树型结构数据
 * @param {Object} {pkey:父标识字段名称,ckey:子集标识字段名称,operatorNodeFn:数据处理}
 * @returns Array 自上而下有序的扁平数据
 */
export const treeNodesToFlatNodesData = (treeNodes: Array<TreeNode>, transforOptions: KeyConfig) => {
    const { pkey, ckey, operatorNodeFn } = transforOptions;
    const flatTreeData: Array<TreeNode> = [];
    let globalIndex = 0;
    for (const node of treeNodes) {
        node.path = [node[pkey]];
        node.level = 0;
        addNode(node);
        globalIndex++;
    }

    function addNode(node: TreeNode) {
        flatTreeData.push(node);
        if (node[ckey] && node[ckey].length > 0) {
            node.isFolder = true;
            const count = node[ckey].length;
            for (let index = 0; index < count; index++) {
                const childNode: TreeNode = node[ckey][index];
                globalIndex++;
                childNode.index = globalIndex;
                childNode.parent = node;
                childNode.path = [...node.path, childNode[pkey]];
                childNode.level = node.level + 1;
                childNode.brotherIndex = index;
                childNode.brotherCount = count;
                childNode.isLastInBrother = node.brotherIndex === node.brotherCount - 1 || node.brotherCount === 1;
                addNode(childNode);
            }
        } else {
            node.isFolder = false;
        }
        if (operatorNodeFn) {
            operatorNodeFn(node);
        }
    }
    return flatTreeData;
};

const cascadeParent = (target: TreeNode, state: CheckStat, options: CheckOptions) => {
    const { flag, keyConfig } = options;
    const { checkedKeys, halfCheckKeys } = state;
    const { parent } = target;
    if (parent) {
        const pkey = parent[keyConfig.key];
        const targetBrothers: TreeNode[] = parent[keyConfig.ckey];

        if (flag) {
            if (pkey === '20171208094103568-8DD1-5A69FB22B') {
                // debugger;
            }

            const targetBrotherFullChecked = targetBrothers.filter((node) => {
                const key = node[keyConfig.key];
                return (checkedKeys.includes(key) && !halfCheckKeys.includes(key)) || (node.isChecked && !node.isHalfCheck);
            });

            if (targetBrothers.length > targetBrotherFullChecked.length) {
                checkedKeys.push(pkey);
                halfCheckKeys.push(pkey);
            } else if (targetBrothers.length == targetBrotherFullChecked.length) {
                checkedKeys.push(pkey);
                remove(halfCheckKeys, (key) => pkey === key);
            }
        } else {
            const targetBrotherChecked = targetBrothers.filter((node) => {
                const key = node[keyConfig.key];
                return checkedKeys.includes(key);
            });

            if (0 === targetBrotherChecked.length) {
                remove(checkedKeys, (key) => pkey === key);
                remove(halfCheckKeys, (key) => pkey === key);
            } else if (targetBrothers.length >= targetBrotherChecked.length) {
                halfCheckKeys.push(pkey);
            }
        }

        cascadeParent(parent, state, options);
    }
};
const cascadeChildren = (target: TreeNode, state: CheckStat, options: CheckOptions) => {
    const { flag, keyConfig } = options;
    const { checkedKeys, halfCheckKeys } = state;
    const childrenKeys = (target[keyConfig.ckey] as TreeNode[]).map((node) => {
        cascadeChildren(node, state, options);
        return node[keyConfig.key];
    });
    if (flag) {
        checkedKeys.push(...childrenKeys);
        remove(halfCheckKeys, (key) => target[keyConfig.key] === key);
    } else {
        remove(checkedKeys, (key) => childrenKeys.includes(key));
    }
};

/**
 * 单节点选中/取消选中产生的selectKeys 和 halfCheckedKeys
 */
const operatorCheckSingle = (target: TreeNode, state: CheckStat, options: CheckOptions) => {
    const { flag, cascade, keyConfig } = options;
    const { checkedKeys } = state;
    const targetKey = target[keyConfig.key];

    if (flag) {
        checkedKeys.push(targetKey);
    } else {
        remove(checkedKeys, (key) => targetKey === key);
    }

    if (cascade) {
        cascadeChildren(target, state, options);
        cascadeParent(target, state, options);
    }
};

export const operatorCheck = (options: CheckOptions) => {
    const { orignalState } = options;
    const state: CheckStat = {
        checkedKeys: orignalState?.checkedKeys ? [...orignalState.checkedKeys] : [],
        halfCheckKeys: orignalState?.halfCheckKeys ? [...orignalState.halfCheckKeys] : []
    };

    const target = options.target;

    if (isArray(target)) {
        target.forEach((node) => {
            operatorCheckSingle(node, state, options);
        });
        return state;
    } else {
        operatorCheckSingle(target, state, options);
    }
    return state;
};

export const operatorExpand = (options: ExpandOptions) => {
    const { target, flag, keyConfig, orignalState } = options;

    const targets = isArray(target) ? target : [target];

    const state: ExpandStat = {
        opened: orignalState?.opened ? [...orignalState.opened] : []
    };

    if (flag) {
        state.opened.push(...union(state.opened, ...targets.map((node) => [node[keyConfig.key], ...node.path])));
    } else {
        const deleted = targets.map((node) => node[keyConfig.key]);
        remove(state.opened, (key) => deleted.includes(key));
    }

    return state;
};

export const _rawNodeData = (node: TreeNode): RawNode => {
    return {
        isFolder: node.isFolder,
        parent: node.parent ? _rawNodeData(node.parent) : undefined,
        path: [...node.path],
        level: node.level,
        index: node.index,
        brotherIndex: node.brotherIndex,
        brotherCount: node.brotherCount,
        isOpen: node.isOpen,
        isHalfCheck: node.isHalfCheck,
        isChecked: node.isChecked,
        data: {
            ...node.data
        }
    };
};
