import ts, { Node, PropertySignature } from 'typescript';
import { JsdocUtils } from '../../../common/JsdocUtils';
import { NodeUtils } from '../../../common/NodeUtils';
import { Utils } from '../../../common/Utils';
import { AbstractCommentParser } from '../AbstractCommentParser';
import { PropertyComment } from '../node/PropertyComment';
import { AssociationType, TypeComment } from '../node/TypeComment';

export class TypeCommentParser extends AbstractCommentParser<TypeComment> {
	parse(node: Node): TypeComment {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		let comment = new TypeComment();

		if (ts.isTypeReferenceNode(node)) {
			comment = this.parse(node.typeName);
			comment.text = node.getText();
			if (node.typeArguments && node.typeArguments.length > 0) {
				const typeArguments: TypeComment[] = [];
				node.typeArguments.forEach((arg) => {
					typeArguments.push(this.parse(arg));
				});
				comment.typeArguments = typeArguments;
			}
		} else if (ts.isTypeAliasDeclaration(node)) {
			const _comment = this.parse(node.type);
			Utils.assignObject(comment, _comment);
		} else if (ts.isAsExpression(node)) {
			comment = this.parse(node.type);
			comment.text = node.type.getText();
		} else if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
			comment.associationType = ts.isUnionTypeNode(node) ? AssociationType.union : AssociationType.intersection;
			const associations: TypeComment[] = [];
			node.types.forEach((_type) => {
				associations.push(this.parse(_type));
			});
			comment.associations = associations;
			comment.text = node.getText();
		} else if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
			comment.name = node.name?.text;
			const properties: PropertyComment[] = [];
			node.members.forEach((member) => {
				if (ts.isPropertySignature(member)) {
					properties.push(this.parseProperty(member));
				}
			});
			comment.properties = properties;
			comment.text = comment.name;
		} else if (ts.isIdentifier(node)) {
			comment.name = node.text;
			if (!Utils.isBasicType(node.text)) {
				const structure = this.getStructureByNode(node);
				if (structure) {
					const targetNode = this.getNodeByName(node.text, structure);
					if (targetNode) {
						const typeNode = targetNode.projection || targetNode.root;
						const _comment = this.parse(typeNode);
						Utils.assignObject(comment, _comment);
					}
				}
			}
			comment.text = node.text;
		} else {
			if (ts.isLiteralTypeNode(node)) {
				comment.isLiteralType = true;
			}
			comment.name = NodeUtils.getText(node);
			comment.text = comment.name;
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
		}
		return comment;
	}

	parseProperty(node: PropertySignature): PropertyComment {
		const jsdocs = JsdocUtils.getJsDoc(node);
		const jsdoc = jsdocs[0];
		const comment = new PropertyComment();
		comment.name = node.name.getText();
		if (node.type) {
			comment.type = this.parse(node.type);
		}

		if (jsdoc) {
			comment.description = JsdocUtils.getDescription(jsdoc);
		}
		return comment;
	}
}
