import { AssociationType, TypeComment } from '../../parser/comment/node/TypeComment';
import { AbstractMdPart } from './AbstractMdPart';

export class MdTypePart extends AbstractMdPart<TypeComment> {
	toMd(comment: TypeComment, level: number): string {
		const styles = this.options.styles;
		let doc = '';
		const specilTypes: Set<TypeComment> = new Set(comment.getSpecialTypes());
		if (comment.name) {
			doc += styles.line();
			doc += styles.h(level, `${comment.getFullname()}`);
			if (comment.associationType === AssociationType.union) {
				doc += '[联合类型]';
			} else if (comment.associationType === AssociationType.intersection) {
				doc += '[交叉类型]';
			}
			doc += styles.line();
		}

		if (comment.description) {
			doc += styles.line();
			doc += styles.t(0, `- 描述： ${styles.html(comment.description)}`);
		}

		if (comment.associationType) {
			if (comment.associations && comment.associations.length > 0) {
				doc += styles.line();
				doc += styles.t(0, `- 选项：`);
				comment.associations.forEach((association) => {
					doc += styles.line();
					const typeName = association.getFullname();
					association.getSpecialTypes().forEach((_type) => {
						specilTypes.add(_type);
					});

					doc += styles.t(1, `- \`${association.name}\` { ${typeName || ''} }`);
				});
			}
		} else {
			if (comment.properties && comment.properties.length > 0) {
				doc += styles.line();
				doc += styles.t(0, `- 选项：`);
				comment.properties.forEach((property) => {
					const type = property.type;
					if (type) {
						doc += styles.line();
						const typeName = type.getFullname();
						doc += styles.t(1, `- \`${property.name}\` { ${typeName || ''} } : ${styles.html(property.description || '')}`);
					}
				});
			}
		}

		if (specilTypes.size > 0) {
			doc += styles.line();
			doc += styles.line();
			doc += styles.t(0, `- 关联类型：`);
			specilTypes.forEach((specilType) => {
				doc += styles.line();
				doc += styles.t(1, `- [${specilType.name}](#${specilType.name?.toLocaleLowerCase()})`);
			});
		}

		return doc;
	}
}
