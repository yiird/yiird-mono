import type { ClientRectObject, VirtualElement } from '@floating-ui/vue';
import { isElement as _isElement, isNumber, isString } from 'lodash-es';
import type { YComponentInstance } from 'packages/types';
import type { PopoverReference } from 'packages/types/popover';
import type { ComponentPublicInstance } from 'vue';
import type { ThemeConfig } from '../types/theme';

export const getElementById = (id: string) => document.getElementById(id);

export const styleValueToNumber = (value: string | number) => {
    return isNumber(value) ? value : parseFloat(value);
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

export const findElementFromEventByClass = <E extends Element | undefined>(ev: Event, clazz: string) => {
    return <E>ev.composedPath().find((it) => (it as Element).classList.contains(clazz));
};

export const isVirtualElement = (ve: any): ve is VirtualElement => {
    return !!ve.getBoundingClientRect;
};

export const isComponentInstance = (it: any): it is ComponentPublicInstance => {
    return it.$ && it.$props && it.$data && it.$root;
};

export const isYComponentInstance = (it: any): it is YComponentInstance => {
    return it.cType__;
};

export const extractEl = (reference?: PopoverReference) => {
    let el: Element | null | undefined;

    if (isString(reference)) {
        el = document.querySelector(reference);
    } else if (isElement(reference)) {
        el = reference as Element;
    } else if (isComponentInstance(reference)) {
        el = reference.$el;
    } else {
        el = reference?.el.value;
    }

    return el;
};

export const toStyleValue = (value: any, defaultValue: any = 'unset', unit: string = 'px') => {
    return value ? (isNumber(value) ? `${value}${unit}` : value) : defaultValue;
};

export const coverRects = (...rects: (DOMRect | ClientRectObject)[]) => {
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

export const checkPointInRect = (point: { x: number; y: number }, rect: DOMRect | ClientRectObject) => {
    const { x, y } = point;
    return rect.left < x && rect.left + rect.width > x && rect.top < y && rect.top + rect.height > y;
};

/**
 * 判断区域所组成的最小范围内，是否覆盖给定的点
 * @param point 点
 * @param rects 区域
 */
export const checkPointInCoverRects = (point: { x: number; y: number }, ...rects: (DOMRect | ClientRectObject)[]) => {
    const { min, max } = coverRects(...rects);
    const { x, y } = point;

    return min[0] < x && max[0] > x && min[1] < y && max[1] > y;
};

export const checkPointInOneRect = (point: { x: number; y: number }, ...rects: (DOMRect | ClientRectObject)[]) => {
    return !!rects.find((rect) => checkPointInRect(point, rect));
};

export const updateRootStyle = (key: string, content: string) => {
    const style = document.querySelector(`[${key}]`);
    if (style) {
        style.textContent = content;
    } else {
        const insertStyle = document.createElement('style');
        insertStyle.setAttribute('type', 'text/css');
        insertStyle.setAttribute(key, '');
        insertStyle.textContent = content;
        document.head.append(insertStyle);
    }
};

export const rootStyleVariables = (theme: ThemeConfig) => {
    return `
:root{
    --ye-font-size: ${theme?.ye_fontSize}px;
    --ye-font-family: ${theme?.ye_fontFamily};
    --ye-font-weight-light: 400;
    --ye-font-weight-regular: 500;
    --ye-font-weight-bold: 600;
    --ye-boxshadow-high-up: 0px -6px 16px -8px rgba(0, 0, 0, 0.08), 0px -9px 28px 0px rgba(0, 0, 0, 0.05), 0px -12px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-down: 0px 6px 16px -8px rgba(0, 0, 0, 0.08), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-left: -6px 0px 16px -8px rgba(0, 0, 0, 0.08), -9px 0px 28px 0px rgba(0, 0, 0, 0.05), -12px 0px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-right: 6px 0px 16px -8px rgba(0, 0, 0, 0.08), 9px 0px 28px 0px rgba(0, 0, 0, 0.05), 12px 0px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-middle-up: 0px -3px 6px -4px rgba(0, 0, 0, 0.12), 0px -6px 16px 0px rgba(0, 0, 0, 0.08), 0px -9px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-down: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-left: -3px 0px 6px -4px rgba(0, 0, 0, 0.12), -6px 0px 16px 0px rgba(0, 0, 0, 0.08), -9px 0px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-right: 3px 0px 6px -4px rgba(0, 0, 0, 0.12), 6px 0px 16px 0px rgba(0, 0, 0, 0.08), 9px 0px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-low-up: 0px -1px 2px -2px rgb(0 0 0 / 16%), 0px -3px 6px 0px rgb(0 0 0 / 12%), 0px -5px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-down: 0px 1px 2px -2px rgb(0 0 0 / 16%), 0px 3px 6px 0px rgb(0 0 0 / 12%), 0px 5px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-left: -1px 0px 2px -2px rgb(0 0 0 / 16%), -3px 0px 6px 0px rgb(0 0 0 / 12%), -5px 0px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-right: 1px 0px 2px -2px rgb(0 0 0 / 16%), 3px 0px 6px 0px rgb(0 0 0 / 12%), 5px 0px 12px 4px rgb(0 0 0 / 9%);
}
            `;
};

export const isUrl = (str: any) => {
    try {
        new URL(str);
        return true;
    } catch (err) {
        return false;
    }
};
