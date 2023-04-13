import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { intervalToDuration, parseISO } from 'date-fns';
import { isDate, isString } from 'lodash-es';

// export function hash(text: string) {

// 	let hash = 5381,
// 		index = text.length;

// 	while (index) {
// 		hash = (hash * 33) ^ text.charCodeAt(--index);
// 	}

// 	return hash >>> 0;
// }

export const transforDate = (date?: string | Date) => {
    let _date: Date | undefined;
    if (isDate(date)) {
        _date = date;
    } else if (isString(date)) {
        const __date = parseISO(date);
        __date + '' === 'Invalid Date' || (_date = __date);
    }
    return _date;
};

export const isIconDefinition = (obj: unknown): obj is IconDefinition => {
    return !!Object.getOwnPropertyDescriptor(obj, 'iconName') && !!Object.getOwnPropertyDescriptor(obj, 'prefix');
};

export const secondFormatHMS = (second: number) => {
    const {
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    } = intervalToDuration({
        start: new Date(second * 1000),
        end: new Date(0)
    });

    const totalHours = days * 24 + hours;
    const arr = [];
    if (totalHours > 0) arr.push((totalHours + '').padStart(2, '0'));
    arr.push((minutes + '').padStart(2, '0'));
    arr.push((seconds + '').padStart(2, '0'));
    return arr.join(':');
};
