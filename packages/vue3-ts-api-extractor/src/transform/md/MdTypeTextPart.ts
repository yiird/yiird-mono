import { TypeComment } from '../../parser/comment/node/TypeComment';
import { AbstractMdPart } from './AbstractMdPart';

export class MdTypeTextPart extends AbstractMdPart<TypeComment> {
    toMd(comment: TypeComment) {
        let md = '';

        const specialTypes = new Set<TypeComment>();

        comment.getAllTypeArgumentsType(specialTypes);

        if (comment.name && comment.name === comment.text) {
            md = comment.name;
        } else if (comment.typeArguments) {
            md = comment.typeArguments.map((_type) => _type.text).join(',');
        } else if (comment.isFunctionType) {
            md = comment.text || '';
        }
        specialTypes.forEach((_type) => {
            if (_type.name) {
                md = md.replaceAll(_type.name, `[${_type.name}](#${this._linkPrefix}${_type.name.toLocaleLowerCase()})`);
            }
        });

        return {
            md: this.styles.html(md),
            specialTypes
        };
    }
}
