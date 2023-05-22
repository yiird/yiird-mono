import { isElement as _isElement } from 'lodash-es';

export const getElementById = (id: string) => document.getElementById(id);

export const styleValueToNumber = (value: string) => {
    return parseFloat(value);
};

export const getTargetHeight = (target: Element) => {
    return styleValueToNumber(getComputedStyle(target).height);
};

export const getTargetHeightById = (targetId: string) => {
    const target = getElementById(targetId);
    if (target) return styleValueToNumber(getComputedStyle(target).height);
    else return 0;
};

export const isElement = (it: any): it is Element => {
    return _isElement(it);
};
