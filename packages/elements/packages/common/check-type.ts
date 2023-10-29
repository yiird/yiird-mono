import { isObject as _isObject, isArray } from 'lodash-es';
import type { Affix } from '../types/components';
import type { LimitDimensions } from '../types/global';
import type { LabelValue, TreeNode } from './common-source';

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
        return properties.includes('icon') || properties.includes('text') || (properties.includes('fn') && properties.includes('kind'));
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

export const isAffixies = (its: any[]): its is Affix[] => {
    return isArray(its) && isAffix(its[0]);
};

export const isLabelValues = (its: any[]): its is LabelValue[] => {
    return isArray(its) && isLabelValue(its[0]);
};

export const isTreeNodes = (its: any[]): its is TreeNode[] => {
    return isArray(its) && isTreeNode(its[0]);
};

export const isLimitDimensions = (it: any): it is LimitDimensions => {
    if (_isObject(it)) {
        const properties = Object.getOwnPropertyNames(it);
        return properties.includes('min') || properties.includes('max');
    }
    return false;
};
