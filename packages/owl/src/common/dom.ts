import { isString, isUndefined } from 'lodash-es';

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

export {};
