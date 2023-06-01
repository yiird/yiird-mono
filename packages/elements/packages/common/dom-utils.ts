import { isElement as _isElement, isNumber } from 'lodash-es';

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

export const toStyleValue = (value: any, defaultValue: any = 'unset', unit: string = 'px') => {
    return value ? (isNumber(value) ? `${value}${unit}` : value) : defaultValue;
};

export const coverRects = (...rects: DOMRect[]) => {
    const x_min = Math.min(...rects.map((rect) => rect.x));
    const y_min = Math.min(...rects.map((rect) => rect.y));
    const x_max = Math.max(...rects.map((rect) => rect.x + rect.width));
    const y_max = Math.max(...rects.map((rect) => rect.y + rect.height));
    return {
        min: [x_min, y_min],
        max: [x_max, y_max],
        x: x_min,
        y: y_min,
        width: x_max - x_min,
        height: y_max - y_min
    };
};

export const checkPointInRect = (point: { x: number; y: number }, rect: DOMRect) => {
    const { x, y } = point;
    return rect.left < x && rect.left + rect.width > x && rect.top < y && rect.top + rect.height > y;
};

/**
 * 判断区域所组成的最小范围内，是否覆盖给定的点
 * @param point 点
 * @param rects 区域
 */
export const checkPointInCoverRects = (point: { x: number; y: number }, ...rects: DOMRect[]) => {
    const { min, max } = coverRects(...rects);
    const { x, y } = point;

    return min[0] < x && max[0] > x && min[1] < y && max[1] > y;
};

export const checkPointInOneRect = (point: { x: number; y: number }, ...rects: DOMRect[]) => {
    return !!rects.find((rect) => checkPointInRect(point, rect));
};
