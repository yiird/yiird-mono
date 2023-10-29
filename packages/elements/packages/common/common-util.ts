import { isArray, isNaN, isSet } from 'lodash-es';
import { IS_DARK, USER_THEME_VARS } from '../config';
import type { UserThemeVars } from '../types/global';

export const isNumberStr = (v: any) => {
    try {
        return !isNaN(Number(v));
    } catch (e) {
        return false;
    }
};

export const appendToSet = <T>(target: Set<T>, items: Set<T> | T[] | T) => {
    if (isSet(items) || isArray(items)) {
        items.forEach((item) => target.add(item));
    } else {
        target.add(items);
    }
};

export const insertArray = <T>(arr: T[], it: T, step: number = 1): T[] => {
    const result: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        if (i < arr.length - 1 && i % step === 0) {
            result.push(it);
        }
    }
    return result;
};

export const setDark = (isDark: boolean) => {
    IS_DARK.value = isDark;
};

export const setThemeVars = (themeVars: UserThemeVars) => {
    USER_THEME_VARS.value = themeVars;
};
