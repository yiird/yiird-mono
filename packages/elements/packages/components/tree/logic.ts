import { computed, reactive, toRef, watchEffect, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, usePrefab, useTheme, type CommonPrefab } from '../../common/prefab';
import { flatDataToNodeMap, mapNodesToTreeNodes, treeNodesToFlatNodesData, type TransforOptions, type TreeNode } from '../../common/tree-utils';
import type { Size } from '../../types/global';

export const TreeProps = {
    ...BaseProps,
    items: {
        type: Array as PropType<object[]>,
        default() {
            return [];
        }
    },
    keyConfig: {
        type: Object as PropType<TransforOptions>,
        default() {
            return {
                key: 'id',
                pkey: 'pid',
                ckey: 'children',
                tkey: 'name'
            };
        }
    },
    size: {
        type: [String, Object] as PropType<Size>
    }
} as const;
export type TreePropsType = Readonly<ExtractPropTypes<typeof TreeProps>>;

export type DataStructure = {
    mapStructure: Record<string, TreeNode>;
    treeStructure: TreeNode[];
    flatStructure: TreeNode[];
};

export interface TreeTheme {
    bemModifiers?: string[];
}
const obtainTheme = (props: TreePropsType, prefab: CommonPrefab) => {
    const themeConfig = useTheme();
    return computed<TreeTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: TreeTheme = {};

        theme.bemModifiers = [];

        return theme;
    });
};

export const useTree = (props: TreePropsType) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme(props, prefab);

    const dataStructure = reactive<Partial<DataStructure>>({});

    //准备数据
    watchEffect(() => {
        // 无序的Map数据，为了快速查找数据
        const mapStructure = flatDataToNodeMap(props.items, {
            ...props.keyConfig,
            operatorNodeFn: (node) => {
                node.isOpen = false; // 节点打开状态
                node.isShow = false; // 控制是否显示
                node.inView = false; // 是否在可视区域内，如果不在可视区域内则不显示
                node.isHalfCheck = false;
                node.isChecked = false;
                node.classes = [];
                node.isFocus = node[props.keyConfig.key] === false;
            }
        });

        const dataSorts = Object.keys(mapStructure);
        // 树型数据
        const treeStructure = mapNodesToTreeNodes(mapStructure, dataSorts, props.keyConfig);
        // 有序扁平数据
        const flatStructure = treeNodesToFlatNodesData(treeStructure, props.keyConfig);
        dataStructure.mapStructure = mapStructure;
        dataStructure.treeStructure = treeStructure;
        dataStructure.flatStructure = flatStructure;
    });

    const flatStructure = toRef(dataStructure, 'flatStructure');

    return {
        ...prefab,
        theme,
        flatStructure
    };
};
