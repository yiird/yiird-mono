import { AssociationType, TypeComment } from '../../parser/comment/node/TypeComment';
import { MdOptions } from '../../types';
import { AbstractMdPart } from './AbstractMdPart';
import { MdPartFactory } from './MdPartFactory';

export class MdTypePart extends AbstractMdPart<TypeComment> {
    private _typeTextPart;
    constructor(options: MdOptions) {
        super(options);
        this._typeTextPart = MdPartFactory.createTypeTextPart(options);
    }

    toMd(comment: TypeComment, level: number) {
        const styles = this.options.styles!;
        let doc = '';
        const specialTypes = new Set<TypeComment>();
        if (comment.name) {
            doc += styles.line();
            doc += styles.h(level, `${comment.name}`);
            doc += ` {#${this._linkPrefix}${comment.name.toLocaleLowerCase()}}`;
            doc += styles.line();
        }

        if (comment.description) {
            doc += styles.line();
            doc += styles.t(0, `- 描述： ${styles.html(comment.description)}`);
        }

        if (comment.associationType) {
            if (comment.associations && comment.associations.length > 0) {
                doc += styles.line();
                doc += styles.t(0, `- ${comment.name} = `);

                const resolved = this.associationTypeText(comment);
                doc += styles.t(1, `${resolved.md}`);
                resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
            }
        } else if (comment.isFunctionType) {
            doc += styles.line();
            doc += styles.t(0, `- 方法型：`);
            const resolved = this._typeTextPart.toMd(comment);
            doc += styles.t(1, `${resolved.md}`);
            resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
        } else {
            if (comment.properties && comment.properties.length > 0) {
                doc += styles.line();
                doc += styles.t(0, `- 选项：`);
                comment.properties.forEach((property) => {
                    const type = property.type;
                    if (type && !property.isPrivate) {
                        doc += styles.line();
                        let resolved;
                        if (type.associationType) {
                            resolved = this.associationTypeText(type);
                        } else {
                            resolved = this._typeTextPart.toMd(type);
                        }

                        resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
                        if (property.isRequired) {
                            doc += styles.t(1, `- \`${property.name}\` { ${resolved.md} } : ${styles.html(property.description || '')}`);
                        } else {
                            doc += styles.t(1, `- [\`${property.name}\`] { ${resolved.md} } : ${styles.html(property.description || '')}`);
                        }
                    }
                });
            }
        }

        return {
            md: doc,
            specialTypes
        };
    }

    public associationTypeText(type: TypeComment) {
        const specialTypes = new Set<TypeComment>();
        const md =
            type.associations
                ?.map((_t) => {
                    if (_t.isLiteralType) {
                        return `\`${_t.name}\``;
                    } else {
                        const resolved = this._typeTextPart.toMd(_t);
                        resolved.specialTypes.forEach((_type) => specialTypes.add(_type));
                        return resolved.md;
                    }
                })
                .join(type.associationType === AssociationType.union ? ' \\| ' : ' \\& ') || '';

        return {
            md,
            specialTypes
        };
    }
}
