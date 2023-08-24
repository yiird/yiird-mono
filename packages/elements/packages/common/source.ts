import { debounce, isFunction, isObject, isString, map } from 'lodash-es';
import { computed, reactive, ref, toRef, watch, type Ref, type UnwrapNestedRefs } from 'vue';
import type {
    FlatTreeOperatorState,
    FlatTreeSourceOptions,
    FlatTreeSourceState,
    InternalTreeNode,
    TreeKeyConfig,
    TreeNodeFinalIcons,
    TreeNodeIconFunction,
    TreeNodeKey,
    TreeNodeSelectIcons,
    TreeNodeSwitchIcons
} from '../types/tree';
import { appendToSet } from './common-util';
import { isStateIcons, isTypeIcons, operatorCheck, operatorExpand } from './tree-utils2';

type SourceOptions<D> = {
    mapping?: Record<string, string>;
    operator?: (d: D) => D;
};

export abstract class ListSource<D> {
    private _data: D[];
    private _options?: SourceOptions<D>;
    private _mappingData: D[];
    private _originalData: any[];
    constructor(data: any[], options?: SourceOptions<D>) {
        this._options = options;
        this._originalData = data;
        this._mappingData = this.mappingArray();
        this._data = this._mappingData;
    }

    private mappingArray() {
        const { mapping, operator } = this._options || {};
        if (mapping) {
            return this._originalData.map((_od) => this.mappingObject(_od, mapping));
        } else {
            if (operator) {
                return this._originalData.map((d) => operator(d));
            } else {
                return this._originalData;
            }
        }
    }

    private mappingObject(originalData: any, mapping: Record<string, string>) {
        const { operator } = this._options || {};
        if (!isObject(originalData)) {
            if (operator) {
                return operator(originalData);
            } else {
                return originalData;
            }
        } else {
            const _data = new Object();
            map(mapping, (originalKey, stableKey) => {
                if (originalKey) {
                    const value = Object.getOwnPropertyDescriptor(originalData, originalKey)?.value;
                    Object.defineProperty(_data, stableKey, {
                        value
                    });
                }
            });
            Object.defineProperty(_data, '__originalData__', {
                value: originalData
            });
            if (operator) return operator(_data as D);
            return _data;
        }
    }

    filter(_filter: (d: D) => boolean): ListSource<D> {
        this._data = this._data.filter(_filter);
        return this;
    }

    sort(_sort: (a: D, b: D) => number) {
        this._data = this._data.sort(_sort);
        return this;
    }

    set data(d: D[]) {
        this._data = d;
    }

    get data(): D[] {
        return this._data;
    }
    set mappingData(d: D[]) {
        this._mappingData = d;
    }

    get mappingData(): D[] {
        return this._mappingData;
    }

    set originalData(d: any[]) {
        this._originalData = d;
    }

    get originalData(): any[] {
        return this._originalData;
    }
}

export class FlatTreeSource {
    private _originalData: Array<any>;
    private _keyConfig: TreeKeyConfig;
    private _initSourceState: FlatTreeSourceState;
    private _sourceState: Ref<FlatTreeSourceState>;
    private _operatorState: UnwrapNestedRefs<FlatTreeOperatorState>;
    private _functionalIcon?: TreeNodeIconFunction;
    private _objectIcon?: TreeNodeFinalIcons;
    private _selectIcons?: TreeNodeSelectIcons;
    private _switchIcons?: TreeNodeSwitchIcons;
    private _defaultExpandFlag: boolean;
    private _defaultExpandKeys?: TreeNodeKey[];
    private _defaultExpandLevel: number;
    private _defaultCheckedKeys?: TreeNodeKey[];
    private _cascade: boolean;
    private _multi: boolean;

    private _snapshot: FlatTreeSourceState[] = [];

    private _cacheFunctionalIcons = new Map<TreeNodeKey, TreeNodeFinalIcons>();

    private _data;

    constructor(originalData: Array<any>, keyConfig: TreeKeyConfig, options: FlatTreeSourceOptions) {
        this._originalData = originalData;
        this._keyConfig = keyConfig;
        this._selectIcons = options.selectIcons;
        this._switchIcons = options.switchIcons;
        this._defaultCheckedKeys = options.defaultCheckedKeys;
        this._defaultExpandKeys = options.defaultExpandKeys;
        this._defaultExpandLevel = options.defaultExpandLevel || -1;
        this._defaultExpandFlag = (this._defaultExpandKeys && this._defaultExpandKeys.length > 0) || this._defaultExpandLevel > -1 ? false : options.defaultExpandFlag;

        this._multi = options.multi;

        if (options.multi) {
            this._cascade = options.cascade;
        } else {
            this._cascade = false;
        }

        if (isFunction(options.icons)) {
            this._functionalIcon = options.icons;
        } else if (isObject(options.icons) || isString(options.icons)) {
            this._objectIcon = options.icons;
        }

        this._initSourceState = this.createState(originalData);
        this._sourceState = ref(this._initSourceState);

        this._operatorState = this.initOperatorState();

        this.handleExpandState();
        this.handleCheckedState();

        this._data = computed(() => {
            return this._sourceState.value.flat.filter((node) => node.isShow);
        });

        const checkState = toRef(this._operatorState, 'checkState');
        const expandState = toRef(this._operatorState, 'expandState');

        watch(checkState, (_checkState) => {
            if (_checkState) {
                this.handleCheckedState();
            }
        });

        watch(expandState, (_expandState) => {
            if (_expandState) {
                this.handleExpandState();
            }
        });
    }

    private initOperatorState() {
        const defaultExpandKeys = this._defaultExpandKeys;
        const defaultExpandLevel = this._defaultExpandLevel;
        const defaultCheckedKeys = this._defaultCheckedKeys;
        const cascade = this._cascade;
        const { map, flat } = this._initSourceState;

        const expandNodes = new Set<InternalTreeNode>();

        const state: FlatTreeOperatorState = {};

        defaultExpandKeys?.forEach((key) => {
            const target = map.get(key);
            if (target) {
                expandNodes.add(target);
            }
        });

        if (defaultExpandLevel > -1) {
            appendToSet(
                expandNodes,
                flat.filter((node) => defaultExpandLevel >= node.level)
            );
        }

        if (expandNodes.size > 0) {
            state.expandState = operatorExpand({
                target: Array.from(expandNodes),
                flag: true
            });
        } else {
            if (this._defaultExpandFlag) {
                state.expandState = {
                    openedKeys: new Set(flat.filter((node) => node.isFolder).map((node) => node.key))
                };
            } else {
                state.expandState = {
                    openedKeys: new Set()
                };
            }
        }

        const checkedNodes = new Set<InternalTreeNode>();

        defaultCheckedKeys?.forEach((key) => {
            const target = map.get(key);
            if (target) {
                checkedNodes.add(target);
            }
        });

        if (checkedNodes.size > 0) {
            state.checkState = operatorCheck({
                target: Array.from(checkedNodes),
                flag: true,
                cascade,
                multi: this._multi
            });
        }

        return reactive<FlatTreeOperatorState>(state);
    }

    private createState(originalData: Array<any>) {
        const map = reactive(this.generateMapStructure(originalData));
        const tree = this.generateTreeStructure(map);
        const flat = this.generateFlatStructure(tree);

        return {
            map,
            tree,
            flat
        };
    }

    private generateFlatStructure(treeStructure: Array<InternalTreeNode>) {
        const flatTreeData: Array<InternalTreeNode> = [];
        let globalIndex = 0;
        const treeNodes = treeStructure;
        const functionalIcon = this._functionalIcon;
        const cacheFunctionalIcons = this._cacheFunctionalIcons;
        const { notChecked } = this._selectIcons || {};
        const defaultExpandFlag = this._defaultExpandFlag;
        const that = this;

        for (const node of treeNodes) {
            node.path = [node.parentKey];
            node.level = 0;
            addNode(node);
            globalIndex++;
        }

        function addNode(node: InternalTreeNode) {
            flatTreeData.push(node);
            node.selectIcon = notChecked;

            if (node.children && node.children.length > 0) {
                node.isFolder = true;
                node.isOpen = defaultExpandFlag;
                const count = node.children.length;

                for (let index = 0; index < count; index++) {
                    const childNode: InternalTreeNode = node.children[index];
                    globalIndex++;
                    childNode.index = globalIndex;
                    childNode.parent = node;
                    childNode.isShow = node.isOpen;
                    childNode.path = [...node.path, childNode.parentKey];
                    childNode.pathNodes = [...node.pathNodes, childNode.parent];
                    childNode.level = node.level + 1;
                    childNode.brotherIndex = index;
                    childNode.brotherCount = count;
                    childNode.isLastInBrother = childNode.brotherIndex === childNode.brotherCount - 1 || childNode.brotherCount === 1;
                    addNode(childNode);
                }
            } else {
                node.isFolder = false;
            }

            if (functionalIcon) {
                cacheFunctionalIcons.set(node.key, functionalIcon(node));
            }

            that.handleIcon(node);
        }

        return flatTreeData;
    }

    private handleIcon(node: InternalTreeNode) {
        const objectIcon = this.getIcon(node);
        if (objectIcon) {
            if (isTypeIcons(objectIcon)) {
                if (node.isFolder) {
                    node.icon = isStateIcons(objectIcon.folder) ? objectIcon.folder.default : objectIcon.folder;
                } else {
                    node.icon = isStateIcons(objectIcon.leaf) ? objectIcon.leaf.default : objectIcon.leaf;
                }
            } else if (isStateIcons(objectIcon)) {
                node.icon = objectIcon.default;
            }
        }
    }

    private handleCheckedState() {
        const { checkState } = this._operatorState;
        const { flat } = this._sourceState.value;
        const { checkedKeys, halfCheckKeys } = checkState || {};
        const { checked, halfChecked, notChecked } = this._selectIcons || {};

        if (checkedKeys) {
            flat.forEach((node) => {
                node.isChecked = checkedKeys.has(node.key);
                if (halfCheckKeys) {
                    node.isHalfCheck = halfCheckKeys.has(node.key);
                } else {
                    node.isHalfCheck = false;
                }

                if (node.isChecked) {
                    if (node.isHalfCheck) {
                        node.selectIcon = halfChecked;
                    } else {
                        node.selectIcon = checked;
                    }
                } else {
                    node.selectIcon = notChecked;
                }
                this.handleIcon(node);
            });
        }
    }

    private handleExpandState() {
        const { open, close } = this._switchIcons || {};
        const { expandState } = this._operatorState;
        const { flat } = this._sourceState.value;
        const { openedKeys } = expandState || {};

        if (openedKeys) {
            flat.forEach((node) => {
                if (node.isFolder) {
                    const isOpen = openedKeys.has(node.key);
                    node.isOpen = isOpen;
                    node.switchIcon = node.isOpen ? open : close;
                    node.children?.forEach((cn) => {
                        cn.isShow = isOpen;
                    });
                }
                const { isOpen, isShow } = node.parent || {};

                if (!node.parent) {
                    node.isShow = true;
                } else {
                    node.isShow = !!isOpen && !!isShow;
                }
            });
        }
    }

    private generateTreeStructure(mapStructure: Map<string | number, InternalTreeNode>): InternalTreeNode[] {
        const treeNodes: InternalTreeNode[] = [];
        mapStructure.forEach((node) => {
            if (node) {
                if (!node.children) {
                    node.children = [];
                }
                const parentNode = mapStructure.get(node.parentKey);
                if (node && parentNode) {
                    if (!parentNode.children) {
                        parentNode.children = [];
                    }
                    parentNode.children.push(node);
                    if (parentNode.children.length === 1) {
                        parentNode.hasOnlyChild = true;
                    }
                } else {
                    treeNodes.push(node);
                }
            }
        });
        return treeNodes;
    }
    private generateMapStructure(originalData: Array<any>) {
        const { key, pkey, tkey, ckey } = this._keyConfig;
        const map = new Map();

        const handleChildren = (data: any) => {
            const node: InternalTreeNode = {
                key: data[key],
                parentKey: data[pkey],
                text: data[tkey],
                hasOnlyChild: false,
                level: 0,
                path: [],
                pathNodes: [],
                children: [],
                index: 0,
                brotherIndex: 0,
                brotherCount: 0,
                isShow: true, // 控制是否显示
                isFolder: false,
                isFocus: false,
                isHalfCheck: false,
                isChecked: false,
                isLastInBrother: false,
                original: data
            };
            map.set(data[key], node);
            if (data[ckey] && data[ckey].length > 0) {
                data[ckey].forEach((cdata: any) => {
                    handleChildren(cdata);
                });
            }
        };

        if (key && pkey && tkey) {
            for (const data of originalData) {
                handleChildren(data);
            }
            return map;
        } else {
            throw new Error('未配置：key、pkey、tkey');
        }
    }

    private getIcon = (node: InternalTreeNode) => {
        return this._cacheFunctionalIcons.get(node.key) || this._objectIcon;
    };

    get operatorState() {
        return this._operatorState;
    }

    get originalData(): any[] {
        return this._originalData;
    }

    filter = debounce((text: string) => {
        if (text) {
            const all = new Set();
            this._initSourceState.flat
                .filter((node) => node.text.indexOf(text) > -1)
                .forEach((node) => {
                    all.add(node.original);
                    node.pathNodes.forEach((pn) => {
                        all.add(pn.original);
                    });
                });
            if (all.size !== 0) {
                const tempOriginalData = Array.from(all);
                this._sourceState.value = this.createState(tempOriginalData);
            }
        } else {
            this._sourceState.value = this._initSourceState;
        }
        return this;
    }, 300);

    select(target: InternalTreeNode | InternalTreeNode[], flag: boolean) {
        const { checkState } = this._operatorState;
        if (target) {
            this._operatorState.checkState = operatorCheck({
                target,
                flag,
                cascade: this._cascade,
                orignalState: checkState,
                multi: this._multi
            });
        }
    }

    expand(target: InternalTreeNode | InternalTreeNode[], flag: boolean) {
        const { expandState } = this._operatorState;
        if (target) {
            this._operatorState.expandState = operatorExpand({
                flag,
                target,
                orignalState: expandState
            });
        }
    }

    moveAfter(moveKey: TreeNodeKey, targetKey: TreeNodeKey) {
        this.snapshot();
        const { flat, map } = this._sourceState.value;
        const all: any[] = [];
        const moveNode = map.get(moveKey);
        if (moveNode) {
            flat.forEach((node) => {
                if (node.key !== moveKey) {
                    if (node.key === targetKey) {
                        moveNode.original[this._keyConfig.pkey] = node.parent?.key;
                        all.push(node.original);
                        all.push(moveNode.original);
                    } else {
                        all.push(node.original);
                    }
                }
            });
        }

        this._sourceState.value = this.createState(all);

        this.handleExpandState();
        this.handleCheckedState();
    }

    move(moveKey: TreeNodeKey, targetKey: TreeNodeKey) {
        this.snapshot();
        const { flat } = this._sourceState.value;
        const all: any[] = [];
        flat.forEach((node) => {
            if (node.key === moveKey) {
                node.original[this._keyConfig.pkey] = targetKey;
            }
            all.push(node.original);
        });

        this._sourceState.value = this.createState(all);

        this.handleExpandState();
        this.handleCheckedState();
    }

    snapshot() {
        this._snapshot.push(this._sourceState.value);
    }

    /**
     * 撤销,目前只支持移动撤销
     */
    revoke() {
        const sourceState = this._snapshot.pop();
        if (sourceState) {
            this._sourceState.value = sourceState;
            this.handleExpandState();
            this.handleCheckedState();
        }
    }

    getMapData() {
        const { map } = this._sourceState.value;
        return map;
    }

    getFlatData() {
        return this._data;
    }
}
