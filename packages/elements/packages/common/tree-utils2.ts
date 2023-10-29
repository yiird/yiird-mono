import { isArray, union } from 'lodash-es';
import type { CheckOptions, CheckState, ExpandOptions, ExpandState, InternalTreeNode, TreeNodeStateIcons, TreeNodeTypeIcons } from '../types/components';
import { appendToSet } from './common-util';

export const operatorCheck = (options: CheckOptions) => {
    const { orignalState, flag, multi } = options;
    const state: CheckState = {
        checkedKeys: new Set(),
        halfCheckKeys: new Set()
    };

    let target = options.target;

    if (!multi && isArray(target)) {
        target = target[0];
    }

    if (multi) {
        if (orignalState?.checkedKeys) {
            appendToSet(state.checkedKeys, orignalState.checkedKeys);
        }

        if (orignalState?.halfCheckKeys) {
            appendToSet(state.halfCheckKeys, orignalState.halfCheckKeys);
        }
    }

    if (isArray(target)) {
        target.forEach((node) => {
            if (flag !== node.isChecked) {
                operatorCheckSingle(node, state, options);
            }
        });
        return state;
    } else {
        if (flag !== target.isChecked) {
            operatorCheckSingle(target, state, options);
        }
    }

    return state;
};

/**
 * 单节点选中/取消选中产生的selectKeys 和 halfCheckedKeys
 */
const operatorCheckSingle = (target: InternalTreeNode, state: CheckState, options: CheckOptions) => {
    const { flag, cascade } = options;
    const { checkedKeys } = state;
    const targetKey = target.key;

    if (flag) {
        checkedKeys.add(targetKey);
    } else {
        checkedKeys.delete(targetKey);
    }

    if (cascade) {
        cascadeChildren(target, state, options);
        cascadeParent(target, state, options);
    }
};

const cascadeChildren = (target: InternalTreeNode, state: CheckState, options: CheckOptions) => {
    const { flag } = options;
    const { checkedKeys, halfCheckKeys } = state;
    const childrenKeys = (target.children as InternalTreeNode[]).map((node) => {
        cascadeChildren(node, state, options);
        return node.key;
    });
    if (flag) {
        appendToSet(checkedKeys, childrenKeys);
        halfCheckKeys.delete(target.key);
    } else {
        childrenKeys.forEach((key) => {
            checkedKeys.delete(key);
        });
    }
};

const cascadeParent = (target: InternalTreeNode, state: CheckState, options: CheckOptions) => {
    const { flag } = options;
    const { checkedKeys, halfCheckKeys } = state;
    const { parent, parentKey: pkey } = target;
    if (parent) {
        const targetBrothers = parent.children;
        if (!targetBrothers) return;

        if (flag) {
            const targetBrotherFullChecked = targetBrothers.filter((node) => {
                const key = node.key;
                return (checkedKeys.has(key) && !halfCheckKeys.has(key)) || (node.isChecked && !node.isHalfCheck);
            });

            if (targetBrothers.length > targetBrotherFullChecked.length) {
                checkedKeys.add(pkey);
                halfCheckKeys.add(pkey);
            } else if (targetBrothers.length == targetBrotherFullChecked.length) {
                checkedKeys.add(pkey);
                halfCheckKeys.delete(pkey);
            }
        } else {
            const targetBrotherChecked = targetBrothers.filter((node) => {
                const key = node.key;
                return checkedKeys.has(key);
            });

            if (0 === targetBrotherChecked.length) {
                checkedKeys.delete(pkey);
                halfCheckKeys.delete(pkey);
            } else if (targetBrothers.length >= targetBrotherChecked.length) {
                halfCheckKeys.add(pkey);
            }
        }

        cascadeParent(parent, state, options);
    }
};

export const operatorExpand = (options: ExpandOptions) => {
    const { target, flag, orignalState } = options;

    const targets = isArray(target) ? target : [target];

    const state: ExpandState = {
        openedKeys: new Set()
    };

    if (orignalState?.openedKeys) {
        appendToSet(state.openedKeys, orignalState.openedKeys);
    }

    if (flag) {
        appendToSet(state.openedKeys, union(...targets.filter((node) => node.isFolder).map((node) => [node.key, ...node.path])));
    } else {
        const deleted = targets.map((node) => node.key);
        deleted.forEach((key) => {
            state.openedKeys.delete(key);
        });
    }

    return state;
};

export const isStateIcons = (it: any): it is TreeNodeStateIcons => {
    return it['default'] || it['selected'];
};

export const isTypeIcons = (it: any): it is TreeNodeTypeIcons => {
    return it['folder'] || it['leaf'];
};
