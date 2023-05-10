export type TransforOptions = {
    key: string;
    pkey: string;
    ckey: string;
    tkey: string;
    operatorNodeFn?: (node: TreeNode) => void;
};

export type TreeNode = {
    isFolder?: boolean;
    parent?: TreeNode;
    path: Array<string | undefined>;
    level: number;
    brotherIndex: number;
    brotherCount: number;
    isOpen: boolean;
    isShow: boolean;
    inView: boolean;
    isHalfCheck: boolean;
    isChecked: boolean;
    isFocus: boolean;
    classes: [];
    [key: string]: any;
};

/**
 * 将扁平对象数组转化成节点Map，并保持引用<br>
 * @param {Array} flatData 扁平数据
 * @param {Object} {key:标识字段名称,pkey:父标识字段,tkey:文本内容标识,operatorNodeFn:数据处理}
 * @returns key-value 结构数据
 */
export const flatDataToNodeMap = (flatDatas: Array<any>, transforOptions: Partial<TransforOptions>) => {
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
                brotherIndex: 0,
                brotherCount: 0,
                isOpen: false, // 节点打开状态
                isShow: false, // 控制是否显示
                inView: false, // 是否在可视区域内，如果不在可视区域内则不显示
                isFocus: false,
                isHalfCheck: false,
                isChecked: false,
                classes: [],
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
export const mapNodesToTreeNodes = (mapDatas: Record<string, any>, dataSorts: Array<any>, { pkey, ckey }: TransforOptions) => {
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
export const treeNodesToFlatNodesData = (treeNodes: Array<TreeNode>, transforOptions: TransforOptions) => {
    const { pkey, ckey, operatorNodeFn } = transforOptions;
    const flatTreeData: Array<TreeNode> = [];
    for (const node of treeNodes) {
        node.path = [node[pkey]];
        node.level = 0;
        addNode(node);
    }

    function addNode(node: TreeNode) {
        if (operatorNodeFn) {
            operatorNodeFn(node);
        }
        flatTreeData.push(node);
        if (node[ckey] && node[ckey].length > 0) {
            node.isFolder = true;
            const count = node[ckey].length;
            for (let index = 0; index < count; index++) {
                const childNode: TreeNode = node[ckey][index];
                childNode.parent = node;
                childNode.path = [...node.path, childNode[pkey]];
                childNode.level = node.level + 1;
                childNode.brotherIndex = index;
                childNode.brotherCount = count;
                addNode(childNode);
            }
        } else {
            node.isFolder = false;
        }
    }
    return flatTreeData;
};
