import { parse, stringify } from 'comment-json';
import json2md from 'json2md';
import { isBoolean, isNull, isNumber, isString, isUndefined } from 'lodash-es';
import { I18n } from '../i18n';
import { CallbackArgComment, EmitComment, MarkdownOptions, MethodComment, ParamComment, PropComment, Sfc, SlotComment, TypeComment } from '../types';

export class Markdown {
	private _options: MarkdownOptions;
	private _i18n: I18n;

	constructor(options: MarkdownOptions) {
		this._options = options;
		this._i18n = new I18n(this._options.i18n);
	}

	private _getRenderLangKeys() {
		return this._options.renderLangKeys || ['zh'];
	}

	render(md: string) {
		return '';
	}

	toMardown(json: json2md.DataObject) {
		return json2md(json);
	}

	transform(sfc: Sfc) {
		const result: Record<string, json2md.DataObject> = {};
		this._getRenderLangKeys().forEach((langKey) => {
			result[langKey] = this.transformForLang(langKey, sfc);
		});
		return result;
	}

	transformForLang(langKey: string, sfc: Sfc) {
		const json: Array<unknown> = [];
		json.push({ blockquote: `${sfc.author}  ${sfc.date}` });
		json.push({ h2: `${sfc.name}` });
		json.push(`${sfc.description}`);

		if (sfc.props.length > 0) {
			json.push({ h3: this._i18n.getLabel(langKey, 'messages.component.props') });
			json.push(this._props(langKey, sfc.props));
		}

		if (sfc.slots.length > 0) {
			json.push({ h3: this._i18n.getLabel(langKey, 'messages.component.slots') });
			json.push(this._slots(langKey, sfc.slots));
		}

		if (sfc.methods.length > 0) {
			json.push({ h3: this._i18n.getLabel(langKey, 'messages.component.methods') });
			json.push(this._methods(langKey, sfc.methods));
		}

		if (sfc.emits.length > 0) {
			json.push({ h3: this._i18n.getLabel(langKey, 'messages.component.events') });
			json.push(this._events(langKey, sfc.emits));
		}

		return json;
	}
	private _methods(langKey: string, datas: MethodComment[]): json2md.DataObject {
		const name = this._i18n.getLabel(langKey, `messages.methods.name`);
		const description = this._i18n.getLabel(langKey, `messages.methods.description`);
		const parameters = this._i18n.getLabel(langKey, `messages.methods.parameters`);
		//const syntax = this._i18n.getLabel(langKey, `messages.props.syntax`);
		const rows = datas.map((data) => {
			return {
				[name]: _s(data.name),
				[description]: _s(data.description),
				[parameters]: _args(data.parameters)
			};
		});
		return { table: { headers: [name, description, parameters], rows } };
	}

	private _props(langKey: string, datas: PropComment[]) {
		const name = this._i18n.getLabel(langKey, `messages.props.name`);
		const type = this._i18n.getLabel(langKey, `messages.props.type`);
		const description = this._i18n.getLabel(langKey, `messages.props.description`);
		const required = this._i18n.getLabel(langKey, `messages.props.required`);
		const defaultv = this._i18n.getLabel(langKey, `messages.props.default`);
		const values = this._i18n.getLabel(langKey, `messages.props.values`);
		const rows = datas.map((data) => {
			return {
				[name]: _s(data.name),
				[description]: _s(data.description),
				[type]: _important(_s(data.type)),
				[required]: _s(data.required),
				[defaultv]: _code(_s(data.default)),
				[values]: _s(data.values)
			};
		});
		return { table: { headers: [name, required, defaultv, type, description], rows } };
	}

	private _slots(langKey: string, datas: SlotComment[]) {
		const name = this._i18n.getLabel(langKey, `messages.slots.name`);
		const description = this._i18n.getLabel(langKey, `messages.slots.description`);
		const props = this._i18n.getLabel(langKey, `messages.slots.props`);
		const rows = datas.map((data) => {
			return {
				[name]: _s(data.name),
				[description]: _s(data.description),
				[props]: _args(data.props)
			};
		});
		return { table: { headers: [name, description, props], rows } };
	}

	private _events(langKey: string, datas: EmitComment[]) {
		const name = this._i18n.getLabel(langKey, `messages.events.name`);
		const description = this._i18n.getLabel(langKey, `messages.events.description`);
		const callbackArgs = this._i18n.getLabel(langKey, `messages.events.callbackArgs`);
		const rows = datas.map((data) => {
			return {
				[name]: _s(data.name),
				[description]: _s(data.description),
				[callbackArgs]: _args(data.callbackArgs)
			};
		});
		return { table: { headers: [name, description, callbackArgs], rows } };
	}
}

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

const _propertyComment = (param: ParamComment) => {
	const property = [];
	const name = `${param.name}`;
	const type = `{ ${isString(param.type) ? param.type : param.type?.name} }`;
	property.push('<li>');
	const impText = `${type} ${name}`;
	property.push(`${_important(impText)} ${param.description}`);
	property.push('</li>');
	if (!isString(param.type) && param.type?.children && param.type.children.length > 0) {
		const comments = _typeComment(param.type);
		property.push(comments.join(''));
	}
	return property.join('');
};

const _typeComment = (type: TypeComment) => {
	const result: string[] = [];
	result.push('<li style="list-style: none;">');

	result.push(`<br>&nbsp;&nbsp;&nbsp;&nbsp;${type.name}: ${type.description}`);
	if (type.children.length > 0) {
		for (const property of type.children) {
			result.push('<ul>');
			result.push(_propertyComment(property));
			result.push('</ul>');
		}
	}
	result.push('</li>');
	return result;
};

const _args = (args?: Array<CallbackArgComment>) => {
	if (!args) return '';
	const result = [];
	for (const arg of args) {
		const lines = [];
		lines.push('<ul>');
		lines.push('<li>');
		const name = `${arg.name} `;
		const type = `{ ${isString(arg.type) ? arg.type : arg.type?.name} }`;
		lines.push(_important(`${type} ${name}`));
		lines.push('</li>');
		lines.push('<li style="list-style: none;">');
		lines.push(`${arg.description}`);
		lines.push('</li>');
		if (!isString(arg.type) && arg.type?.children && arg.type.children.length > 0) {
			const comments = _typeComment(arg.type);
			lines.push(comments.join(''));
		}
		lines.push('</ul>');
		result.push(lines.join(''));
	}
	return result.join('<hr style="height:1px;">');
};
