import { parse, stringify } from 'comment-json';
import json2md from 'json2md';
import { isBoolean, isNull, isNumber, isString, isUndefined } from 'lodash-es';
import { CallbackArgComment, Sfc, TypeComment } from '../types';

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

const _property = (propComment: TypeComment, deep: number) => {
	const result: string[] = [];
	result.push('<li style="list-style: none;">');
	result.push(`<br>&nbsp;&nbsp;&nbsp;&nbsp;${propComment.type}: ${propComment.description}`);
	result.push('<ul>');
	for (let i = 0; i < propComment.children.length; i++) {
		const property = propComment.children[i];
		result.push('<li>');
		result.push(`${_important(property.name)} { ${isString(property.type) ? property.type : 'Object'} } ${property.description}`);
		result.push('</li>');
		if (property.children.length > 0) {
			const comments = _property(property, deep + 1);
			result.push(comments.join(''));
		}
	}
	result.push('</ul>');
	result.push('</li>');
	return result;
};

const MARKS = ['&#x25CF;', '&#x25CE;', '&#x25CC;'];

const _callbackArgs = (args: CallbackArgComment[]) => {
	const result = [];
	for (const arg of args) {
		const lines = [];
		lines.push('<ul>');
		lines.push('<li>');
		lines.push(`${arg.name} { ${isString(arg.type) ? arg.type : arg.type?.type} }`);
		lines.push('</li>');
		lines.push('<li style="list-style: none;">');
		lines.push(`${arg.description}`);
		lines.push('</li>');
		if (!isString(arg.type) && arg.type?.children && arg.type.children.length > 0) {
			const comments = _property(arg.type, 1);
			lines.push(comments.join(''));
		}
		lines.push('</ul>');
		result.push(lines.join(''));
	}
	return result.join('<hr style="height:1px;">');
};
