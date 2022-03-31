import { parse, stringify } from 'comment-json';
import json2md from 'json2md';
import { isBoolean, isNull, isNumber, isString, isUndefined } from 'lodash-es';
import { CallbackArgComment, PropertyComment, Sfc } from '../types';

export const transform = (sfc: Sfc): string => {
	const props = sfc.props.map((prop) => {
		return {
			name: _s(prop.name),
			type: _important(_s(prop.type)),
			description: _s(prop.description),
			required: _s(prop.required),
			default: _code(_s(prop.default))
		};
	});

	const slots = sfc.slots.map((slot) => {
		return {
			name: _s(slot.name),
			description: _s(slot.description),
			callbackArgs: !slot.callbackArgs || _callbackArgs(slot.callbackArgs)
		};
	});

	const json: Array<unknown> = [{ h2: _s(sfc.name) }, { p: _s(sfc.description) }];

	if (props.length > 0) {
		json.push({ h3: 'Props' });
		json.push({ table: { headers: ['name', 'required', 'default', 'type', 'description'], rows: props } });
	}

	if (slots.length > 0) {
		json.push({ h3: 'Slots' });
		json.push({ table: { headers: ['name', 'description', 'callbackArgs'], rows: slots } });
	}

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

const _toJson = (str: string) => {
	try {
		const jsonStr = str.replace(/[\s]{0,1}([\w]+)\s*:\s*[']{0,1}([\u4e00-\u9fa5\w\s]*)[']{0,1}/g, '"$1":"$2"').replace(/("'|'")/g, '"');
		const json = parse(jsonStr, undefined, false);
		return json;
	} catch (e) {
		return str;
	}
};

const _code = (str: string) => {
	try {
		const json = _toJson(str);
		if (isString(json) || isNumber(json) || isBoolean(json) || isNull(json) || isUndefined(json)) {
			throw new Error();
		}
		return `<pre>${stringify(json, null, 2).replace(/[\n|\r]+/g, '<br>')}</pre>`;
	} catch (e) {
		return str;
	}
};

const _property = (properties: PropertyComment[]) => {
	const obj: Record<string, string | unknown> = {};
	for (const property of properties) {
		if (isString(property.type)) {
			obj[property.name] = _toJson(property.type);
		} else {
			obj[property.name] = _property(property.type);
		}
	}
	return obj;
};

const _callbackArgs = (args: CallbackArgComment[]) => {
	const result = [];
	for (const arg of args) {
		if (isString(arg.type)) {
			result.push(`${_important(arg.name)} { ${arg.type} } ${arg.description}`);
		} else {
			// 处理 arg.type is array
		}
	}

	return '';
};
