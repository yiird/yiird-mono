import jsb from 'js-beautify';
import { camelCase, isArray, isObject, isString, snakeCase, upperFirst } from 'lodash-es';
import { Utils } from '../../common/Utils';
import { DefaultValue } from '../../parser/comment/basic/PropComment';
import { SfcComment } from '../../parser/comment/basic/SfcComment';
import { TypeComment } from '../../parser/comment/node/TypeComment';
import { MdOptions } from '../../types';
import { AbstractMdPart } from './AbstractMdPart';
import { Data } from './Style';
import { EventHeaders, PropHeaders, SlotHeaders } from './constanst';

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
        const styles = this.options.styles!;
        let doc = '';

        if (comment.vitepress_frontmatter) {
            doc += comment.vitepress_frontmatter;
            doc += styles.line();
            doc += styles.line();
        }

        doc += styles.h(level, comment.name || '');
        doc += styles.line();
        comment.additional?.forEach((block) => {
            doc += block;
            doc += styles.line();
        });
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
                                        _args.push(`\`${arg.name}\` { ${arg.type.getFullname()} } ：${styles.html(arg.description || '')}`);
                                        if (!arg.type.isBasic()) {
                                            _specialTypes.push(arg.type);
                                        }
                                        _specialTypes.push(...arg.type.getSpecialTypes([]));
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
                        } else if (name === 'description') {
                            record[name] = styles.html(slot.description || '');
                        } else {
                            record[name] = propObject[name] ? '' + propObject[name] : '';
                        }
                    });
                datas.push(record);
            });
            doc += this.styles.table(headers, datas, 'slots');
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
                if (prop.isPrivate) {
                    return;
                }
                const record: Data = {};
                const propObject = this._commentToObject(prop);
                Object.keys(propObject)
                    .filter((key) => names.includes(key))
                    .forEach((name) => {
                        if (name === 'name') {
                            const propName = prop.name ? snakeCase(prop.name).replaceAll('_', '-') : '';
                            record[name] = prop.isRequired ? propName + '<br /><span>(*)</span>' : propName + '';
                        } else if (name === 'type') {
                            const type = prop.type;
                            if (type) {
                                const typeName = type?.name;

                                let typeArgumentName;
                                const typeNameLower = typeName?.toLocaleLowerCase();
                                if ('object' === typeNameLower || 'array' === typeNameLower) {
                                    if (type?.typeArguments) {
                                        const _type = type?.typeArguments[0];
                                        if (_type?.typeArguments) {
                                            typeArgumentName = _type.text;
                                        } else {
                                            typeArgumentName = _type.name;
                                        }
                                    }
                                }
                                const mdTypes: string[] = [];
                                if (type?.typeArguments) {
                                    const _type = type.typeArguments[0];
                                    if (_type.associationType) {
                                        const specials = this._handleSpecialTypeWithAssociationType(_type, specialTypes);
                                        if ('string' !== typeNameLower) {
                                            _type.text?.split('|').forEach((t_text) => {
                                                t_text = t_text.trim();
                                                const spType = specials.find((t) => t.name === t_text);
                                                if (spType) {
                                                    mdTypes.push(`[${t_text}](#${t_text.toLocaleLowerCase()})`);
                                                } else {
                                                    mdTypes.push(t_text);
                                                }
                                            });
                                        }
                                    } else {
                                        type.getSpecialTypes([]).forEach((_stype) => {
                                            specialTypes.add(_stype);
                                        });
                                    }
                                }
                                if (mdTypes.length > 0) {
                                    record[name] = mdTypes.map((type) => upperFirst(camelCase(type))).join(',');
                                } else {
                                    if ('array' === typeNameLower) {
                                        if (typeArgumentName && Utils.isBasicType(typeArgumentName)) {
                                            record[name] = typeArgumentName ? `${typeArgumentName}[]` : typeName || '';
                                        } else {
                                            record[name] = typeArgumentName ? `[${typeArgumentName}](#${typeArgumentName.toLocaleLowerCase()})[]` : typeName || '';
                                        }
                                    } else {
                                        record[name] = typeArgumentName ? `[${typeArgumentName}](#${typeArgumentName.toLocaleLowerCase()})` : typeName || '';
                                    }
                                }
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
                        } else if (name === 'description') {
                            record[name] = styles.html(prop.description || '');

                            const defaultValue = propObject['defaultValue'];
                            if (defaultValue) {
                                record[name] += '<hr>';
                                record[name] += '默认值:';
                                record[name] += '<br>';
                                if (isArray(defaultValue)) {
                                    const dv: string[] = [];
                                    defaultValue.forEach((_dv) => {
                                        dv.push(`${_dv.condition ? _dv.condition + '<br>' : ''}${this._code(_dv.value)}`);
                                    });
                                    record[name] += dv.join('<br>');
                                } else if (isObject(defaultValue)) {
                                    const dv = defaultValue as DefaultValue;
                                    record[name] += `${dv.condition ? dv.condition + '<br>' : ''}${this._code(dv.value)}`;
                                } else if (isString(defaultValue)) {
                                    record[name] += `${this._code(defaultValue)}`;
                                }
                            }
                        } else if (name === 'values') {
                            if (prop.values && prop.values.length > 0) {
                                record[name] =
                                    '`' +
                                    prop.values
                                        .join(',')
                                        .replaceAll(/(\s*)('|"|`)(\s*)/g, '')
                                        .replaceAll(',', '` , `') +
                                    '`';
                            } else {
                                record[name] = '';
                            }
                        } else {
                            record[name] = propObject[name] ? '' + propObject[name] : '';
                        }
                    });
                datas.push(record);
            });

            doc += this.styles.table(headers, datas, 'props');
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
                if (event.isPrivate) {
                    return;
                }
                const record: Data = {};
                const propObject = this._commentToObject(event);
                Object.keys(propObject)
                    .filter((key) => names.includes(key))
                    .forEach((name) => {
                        if (name === 'name') {
                            const propName = event.name ? snakeCase(event.name).replaceAll('_', '-') : '';
                            record[name] = propName;
                        } else if (name === 'args') {
                            const _args: string[] = [];
                            const _specialTypes: TypeComment[] = [];
                            let argsStr = '';
                            event.args?.forEach((arg) => {
                                if (arg.type) {
                                    if (arg.type.name) {
                                        _args.push(`\`${arg.name}\` { ${arg.type.getFullname()} } ：${styles.html(arg.description || '')}`);
                                        if (!arg.type.isBasic()) {
                                            _specialTypes.push(arg.type);
                                        }
                                    }
                                }
                            });
                            argsStr += _args.join('<br>');
                            if (_specialTypes.length > 0) {
                                argsStr += '<br>';
                                argsStr += `关联类型：`;
                                _specialTypes.forEach((specilType) => {
                                    argsStr += `[${specilType.name}](#${specilType.name?.toLocaleLowerCase()}) `;
                                    specialTypes.add(specilType);
                                    specilType.getSpecialTypes([]).forEach((value) => {
                                        specialTypes.add(value);
                                    });
                                });
                            }

                            record[name] = argsStr;
                        } else {
                            record[name] = propObject[name] ? '' + propObject[name] : '';
                        }
                    });
                datas.push(record);
            });
            doc += this.styles.table(headers, datas, 'events');
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
                        if (parameter.type.name || parameter.type.associationType) {
                            _parameters.push(`${parameter.name}:${!parameter.isRequired ? '?' : ''} ${parameter.type.getFullname()}`);
                        }

                        if (!parameter.type.isBasic()) {
                            _specialTypes.push(parameter.type);
                        }
                        _specialTypes.push(...parameter.type.getSpecialTypes([]));
                    }
                });
                doc += `(${_parameters.join(',')})`;
                doc += styles.line();
                doc += styles.t(0, `- 用法： ${styles.html(method.description || '')}`);

                if (method.parameters && method.parameters.length > 0) {
                    doc += styles.line();
                    doc += styles.t(0, `- 参数：`);
                    method.parameters?.forEach((parameter) => {
                        doc += styles.line();
                        doc += styles.t(1, `- ${parameter.name}： ${parameter.description}`);
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
            const exists: string[] = [];
            specialTypes.forEach((type) => {
                if (type.name && !exists.includes(type.name)) {
                    if (type.associations || type.properties) {
                        doc += styles.line();
                        doc += this._typePart.toMd(type, level + 2);
                    }
                    exists.push(type.name);
                }
            });
        }

        return doc;
    }
    private _handleSpecialTypeWithAssociationType(_type: TypeComment, specialTypes: Set<TypeComment>) {
        const arr: TypeComment[] = [];
        _type.associations?.forEach((association) => {
            association.getSpecialTypes([]).forEach((_stype) => {
                arr.push(_stype);
            });
            if (!association.isBasic() && !association.associationType) {
                arr.push(association);
            }
        });
        arr.forEach((item) => {
            specialTypes.add(item);
        });
        return arr;
    }

    private _code(str: string) {
        return `<pre>${jsb.js(str, { indent_size: 2 }).replace(/[\n|\r]+/g, '<br>')}</pre>`;
    }
}
