import { isArray } from 'lodash-es';
import type { Action, Affix, LabelValue, TreeNode } from './common-source';

export const isLabelValue = (it: any): it is LabelValue => {
    if (it) {
        const properties = Object.getOwnPropertyNames(it);
        return properties.includes('value') && properties.includes('label');
    }
    return false;
};

export const isAffix = (it: any): it is Affix => {
    if (it) {
        const properties = Object.getOwnPropertyNames(it);
        const otherName = properties.find((it) => !['icon', 'text'].includes(it));
        return properties.length <= 2 && !otherName;
    }
    return false;
};

export const isTreeNode = (it: any): it is TreeNode => {
    if (it) {
        const properties = Object.getOwnPropertyNames(it);
        return properties.includes('key') && properties.includes('parentKey') && properties.includes('text');
    }
    return false;
};

export const isAction = (its: any): its is Action => {
    return its && (its.text || its.icon) && its.fn;
};

export const isActions = (its: any[]): its is Action[] => {
    return isArray(its) && isAction(its[0]);
};

export const isAffixies = (its: any[]): its is Affix[] => {
    return isArray(its) && isAffix(its[0]);
};

export const isLabelValues = (its: any[]): its is LabelValue[] => {
    return isArray(its) && isLabelValue(its[0]);
};

export const isTreeNodes = (its: any[]): its is TreeNode[] => {
    return isArray(its) && isTreeNode(its[0]);
};
