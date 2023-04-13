import { isString, isUndefined } from 'lodash-es';
import type { ComponentPublicInstance, Ref } from 'vue';

export const splitSize = (cssStr: string) => {
    const regex = /(px|em|rem|vw|vh|vmin|vmax)$/g;
    const matchResult = cssStr.match(regex);
    if (matchResult) {
        return {
            num: Number(cssStr.replace(regex, '')),
            unit: matchResult[0]
        };
    }
};

export const toRealType = (value?: unknown) => {
    if (isUndefined(value)) {
        return null;
    } else if (isString(value)) {
        if (value === 'true' || value === 'false') {
            return Boolean(value);
        } else {
            const number = Number(value);
            if (!isNaN(number)) {
                return number;
            } else {
                return value;
            }
        }
    } else {
        return value;
    }
};

export const isVueComponentInstance = (obj: unknown): obj is ComponentPublicInstance => {
    return !!Object.getOwnPropertyDescriptor(obj, '_') && !!Object.getOwnPropertyDescriptor(obj, '$el');
};

export const checkClickOnElements = (els: Array<Ref<HTMLElement | undefined>>, callback: (flag: boolean) => void) => {
    return (event: MouseEvent) => {
        let flag = false;
        const paths = event.composedPath();
        els.forEach((el) => {
            if ((isVueComponentInstance(el.value) && paths.includes(el.value.$el)) || (el.value && paths.includes(el.value))) {
                flag = true;
            }
        });
        if (callback) callback(flag);
    };
};

// export const checkFullScreen = () => {
// 	const _document = document as FullScreenDocument;
// 	let isFull = _document.fullscreenEnabled || _document.webkitIsFullScreen || _document.mozFullScreen || _document.msFullscreenElement || _document.fullscreenElement;
// 	if (isFull == null || isFull == undefined) {
// 		isFull = false;
// 	}
// 	return isFull;
// };

export {};
