import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faFolderOpen, faSquareCheck, faSquareMinus } from '@fortawesome/pro-duotone-svg-icons';

import { faAngleDown, faAngleRight, faSquare } from '@fortawesome/pro-light-svg-icons';
import { faFile } from '@fortawesome/pro-thin-svg-icons';
import { difference, intersection } from 'lodash-es';
import { computed, inject, onBeforeMount, reactive, ref, toRaw, watch, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { styleValueToNumber } from '../../common/dom-utils';
import { BaseProps, baseExpose, usePrefab, useTheme, type CommonPrefab } from '../../common/prefab';
import {
    _rawNodeData,
    flatDataToNodeMap,
    mapNodesToTreeNodes,
    operatorCheck,
    operatorExpand,
    treeNodesToFlatNodesData,
    type CheckStat,
    type ExpandStat,
    type KeyConfig,
    type RawNode,
    type TreeNode
} from '../../common/tree-utils';
import { SCROLL_KEY, sizeToFontSize, sizeToHeight } from '../../config';
import type { Size, ThemeConfig } from '../../types/global';
import type { PageBoundary, VirtualPagePluginOptions } from '../../types/scroll';

export const TreeProps = {
    ...BaseProps,
    /**
     * 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据
     */
    items: {
        type: Array as PropType<object[]>,
        default() {
            return [];
        }
    },
    /**
     * 标识(字段)配置
     *
     * 告知组件主键、父主键、显示文本、子节点分别对应数据中的字段
     *
     * @default {key: 'id',pkey: 'pid',ckey: 'children',ikey:'icon',tkey: 'name'}
     */
    keyConfig: {
        type: Object as PropType<KeyConfig>,
        default() {
            return {
                key: 'id',
                pkey: 'pid',
                ckey: 'children',
                ikey: 'icon',
                tkey: 'name'
            };
        }
    },
    /**
     * 尺寸
     */
    size: {
        type: [String, Object] as PropType<Size>,
        default: 'md'
    },
    /**
     * 是否级联选中父级、子集
     */
    cascade: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    dragable: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 是否显示图标
     */
    showIcon: {
        type: Boolean,
        default: true
    },
    /**
     * 是否显示辅助线
     */
    showLine: {
        type: Boolean,
        default: true
    },
    /**
     * 主要图标
     */
    icon: {
        type: [String, Object] as PropType<string | IconDefinition>,
        default: faFolder
    },
    /**
     * 主要图标
     */
    iconActived: {
        type: [String, Object] as PropType<string | IconDefinition>,
        default: faFolderOpen
    },
    /**
     * 叶子结点图标
     */
    leafIcon: {
        type: [String, Object] as PropType<string | IconDefinition>,
        default: faFile
    },
    switchIcons: {
        type: Array as PropType<Array<string | IconDefinition>>,
        validator(_value: Array<string | IconDefinition>) {
            return _value.length >= 2;
        },
        default() {
            return [faSquareCheck, faSquare, faSquareMinus];
        }
    },
    /**
     * 是否一直保持关注状态
     */
    alwaysFocus: {
        type: Boolean,
        default: true
    },
    multiSelect: {
        type: Boolean,
        default: true
    },
    /**
     * 展开并设置为焦点节点
     */
    defaultSelectedKeys: {
        type: Array as PropType<Array<string | number>>,
        default() {
            return [];
        }
    },
    /**
     * 展开配置
     */
    expandKeys: {
        type: Array as PropType<Array<string | number>>,
        default() {
            return [];
        }
    },
    /**
     * 展开配置,默认展开到第几级
     */
    expandLevel: {
        type: Number as PropType<number>
    }
} as const;
export type TreePropsType = Readonly<ExtractPropTypes<typeof TreeProps>>;

export type DataStructure = {
    mapStructure: Record<string | number, TreeNode>;
    treeStructure: TreeNode[];
    flatStructure: TreeNode[];
};

export interface TreeTheme extends ThemeConfig {
    bemModifiers?: string[];
    height?: string;
    lineHeight?: string;
    fontSize?: string;
}

/**
 * 实践参数类型
 */
export interface TreeEventData {
    node: RawNode;
    ev: Event;
}

const _eventData = (node: TreeNode, ev: Event): TreeEventData => {
    return {
        node: _rawNodeData(node),
        ev
    };
};

const obtainTheme = (props: TreePropsType, prefab: CommonPrefab) => {
    const themeConfig = useTheme();

    const obtainShowLine = computed(() => props.showLine);

    return computed<TreeTheme>(() => {
        const _themeConfig = themeConfig.value;

        const height = sizeToHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: TreeTheme = {
            ..._themeConfig,
            height: `${height}px`,
            lineHeight: `${height - 2}px`,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];

        if (!obtainShowLine.value) {
            theme.bemModifiers.push('tree--no-line');
        }

        return theme;
    });
};

export const treeEmits = {
    select: null
};

export const setupTree = (props: TreePropsType, { emit }: SetupContext<typeof treeEmits>) => {
    const prefab = usePrefab(props);

    const theme = obtainTheme(props, prefab);

    const checkState = ref<CheckStat>();
    const expandStat = ref<ExpandStat>();
    const focusIndex = ref();

    let shiftSelectFirstKey: string | number | undefined;

    const keyConfig = props.keyConfig;

    const scroll = inject(SCROLL_KEY);
    const mapStructure = reactive(flatDataToNodeMap(props.items, keyConfig));
    const obtainTreeStructure = computed(() => {
        return mapNodesToTreeNodes(mapStructure, Object.keys(mapStructure), keyConfig);
    });

    const obtainflatStructure = computed(() => {
        return treeNodesToFlatNodesData(obtainTreeStructure.value, keyConfig);
    });

    const obtainData = computed(() => {
        const flatData = obtainflatStructure.value;
        const _expandStat = expandStat.value;

        const _checkState = checkState.value;

        flatData.forEach((node) => {
            node.isChecked = _checkState?.checkedKeys.includes(node[keyConfig.key]) ?? false;
            node.isHalfCheck = (node.isChecked && _checkState?.halfCheckKeys.includes(node[keyConfig.key])) ?? false;
            const isOpen = _expandStat?.opened.includes(node[keyConfig.key]);

            if (node.isChecked) {
                if (node.isHalfCheck) {
                    node.switchIcon = props.switchIcons[props.switchIcons.length - 1];
                } else {
                    node.switchIcon = props.switchIcons[0];
                }
            } else {
                node.switchIcon = props.switchIcons[1];
            }

            node.icon = props.showIcon
                ? node.isFolder
                    ? isOpen
                        ? props.iconActived
                        : props.icon
                    : props.leafIcon
                : node.isFolder
                ? isOpen
                    ? faAngleDown
                    : faAngleRight
                : undefined;
            node.isOpen = isOpen;

            const parent = node.parent;
            if (parent) {
                node.isShow = parent.isShow ? parent.isOpen ?? true : false;
            }
        });
        return flatData.filter((node) => node.isShow);
    });

    const totalCount = computed(() => obtainData.value.length);
    const unitHeight = computed(() => (theme.value.height ? styleValueToNumber(theme.value.height) : 0));

    const boundary = ref<PageBoundary>({
        start: 0,
        end: 0
    });

    if (scroll) {
        watch([() => scroll.scrollbar], () => {
            const pluginOptions: VirtualPagePluginOptions = {
                itemClass: 'tree__node',
                boundary,
                totalCount: totalCount,
                unitHeight: unitHeight,
                focusIndex: focusIndex,
                renderPageCount: 3
            };

            //禁用过屏效果，否则滚动条总蹦跶
            scroll.scrollbar?.updatePluginOptions('overscroll', {
                maxOverscroll: 0
            });
            //启用虚拟滚动
            scroll.scrollbar?.updatePluginOptions('virtualPage', pluginOptions);
        });
        watch(boundary, (_boundary, prev_boundary) => {
            if (prev_boundary && _boundary.start >= 0 && _boundary.end > 0) {
                const newInViewKeys = obtainData.value.slice(_boundary.start, _boundary.end).map((node) => node[keyConfig.key]);
                // console.log(obtainData.value.findIndex((n) => n[keyConfig.key] === newInViewKeys[0]));
                const oldInViewKeys = Object.values(mapStructure)
                    .filter((node) => node.inView)
                    .map((node) => node[keyConfig.key]);
                const common = intersection(newInViewKeys, oldInViewKeys);
                difference(newInViewKeys, common).forEach((key) => {
                    mapStructure[key].inView = true;
                });
                difference(oldInViewKeys, common).forEach((key) => {
                    mapStructure[key].inView = false;
                });
            }
        });
    }

    /**
     * @private
     */
    const _toggleOpen = (node: TreeNode) => {
        if (!node.isFolder) return;
        expandStat.value = operatorExpand({
            keyConfig,
            flag: !node.isOpen,
            target: node,
            orignalState: expandStat.value
        });
    };

    /**
     * @private
     * @param node
     */
    const doFocusNode_ = (target: TreeNode) => {
        const prevKey = focusIndex.value;
        const index = obtainData.value.findIndex((node) => target[keyConfig.key] === node[keyConfig.key]);
        if (prevKey !== index) focusIndex.value = index;
    };

    /**
     * 给定开始标识和结束标识(选中/取消)选中节点
     * @param startKey 开始标识
     * @param endKey 结束标识
     * @param flag true 选中，false 取消选中
     * @param cascade [可选] 级联选中父级、子集
     */
    const selectRange = (startKey: string | number, endKey: string | number, flag: boolean, cascade: boolean = true) => {
        const flatData = obtainflatStructure.value;
        const startIndex = mapStructure[startKey].index;
        const endIndex = mapStructure[endKey].index;
        let nodes;
        if (startIndex <= endIndex) {
            nodes = flatData.slice(startIndex, endIndex + 1);
        } else {
            nodes = flatData.slice(endIndex, startIndex + 1);
        }
        if (nodes.length > 1) {
            selectMulti(
                nodes.filter((node) => !node.isFolder),
                flag,
                cascade
            );
        }
    };

    const selectMulti = (nodes: Array<TreeNode>, flag: boolean, cascade: boolean) => {
        const _checkState = checkState.value;
        const state = operatorCheck({
            target: nodes,
            flag,
            cascade,
            keyConfig,
            orignalState: _checkState
        });
        checkState.value = state;
    };

    /**
     * 给定节点标识，(选中/取消)选中节点
     *
     * @param key 节点标识
     * @param flag true 选中，false 取消选中
     * @param cascade [可选] 级联选中父级、子集
     */
    const select = (key: string | number, flag: boolean, cascade: boolean = true) => {
        const _checkState = checkState.value;
        const state = operatorCheck({
            target: toRaw(mapStructure)[key],
            flag,
            cascade,
            keyConfig,
            orignalState: _checkState
        });
        checkState.value = state;
    };

    /**
     * @private
     */
    const doToggleSelected_ = (node: TreeNode, ev: Event) => {
        if (ev instanceof MouseEvent) {
            //按住shift多选
            if (ev.shiftKey) {
                if (shiftSelectFirstKey) {
                    const flagNode = mapStructure[shiftSelectFirstKey];
                    const flag = flagNode.isChecked;
                    selectRange(shiftSelectFirstKey, node[keyConfig.key], flag, props.cascade);
                }
                shiftSelectFirstKey = node[keyConfig.key];
                return;
            }
        }
        shiftSelectFirstKey = node[keyConfig.key];

        select(node[keyConfig.key], !node.isChecked, props.cascade);

        /**
         * 选中事件
         *
         * @param {TreeEventData} arg0 参数
         */
        emit('select', _eventData(node, ev));

        if (props.alwaysFocus) {
            doFocusNode_(node);
        }
    };

    /**
     * @private
     */
    const doClickExpandIcon_ = (node: TreeNode, ev: Event) => {
        _toggleOpen(node);

        if (props.alwaysFocus) {
            doFocusNode_(node);
        }
    };

    onBeforeMount(() => {
        const initExpands = [];
        const expandLevel = props.expandLevel;
        const expandKeys = props.expandKeys;
        const defaultSelectedKeys = props.defaultSelectedKeys;
        const flatData = obtainflatStructure.value;
        if (expandKeys && expandKeys.length > 0) {
            initExpands.push(...expandKeys.map((key) => mapStructure[key]));
        }

        if (defaultSelectedKeys && defaultSelectedKeys.length > 0) {
            const expands = defaultSelectedKeys.map((key) => mapStructure[key].parent).filter((node) => !!node);
            initExpands.push(...(expands as TreeNode[]));
        }

        if (expandLevel) {
            initExpands.push(...flatData.filter((node) => node.level <= props.expandLevel! - 1));
        }

        if (0 === initExpands.length) {
            initExpands.push(...flatData.filter((node) => node.isFolder));
        }

        expandStat.value = operatorExpand({
            target: initExpands,
            keyConfig,
            flag: true
        });

        selectMulti(
            defaultSelectedKeys.map((key) => mapStructure[key]),
            true,
            props.cascade
        );

        if (props.alwaysFocus && defaultSelectedKeys && defaultSelectedKeys.length > 0) {
            const focusKey = defaultSelectedKeys[defaultSelectedKeys.length - 1];
            const index = obtainData.value.findIndex((node) => focusKey === node[keyConfig.key]);
            focusIndex.value = index;
        }
    });

    return {
        ...prefab,
        theme,
        obtainData,
        doToggleSelected_,
        doClickExpandIcon_,
        selectRange,
        select
    };
};

export const treeExpose = [...baseExpose];
