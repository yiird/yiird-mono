import { faFolder, faLeaf, faSquareCheck, faSquareMinus } from '@fortawesome/pro-duotone-svg-icons';
import { faAngleDown, faAngleRight, faSquare } from '@fortawesome/pro-light-svg-icons';
import { isObject } from 'lodash-es';
import { computed, nextTick, onBeforeMount, onBeforeUpdate, unref, type CSSProperties, type ExtractPropTypes, type PropType, type Ref, type SetupContext } from 'vue';
import type { TreeNodeMapping } from '../../common/common-source';
import { findElementFromEventByClass, styleValueToNumber } from '../../common/dom-utils';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { FlatTree } from '../../common/tree/FlatTree';
import { sizeToComponentHeight, sizeToFontSize } from '../../config';
import type { InternalTreeNode, TreeNodeIcons, TreeNodeKey, TreeNodeSelectIcons, TreeNodeSwitchIcons } from '../../types/components';
import type { TreeEventArgs } from '../../types/event';
import type { Size, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
import { isNumberStr } from './../../common/common-util';
export const TreeProps = {
    ...BaseProps,
    /**
     * 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据
     */
    source: {
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
     * @default {key: 'key',parentKey: 'parentKey',children: 'children',text: 'text'}
     */
    mapping: {
        type: Object as PropType<TreeNodeMapping>,
        default() {
            return {
                key: 'key',
                parentKey: 'parentKey',
                children: 'children',
                text: 'text'
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
    itemStyle: {
        type: [String, Object] as PropType<string | CSSProperties>
    },
    /**
     * 是否级联选中父级、子集
     */
    cascade: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * 是否可以被拖拽
     */
    draggable: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 是否显示图标
     */
    hideIcon: {
        type: Boolean,
        default: false
    },
    hideSelectIcon: {
        type: Boolean,
        default: false
    },
    hideSwitchIcon: {
        type: Boolean,
        default: false
    },
    /**
     * 是否显示辅助线
     */
    hideLine: {
        type: Boolean,
        default: false
    },
    icons: {
        type: [Object, Function, String] as PropType<TreeNodeIcons>,
        default() {
            return {
                folder: faFolder,
                leaf: faLeaf
            };
        }
    },
    selectIcons: {
        type: Object as PropType<TreeNodeSelectIcons>,
        default() {
            return {
                checked: faSquareCheck,
                halfChecked: faSquareMinus,
                notChecked: faSquare
            };
        }
    },
    switchIcons: {
        type: Object as PropType<TreeNodeSwitchIcons>,
        default() {
            return {
                open: faAngleDown,
                close: faAngleRight
            };
        }
    },
    multi: {
        type: Boolean,
        default: false
    },
    /**
     * 默认选中
     */
    defaultSelectedKeys: {
        type: Array as PropType<Array<string | number>>,
        default() {
            return [];
        }
    },
    /**
     * 默认展开
     */
    defaultExpandKeys: {
        type: Array as PropType<Array<string | number>>,
        default() {
            return [];
        }
    },
    /**
     * 展开配置,默认展开到第几级
     */
    defaultExpandLevel: {
        type: Number as PropType<number>
    },
    /**
     * 触发虚拟渲染的数量，当需要渲染的总节点数超过此值时，进行虚拟化渲染。
     */
    triggerCount: {
        type: Number as PropType<number>,
        default: 500
    },
    /**
     * 每屏显示数量
     */
    screenSize: {
        type: Number as PropType<number>,
        default: 30
    }
} as const;
export type TreePropsType = Readonly<ExtractPropTypes<typeof TreeProps>>;

export interface TreeTheme extends ThemeConfig {
    bemModifiers?: string[];
    height?: string;
    nodeHeight?: string;
    fontSize?: string;
}

export const TreeEmits = {
    /**
     * 选中事件
     * @param {TreeEventArgs} args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select(args: TreeEventArgs) {
        return true;
    },
    /**
     * 多选事件
     * @param {TreeEventArgs} args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    multiSelect(args: TreeEventArgs) {
        return true;
    },
    /**
     * 渲染完成事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rendered(args: TreeEventArgs) {
        return true;
    },
    /**
     * 渲染之前
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    beforeRender() {
        return true;
    }
};

const obtainTheme = (ctx: InternalSetupContext<TreePropsType, typeof TreeEmits>, dataCount: Ref<number>) => {
    const themeConfig = useTheme();

    const { props } = ctx;
    const obtainShowLine = computed(() => !props.hideLine);

    return computed<TreeTheme>(() => {
        const _themeConfig = themeConfig.value;

        const nodeHeight = sizeToComponentHeight(themeConfig.value, props.size);
        const fontSize = sizeToFontSize(themeConfig.value, props.size);

        const theme: TreeTheme = {
            ..._themeConfig,
            height: props.screenSize ? (dataCount.value <= props.screenSize ? 'unset' : `${nodeHeight * props.screenSize}px`) : '100%',
            nodeHeight: `${nodeHeight}px`,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];

        if (!obtainShowLine.value) {
            theme.bemModifiers.push('tree--no-line');
        }

        return theme;
    });
};

export const setupTree = (props: TreePropsType, ctx: SetupContext<typeof TreeEmits>) => {
    const commonExposed = usePrefab(props);
    const { cType__, el } = commonExposed;
    const { emit, slots } = ctx;

    const obtainShowSelectIcon = computed(() => !props.hideSelectIcon);
    const obtainShowSwitchIcon = computed(() => !props.hideSwitchIcon);
    const obtainShowIcon = computed(() => !props.hideIcon);

    const obtainHasStructure = computed(() => !!slots['structure']);

    let shiftSelectFirstKey: string | number | undefined;

    const { icons, selectIcons, switchIcons, mapping } = props;

    const source = new FlatTree(props.source, mapping, {
        icons,
        selectIcons: {
            checked: selectIcons.checked || selectIcons.notChecked,
            notChecked: selectIcons.notChecked,
            halfChecked: selectIcons.halfChecked || selectIcons.checked || selectIcons.notChecked
        },
        switchIcons: {
            open: switchIcons.open,
            close: switchIcons.close || switchIcons.open
        },
        defaultExpandFlag: true,
        defaultExpandKeys: props.defaultExpandKeys,
        defaultExpandLevel: (props.defaultExpandLevel || 0) - 1,
        defaultCheckedKeys: props.defaultSelectedKeys,
        cascade: props.cascade,
        multi: props.multi
    });

    const operatorState = source.operatorState;
    const obtainData = source.getFlatData();

    const obtainRowHeight = computed(() => (theme.value.nodeHeight ? styleValueToNumber(theme.value.nodeHeight) : 0));

    const obtainDataCount = computed(() => {
        return obtainData.value.length;
    });
    const theme = obtainTheme({ props, commonExposed, ...ctx }, obtainDataCount);

    /**
     * 展开/收起
     * @param {InternalTreeNode|TreeNodeKey} node 目标节点对象或者Key
     */
    const toggleExpand = (node: InternalTreeNode | TreeNodeKey) => {
        if (!isObject(node)) {
            const target = source.getMapData().get(node);
            if (target) {
                source.expand(target, !target.isOpen);
            }
        } else {
            source.expand(node, !node.isOpen);
        }
    };

    /**
     * 过滤显示节点
     *
     * @param query 模糊匹配内容
     */
    const filter = (query: string) => {
        source.filter(query);
    };

    /**
     * @private
     */
    const _eventArgs = (target?: InternalTreeNode | InternalTreeNode[]): TreeEventArgs => {
        const checkedKeys = Array.from(operatorState.checkState?.checkedKeys || []);
        const map = source.getMapData();
        const checked = checkedKeys.filter((key) => map.has(key)).map((key) => map.get(key)!);
        return {
            el: unref(el),
            target,
            checked,
            checkedKeys,
            shouldRenderCount: obtainDataCount.value
        };
    };

    /**
     * 给定开始标识和结束标识(选中/取消)选中节点
     * @param {TreeNodeKey} startKey 开始标识
     * @param {TreeNodeKey} endKey 结束标识
     * @param {Boolean} flag true 选中，false 取消选中
     */
    const selectRange = (startKey: TreeNodeKey, endKey: TreeNodeKey, flag: boolean) => {
        const flatData = obtainData.value;
        const startIndex = flatData.findIndex((node) => startKey === node.key);
        const endIndex = flatData.findIndex((node) => endKey === node.key);
        let nodes;
        if (startIndex !== undefined && startIndex >= 0) {
            if (endIndex && startIndex <= endIndex) {
                nodes = flatData.slice(startIndex, endIndex + 1);
            } else {
                nodes = flatData.slice(endIndex, startIndex + 1);
            }
        }

        if (nodes && nodes.length > 1) {
            select(nodes, flag);
            /**
             * 选中事件
             *
             * @param {TreeEventArgs} arg0 参数
             */
            emit('multiSelect', _eventArgs(nodes));
        }
    };

    /**
     * 给定节点标识，(选中/取消)选中节点
     *
     * @param {InternalTreeNode | InternalTreeNode[]} node 节点标识
     * @param {boolean} flag true 选中，false 取消选中
     */
    const select = (node: InternalTreeNode | InternalTreeNode[], flag: boolean) => {
        source.select(node, flag);
    };

    /**
     * @private
     */
    const doClickNode_ = (ev: Event, node: InternalTreeNode) => {
        if (ev instanceof MouseEvent || ev instanceof TouchEvent) {
            //按住shift多选
            if (ev.shiftKey) {
                if (shiftSelectFirstKey && shiftSelectFirstKey !== node.key) {
                    const mapStructure = source.getMapData();
                    const flagNode = mapStructure.get(shiftSelectFirstKey);
                    if (flagNode) {
                        const flag = flagNode.isChecked;
                        selectRange(shiftSelectFirstKey, node.key, flag);
                    }
                } else {
                    select(node, !node.isChecked);
                }
                shiftSelectFirstKey = node.key;
            } else {
                shiftSelectFirstKey = undefined;
                select(node, !node.isChecked);

                /**
                 * 选中事件
                 *
                 * @param {TreeEventArgs} arg0 参数
                 */
                emit('select', _eventArgs(node));
            }
        }
    };

    /**
     * 将节点挂载到目标节点子节点中
     * @param moveKey 被移动的节点
     * @param targetKey 目标节点
     */
    const move = (moveKey: TreeNodeKey, targetKey: TreeNodeKey) => {
        source.move(moveKey, targetKey);
    };

    /**
     * 将节点挂载到目标节点的下方
     * @param moveKey 被移动的节点
     * @param targetKey 目标节点
     */
    const moveAfter = (moveKey: TreeNodeKey, targetKey: TreeNodeKey) => {
        source.moveAfter(moveKey, targetKey);
    };

    /**
     * 目前支持节点移动撤销
     */
    const revoke = () => {
        source.revoke();
    };

    const getNodeByKey = (key: TreeNodeKey) => {
        const map = source.getMapData();
        return map.get(key);
    };

    /**
     * 撤销,目前只支持拖拽撤销
     */

    /**
     * @private
     */
    const doClickExpandIcon_ = (ev: Event, node: InternalTreeNode) => {
        toggleExpand(node);
    };

    /**
     * @private
     */
    const doOnScrollRendered_ = () => {
        nextTick(() => {
            emit('rendered', _eventArgs());
        });
    };

    /**
     * @private
     */
    const _findElementFromEvent = (ev: DragEvent) => {
        return findElementFromEventByClass(ev, `${cType__}__node`);
    };

    /**
     * @private
     */
    const doDragStart_ = (ev: DragEvent, node: InternalTreeNode) => {
        ev.dataTransfer?.setData('text/plain', node.key + '');
    };

    /**
     * @private
     */
    const doDrop_ = (ev: DragEvent, node: InternalTreeNode) => {
        const dataTransfer = ev.dataTransfer;
        let key: TreeNodeKey | undefined = dataTransfer?.getData('text/plain');
        const nodeContentClassList = _findElementFromEvent(ev)?.classList;
        if (key) {
            if (isNumberStr(key)) {
                key = Number(key);
            }

            if (nodeContentClassList?.contains('is-drop-in')) {
                move(key, node.key);
            } else if (nodeContentClassList?.contains('is-drop-after')) {
                moveAfter(key, node.key);
            }
        }
        nodeContentClassList?.remove('is-drop-in', 'is-drop-after');
    };

    /**
     * @private
     */
    const doDragOver_ = (ev: DragEvent) => {
        const classList = _findElementFromEvent(ev)?.classList;
        if (ev.offsetY * 2 <= obtainRowHeight.value) {
            classList?.add('is-drop-in');
            classList?.remove('is-drop-after');
        } else {
            classList?.add('is-drop-after');
            classList?.remove('is-drop-in');
        }
        ev.preventDefault();
    };

    /**
     * @private
     */
    const doDragLeave_ = (ev: DragEvent) => {
        _findElementFromEvent(ev)?.classList.remove('is-drop-in', 'is-drop-after');
    };

    onBeforeUpdate(() => {
        emit('beforeRender');
    });

    onBeforeMount(() => {
        emit('beforeRender');
    });
    return {
        ...commonExposed,
        theme,
        obtainHasStructure,
        obtainData,
        obtainRowHeight,
        obtainShowSelectIcon,
        obtainShowSwitchIcon,
        obtainShowIcon,
        doClickNode_,
        doClickExpandIcon_,
        doOnScrollRendered_,
        doDragStart_,
        doDragOver_,
        doDragLeave_,
        doDrop_,
        toggleExpand,
        filter,
        selectRange,
        select,
        move,
        moveAfter,
        revoke,
        getNodeByKey
    };
};

export const TreeExpose = [...baseExpose, ...(['filter', 'selectRange', 'select', 'toggleExpand', 'move', 'moveAfter', 'revoke', 'getNodeByKey'] as const)];
export type TreeExposeType = (typeof TreeExpose)[number];
