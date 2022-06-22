import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import notJSON from 'not-json';
import { DefaultValue } from '../../parser/comment/basic/PropComment';
import { SfcComment } from '../../parser/comment/basic/SfcComment';
import { TypeComment } from '../../parser/comment/node/TypeComment';
import { MdOptions } from '../../types';
import { AbstractMdPart } from './AbstractMdPart';
import { EventHeaders, PropHeaders, SlotHeaders } from './constanst';
import { Data } from './Style';

export class MdSfcPart extends AbstractMdPart<SfcComment> {
	private _typePart;
	constructor(typePart: AbstractMdPart<TypeComment>, options: MdOptions) {
		super(options);
		this._typePart = typePart;
	}

	toMd(comment: SfcComment, level: number): string {
		const slots = comment.slots;
		const events = comment.events;
		const props = comment.props;
		const methods = comment.methods;
		const styles = this.options.styles;
		let doc = '';

		doc += styles.h(level, comment.name || '');
		doc += styles.line();
		doc += styles.line();
		if (comment.author || comment.date) {
			doc += `${comment.author || ''} ${comment.date || ''}`;
			doc += styles.line();
			doc += styles.line();
		}
		doc += comment.description || '';

		const specialTypes: Set<TypeComment> = new Set();

		if (slots && slots.length > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.h(level + 1, 'Slots');
			doc += styles.line();
			doc += styles.line();
			const headers = SlotHeaders;
			const names = headers.map((header) => header.name);
			const datas: Array<Data> = [];
			slots.forEach((slot) => {
				const record: Data = {};
				const propObject = this._commentToObject(slot);
				Object.keys(propObject)
					.filter((key) => names.includes(key))
					.forEach((name) => {
						if (name === 'args') {
							const _args: string[] = [];
							const _specialTypes: TypeComment[] = [];
							let argsStr = '';
							slot.args?.forEach((arg) => {
								if (arg.type) {
									if (arg.type.name) {
										_args.push(`\`${arg.name}\` { ${arg.type.getFullname()} } ：${arg.description}`);
										if (!arg.type.isBasic()) {
											_specialTypes.push(arg.type);
										}
										_specialTypes.push(...arg.type.getSpecialTypes());
									}
								}
							});
							argsStr += _args.join('<br>');
							if (_specialTypes.length > 0) {
								argsStr += '<br>';
								argsStr += `关联类型：`;
								_specialTypes.forEach((specilType) => {
									specialTypes.add(specilType);
									argsStr += `[${specilType.name}](#${specilType.name?.toLocaleLowerCase()}) `;
								});
							}

							record[name] = argsStr;
						} else {
							record[name] = propObject[name] ? '' + propObject[name] : '';
						}
					});
				datas.push(record);
			});
			doc += this.styles.table(headers, datas);
		}

		if (props && props.length > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.h(level + 1, 'Props');
			doc += styles.line();
			doc += styles.line();
			const headers = PropHeaders;
			const names = headers.map((header) => header.name);
			const datas: Array<Data> = [];
			props.forEach((prop) => {
				const record: Data = {};
				const propObject = this._commentToObject(prop);
				Object.keys(propObject)
					.filter((key) => names.includes(key))
					.forEach((name) => {
						if (name === 'type') {
							const type = prop.type;
							if (type) {
								const typeName = type?.name;

								let typeArgumentName;
								if ('object' === typeName?.toLocaleLowerCase() || 'array' === typeName?.toLocaleLowerCase()) {
									if (type?.typeArguments) {
										const _type = type?.typeArguments[0];
										typeArgumentName = _type.name;
									}
								}
								if (type?.typeArguments) {
									const _type = type?.typeArguments[0];
									if (_type.associationType) {
										_type.associations?.forEach((association) => {
											association.getSpecialTypes().forEach((_stype) => {
												specialTypes.add(_stype);
											});
										});
									} else {
										type.getSpecialTypes().forEach((_stype) => {
											specialTypes.add(_stype);
										});
									}
								}
								record[name] = typeArgumentName ? `[${typeArgumentName}](#${typeArgumentName.toLocaleLowerCase()})` : typeName || '';
							} else {
								record[name] = '';
							}
						} else if (name === 'defaultValue') {
							const defaultValue = propObject[name];
							if (defaultValue) {
								if (isArray(defaultValue)) {
									const dv: string[] = [];
									defaultValue.forEach((_dv) => {
										dv.push(`${_dv.condition ? _dv.condition + '<br>' : ''}${this._code(_dv.value)}`);
									});
									record[name] = dv.join('<br>');
								} else if (isObject(defaultValue)) {
									const dv = defaultValue as DefaultValue;
									record[name] = `${dv.condition ? dv.condition + '<br>' : ''}${this._code(dv.value)}`;
								} else {
									record[name] = `${propObject[name]}`;
								}
							} else {
								record[name] = '';
							}
						} else {
							record[name] = propObject[name] ? '' + propObject[name] : '';
						}
					});
				datas.push(record);
			});

			doc += this.styles.table(headers, datas);
		}

		if (events && events.length > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.h(level + 1, 'Events');
			doc += styles.line();
			doc += styles.line();
			const headers = EventHeaders;
			const names = headers.map((header) => header.name);
			const datas: Array<Data> = [];
			events.forEach((event) => {
				const record: Data = {};
				const propObject = this._commentToObject(event);
				Object.keys(propObject)
					.filter((key) => names.includes(key))
					.forEach((name) => {
						if (name === 'args') {
							const _args: string[] = [];
							const _specialTypes: TypeComment[] = [];
							let argsStr = '';
							event.args?.forEach((arg) => {
								if (arg.type) {
									if (arg.type.name) {
										_args.push(`\`${arg.name}\` { ${arg.type.getFullname()} } ：${arg.description}`);
										if (!arg.type.isBasic()) {
											_specialTypes.push(arg.type);
										}
										_specialTypes.push(...arg.type.getSpecialTypes());
									}
								}
							});
							argsStr += _args.join('<br>');
							if (_specialTypes.length > 0) {
								argsStr += '<br>';
								argsStr += `关联类型：`;
								_specialTypes.forEach((specilType) => {
									argsStr += `[${specilType.name}](#${specilType.name?.toLocaleLowerCase()}) `;
								});
							}

							record[name] = argsStr;
						} else {
							record[name] = propObject[name] ? '' + propObject[name] : '';
						}
					});
				datas.push(record);
			});
			doc += this.styles.table(headers, datas);
		}

		if (methods && methods.length > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.h(level + 1, 'Methods');
			methods.forEach((method) => {
				doc += styles.line();
				doc += styles.line();
				if (method.isPrivate) {
					return;
				}
				doc += styles.h(level + 2, method.name || '');
				const _parameters: string[] = [];
				const _specialTypes: TypeComment[] = [];
				method.parameters?.forEach((parameter) => {
					if (parameter.type) {
						if (parameter.type.name) {
							_parameters.push(`${parameter.name}:${!parameter.isRequired ? '?' : ''} ${parameter.type.getFullname()}`);
							if (!parameter.type.isBasic()) {
								_specialTypes.push(parameter.type);
							}
							_specialTypes.push(...parameter.type.getSpecialTypes());
						}
					}
				});
				doc += `(${_parameters.join(',')})`;
				doc += styles.line();
				doc += styles.t(0, `- 用法： ${method.description || ''}`);

				if (method.parameters && method.parameters.length > 0) {
					doc += styles.line();
					doc += styles.t(0, `- 参数：`);
					method.parameters?.forEach((parameter) => {
						doc += styles.line();
						doc += styles.t(1, `- ${parameter.name}： ${parameter.description || ''}`);
					});
				}

				if (_specialTypes.length > 0) {
					doc += styles.line();
					doc += styles.t(0, `- 关联类型：`);
					_specialTypes.forEach((specilType) => {
						specialTypes.add(specilType);
						doc += styles.line();
						doc += styles.t(1, `- [${specilType.name}](#${specilType.name?.toLocaleLowerCase()})`);
					});
				}
			});
		}

		if (specialTypes.size > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.h(level + 1, '关联类型');
			doc += styles.line();
			doc += styles.line();
			specialTypes.forEach((type) => {
				doc += styles.line();
				doc += this._typePart.toMd(type, level + 2);
			});
		}

		return doc;
	}

	private _code(str: string) {
		try {
			const jsonStr = notJSON.parse(str.trim());
			const json = JSON.stringify(jsonStr, null, 2);
			return `<pre>${json.replace(/[\n|\r]+/g, '<br>')}</pre>`;
		} catch (e) {
			return str;
		}
	}
}
