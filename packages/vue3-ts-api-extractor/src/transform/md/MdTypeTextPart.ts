import { AssociationType, TypeComment } from '../../parser/comment/node/TypeComment';
import { AbstractMdPart } from './AbstractMdPart';

export class MdTypeTextPart extends AbstractMdPart<TypeComment> {
    toMd(comment: TypeComment) {
        const specialTypes = new Set<TypeComment>();

        return {
            md: this.styles.html(this.nestedReplaceName(specialTypes, comment, 0)),
            specialTypes
        };
    }

    private nestedReplaceName = (specialTypes: Set<TypeComment>, type: TypeComment, deep: number) => {
        type.getAllTypeArgumentsType(specialTypes);
        let md = '';
        if (type.name && type.name === type.text) {
            md = this.replaceLink(specialTypes, type.name);
        } else if (type.isFunctionType) {
            if (deep === 0) {
                if (type.functionReturnType && type.functionParams) {
                    deep++;
                    md = `(${type.functionParams
                        ?.map((_type) => `${_type.name}:${this.nestedReplaceName(specialTypes, _type.type, deep)}`)
                        .join(' , ')}) => ${this.nestedReplaceName(specialTypes, type.functionReturnType, deep)}`;
                }
            } else if (type.name) {
                md = this.replaceLink(specialTypes, type.name);
            }
        } else if (type.typeArguments) {
            const typeArguments = type.typeArguments.map((_type) => this.nestedReplaceName(specialTypes, _type, deep++)).join(',');
            if (type.name === 'PropType') {
                md = typeArguments;
            } else {
                md = `${type.name}<${typeArguments}>`;
            }
        } else if (type.associationType) {
            md = type.associations?.map((_type) => this.nestedReplaceName(specialTypes, _type, deep++)).join(AssociationType.union ? ' | ' : ' & ') || '';
        }
        return md;
    };

    private replaceLink(specialTypes: Set<TypeComment>, typeName: string) {
        const targetType = Array.from(specialTypes).find((type) => type.name === typeName);

        if (targetType?.name) {
            typeName = typeName.replaceAll(targetType.name, `[${targetType.name}](#${this._linkPrefix}${targetType.name.toLocaleLowerCase()})`);
        }

        return typeName;
    }
}
