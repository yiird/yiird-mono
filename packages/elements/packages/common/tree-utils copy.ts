import { intersection, isArray, remove, uniq } from 'lodash-es';

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

const _findChildrenKeys = (node: TreeNode, keyConfig: KeyConfig) => {
    const keys: Array<string | number> = [];
    const children = node[keyConfig.ckey];
    children?.forEach((n: TreeNode) => {
        keys.push(n[keyConfig.key]);
        if (n.isFolder) {
            keys.push(..._findChildrenKeys(n, keyConfig));
        }
    });
    return keys;
};

export const _findHalfChecked = (selectedKeys: Array<string | number>, node: TreeNode, keyConfig: KeyConfig) => {
    const nodes: Array<string | number> = [];
    const parent = node.parent;

    if (parent) {
        const childrenKeys = (parent[keyConfig.ckey] as Array<TreeNode>).map((node) => node[keyConfig.key]);
        const commonKeys = intersection(selectedKeys, childrenKeys);

        if (commonKeys.length < childrenKeys.length) {
            nodes.push(parent[keyConfig.key]);
            nodes.push(..._findHalfChecked(selectedKeys, parent, keyConfig));
        }
    }
    return nodes;
};

const getHalfKeysOnPath = (nodes: TreeNode[], keyConfig: KeyConfig) => {
    const halfKeys: Array<string | number> = [];
    nodes.forEach((node: TreeNode) => {
        if (node.isHalfCheck) {
            halfKeys.push(node[keyConfig.key]);
        }
        if (node.parent) {
            halfKeys.push(...getHalfKeysOnPath(node.parent[keyConfig.ckey], keyConfig));
        }
    });

    return halfKeys;
};

const operatorHalfCheck = (
    checkedKeys: Array<string | number>,
    halfKeys: Array<string | number>,
    confirmFullChecked: Array<string | number>,
    deletedKeys: Array<string | number>,
    node: TreeNode,
    keyConfig: KeyConfig,
    flag: boolean
) => {
    const parent = node.parent;
    if (parent) {
        const pkey = parent[keyConfig.key];
        const children = parent[keyConfig.ckey];
        const childrenChecked = children.filter((bn: TreeNode) => bn.isChecked);
        const childrenCheckedCount = childrenChecked.length;

        if (flag) {
            operatorHalfCheck(checkedKeys, halfKeys, confirmFullChecked, deletedKeys, parent, keyConfig, flag);
            if (children.length - 1 !== childrenCheckedCount) {
                const willChecked = children.filter((bn: TreeNode) => checkedKeys.includes(bn[keyConfig.key])).map((bn: TreeNode) => bn[keyConfig.key]);
                if (children.length === willChecked.length) {
                    remove(halfKeys, (k) => k === pkey);
                    checkedKeys.push(pkey);
                } else {
                    halfKeys.push(pkey);
                    checkedKeys.push(pkey);
                }
            } else {
                remove(halfKeys, (k) => k === pkey);
            }

            const childrenHalfChecked = children.filter((bn: TreeNode) => bn.isHalfCheck).map((bn: TreeNode) => bn[keyConfig.key]);
            halfKeys.push(...childrenHalfChecked);
            if (pkey === '20171208094103568-8DD1-5A69FB22B') {
                //debugger;
            }
            if (
                children.length ===
                children.filter((bn: TreeNode) => {
                    return (bn.isChecked && !bn.isHalfCheck) || checkedKeys.includes(bn[keyConfig.key]);
                })
            ) {
                confirmFullChecked.push(pkey);
            }
        } else {
            if (1 === childrenCheckedCount) {
                if (!checkedKeys.includes(childrenChecked[0][keyConfig.key])) {
                    remove(checkedKeys, (k) => k === pkey);
                    deletedKeys.push(pkey);
                } else {
                    halfKeys.push(pkey);
                    checkedKeys.push(pkey);
                }
            } else if (children.length >= childrenCheckedCount) {
                const index = childrenChecked.findIndex((cn: TreeNode) => !deletedKeys.includes(cn[keyConfig.key]));
                if (index > -1) {
                    halfKeys.push(pkey);
                    checkedKeys.push(pkey);
                } else {
                    remove(halfKeys, (k) => k === pkey);
                    remove(checkedKeys, (k) => k === pkey);
                    deletedKeys.push(pkey);
                }
            }

            const childrenHalfChecked = children.filter((bn: TreeNode) => bn.isHalfCheck && bn[keyConfig.key] !== node[keyConfig.key]).map((bn: TreeNode) => bn[keyConfig.key]);
            halfKeys.push(...childrenHalfChecked);
            operatorHalfCheck(checkedKeys, halfKeys, confirmFullChecked, deletedKeys, parent, keyConfig, flag);
        }
    }
    // return fullChecked;
};

/**
 * 单节点选中/取消选中产生的selectKeys 和 halfCheckedKeys
 */
const toggleSelectKeysWhenSingleChoose = (
    orignalKeys: Array<string | number>,
    confirmFullChecked: Array<string | number>,
    deletedKeys: Array<string | number>,
    node: TreeNode,
    keyConfig: KeyConfig,
    flag: boolean,
    cascade: boolean
) => {
    let checkedKeys: Array<string | number> = [node[keyConfig.key]];
    const halfCheckKeys: Array<string | number> = [];
    if (cascade) {
        const childrenKeys = _findChildrenKeys(node, keyConfig);
        checkedKeys.push(...childrenKeys);
        if (flag) {
            checkedKeys = uniq([...orignalKeys, ...checkedKeys]);
        } else {
            const _keys = [...orignalKeys];
            const _deletedKeys = remove(_keys, (it) => {
                return checkedKeys.includes(it);
            });
            deletedKeys.push(..._deletedKeys);
            checkedKeys = uniq(_keys);
        }
        operatorHalfCheck(checkedKeys, halfCheckKeys, confirmFullChecked, deletedKeys, node, keyConfig, flag);
    } else {
        if (flag) {
            checkedKeys.push(...orignalKeys);
        } else {
            const _keys = [...orignalKeys];

            remove(_keys, (ke) => {
                return checkedKeys.includes(ke);
            });
            checkedKeys = uniq(_keys);
        }
    }

    return {
        checkedKeys: uniq(checkedKeys),
        halfCheckKeys: uniq(halfCheckKeys)
    };
};

type CheckStat = { checkedKeys: Array<string | number>; halfCheckKeys: Array<string | number> };

export const toggleSelectKeys = (orignalKeys: Array<string | number>, node: TreeNode | Array<TreeNode>, keyConfig: KeyConfig, flag: boolean, cascade: boolean) => {
    const confirmFullChecked: Array<string | number> = [];
    let result: CheckStat;
    if (isArray(node)) {
        if (node.length === 0) return { checkedKeys: [], halfCheckKeys: [] };
        let checkedKeys = [...orignalKeys];
        let halfCheckKeys: Array<string | number> = [];

        node.forEach((_node) => {
            const state = toggleSelectKeysWhenSingleChoose(checkedKeys, confirmFullChecked, [], _node, keyConfig, flag, cascade);
            checkedKeys = state.checkedKeys;
            halfCheckKeys = state.halfCheckKeys;
        });
        result = {
            checkedKeys,
            halfCheckKeys: halfCheckKeys
        };
    } else {
        result = toggleSelectKeysWhenSingleChoose(orignalKeys, confirmFullChecked, [], node, keyConfig, flag, cascade);
    }
    console.log(confirmFullChecked);
    return result;
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
