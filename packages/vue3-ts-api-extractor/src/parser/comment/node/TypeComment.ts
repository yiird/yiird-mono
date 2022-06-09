import { Utils } from '../../../common/Utils';
import { NodeComment } from './NodeComment';
import { PropertyComment } from './PropertyComment';

export enum AssociationType {
	union = 'union',
	intersection = 'intersection'
}

export class TypeComment extends NodeComment {
	private _properties?: Array<PropertyComment>;

	private _typeArguments?: Array<TypeComment>;

	private _associationType?: AssociationType;

	private _associations?: Array<TypeComment>;

	private _text?: string | undefined;
	public get text(): string | undefined {
		return this._text;
	}
	public set text(value: string | undefined) {
		this._text = value;
	}

	public get properties(): Array<PropertyComment> | undefined {
		return this._properties;
	}
	public set properties(value: Array<PropertyComment> | undefined) {
		this._properties = value;
	}

	public get typeArguments(): Array<TypeComment> | undefined {
		return this._typeArguments;
	}
	public set typeArguments(value: Array<TypeComment> | undefined) {
		this._typeArguments = value;
	}

	public get associationType(): AssociationType | undefined {
		return this._associationType;
	}
	public set associationType(value: AssociationType | undefined) {
		this._associationType = value;
	}

	public get associations(): Array<TypeComment> | undefined {
		return this._associations;
	}
	public set associations(value: Array<TypeComment> | undefined) {
		this._associations = value;
	}

	public isBasic() {
		if (!this.name) {
			return true;
		}
		return Utils.isBasicType(this.name);
	}

	public getFullname() {
		return this._text;
	}

	public getSpecialTypes() {
		const specilTypes: TypeComment[] = [];

		if (this.typeArguments && this.typeArguments.length > 0) {
			this.typeArguments.forEach((_type) => {
				if (_type.name && !Utils.isBasicType(_type.name)) {
					specilTypes.push(_type);
					specilTypes.push(..._type.getSpecialTypes());
				}
			});
		}
		if (this.associations && this.associations.length > 0) {
			this.associations.forEach((_type) => {
				if (_type.name && !Utils.isBasicType(_type.name)) {
					specilTypes.push(_type);
					specilTypes.push(..._type.getSpecialTypes());
				}
			});
		}
		if (this.properties && this.properties.length > 0) {
			this.properties.forEach((property) => {
				if (property.type) {
					specilTypes.push(...property.type.getSpecialTypes());
				}
			});
		}

		return specilTypes;
	}
}
