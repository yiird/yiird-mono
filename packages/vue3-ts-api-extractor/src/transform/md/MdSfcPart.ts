import jsb from 'js-beautify';
import { isArray, isObject, isString, snakeCase } from 'lodash-es';
import { DefaultValue } from '../../parser/comment/basic/PropComment';
import { SfcComment } from '../../parser/comment/basic/SfcComment';
import { TypeComment } from '../../parser/comment/node/TypeComment';
import { MdOptions } from '../../types';
import { AbstractMdPart } from './AbstractMdPart';
import { MdPartFactory } from './MdPartFactory';
import { Data } from './Style';
import { EventHeaders, PropHeaders, SlotHeaders } from './constanst';

export class MdSfcPart extends AbstractMdPart<SfcComment> {
    private _typePart;
    private _typeTextPart;
    constructor(options: MdOptions) {
        super(options);
        this._typePart = MdPartFactory.createTypePart(options);
        this._typeTextPart = MdPartFactory.createTypeTextPart(options);
    }

    toMd(comment: SfcComment, level: number) {
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
                            slot.args?.forEach((arg) => {
                                if (arg.type) {
                                    const resolved = this._typeTextPart.toMd(arg.type);
                                    _args.push(`\`${arg.name}\` { ${resolved.md} } ：${styles.html(arg.description || '')}`);
                                    resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
                                }
                            });
                            record[name] = _args.join('<br/>');
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
                            let propName = prop.name ? snakeCase(prop.name).replaceAll('_', '-') : '';

                            if (prop.isModel) {
                                propName = propName ? `v-model:${propName}` : 'v-model';
                            }

                            record[name] = prop.isRequired ? propName + '<br /><span>(*)</span>' : propName + '';
                        } else if (name === 'type') {
                            const type = prop.type;
                            if (type) {
                                const resolved = this._typeTextPart.toMd(type);
                                record[name] = resolved.md;
                                resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
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
                            event.args?.forEach((arg) => {
                                if (arg.type) {
                                    const resolved = this._typeTextPart.toMd(arg.type);
                                    _args.push(`\`${arg.name}\` { ${resolved.md} } ：${styles.html(arg.description || '')}`);
                                    resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
                                }
                            });
                            record[name] = _args.join('<br/>');
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
                method.parameters?.forEach((parameter) => {
                    if (parameter.type) {
                        const resolved = this._typeTextPart.toMd(parameter.type);

                        _parameters.push(`${parameter.name}:${!parameter.isRequired ? '?' : ''} ${resolved.md}`);
                        resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
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
                    const resolved = this._typePart.toMd(type, level + 2);
                    resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
                }
            });

            specialTypes.forEach((type) => {
                if (type.name && !exists.includes(type.name)) {
                    doc += styles.line();
                    doc += this._typePart.toMd(type, level + 2).md;
                    exists.push(type.name);
                }
            });
        }

        return {
            md: doc
        };
    }

    private _code(str: string) {
        return `<pre>${jsb.js(str, { indent_size: 2 }).replace(/[\n|\r]+/g, '<br>')}</pre>`;
    }
}
