import { parse, stringify } from 'comment-json';
import json2md from 'json2md';
import { isBoolean, isNull, isNumber, isString, isUndefined } from 'lodash-es';
import { Sfc } from '../types';

export const transform = (sfc: Sfc): string => {
	const props = sfc.props?.map((prop) => {
		return {
			name: _s(prop.name),
			type: _important(_s(prop.type)),
			description: _s(prop.description),
			required: _s(prop.required),
			default: _code(_s(prop.default))
		};
	});

	const json = [{ h2: _s(sfc.name) }, { p: _s(sfc.description) }, { h3: 'Props' }, { table: { headers: ['name', 'required', 'default', 'type', 'description'], rows: props } }];

	let md = '';
	try {
		md = json2md(json);
	} catch (e) {
		console.log(e);
	}

	return md;
};

const _s = (data: unknown) => {
	let str = data ? data + '' : '';
	if (str !== '') {
		str = str.trim();
	}
	return str;
};

const _important = (str: string) => {
	return `\`${str}\``;
};

const _code = (str: string) => {
	try {
		const jsonStr = str.replace(/([ |\t]{1}([\w]+)[ |\t]*):/g, '"$1":').replace(/"\s*(\w+)\s*":/g, '"$1":');
		const json = parse(jsonStr, undefined, false);
		if (isString(json) || isNumber(json) || isBoolean(json) || isNull(json) || isUndefined(json)) {
			throw new Error();
		}
		return `<pre>${stringify(json, null, 2).replace(/[\n|\r]+/g, '<br>')}</pre>`;
	} catch (e) {
		return str;
	}
};
