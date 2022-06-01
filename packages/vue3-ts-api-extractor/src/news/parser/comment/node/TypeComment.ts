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
}
