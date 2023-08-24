import { Utils } from '../../../common/Utils';
import { NodeComment, NodeCommentKind } from './NodeComment';
import { ParamComment } from './ParamComment';
import { PropertyComment } from './PropertyComment';

export enum AssociationType {
    union = 'union',
    intersection = 'intersection'
}

export class TypeComment extends NodeComment {
    static anyType = new TypeComment('any');
    static voidType = new TypeComment('void');
    public kind: NodeCommentKind = NodeCommentKind.TYPE;
    private _properties?: Array<PropertyComment>;

    private _typeArguments?: Array<TypeComment>;

    private _associationType?: AssociationType;

    private _associations?: Array<TypeComment>;
    private _isLiteralType?: boolean = false;
    private _isFunctionType?: boolean = false;
    private _functionParams?: ParamComment[];
    private _functionReturnType?: TypeComment;

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

    public get isLiteralType(): boolean {
        return this._isLiteralType || false;
    }

    public set isLiteralType(value: boolean) {
        this._isLiteralType = value;
    }

    public get isFunctionType(): boolean {
        return this._isFunctionType || false;
    }

    public set isFunctionType(value: boolean) {
        this._isFunctionType = value;
    }

    public get functionParams(): ParamComment[] | undefined {
        return this._functionParams;
    }

    public set functionParams(value: ParamComment[] | undefined) {
        this._functionParams = value;
    }

    public get functionReturnType(): TypeComment | undefined {
        return this._functionReturnType;
    }

    public set functionReturnType(value: TypeComment | undefined) {
        this._functionReturnType = value;
    }

    public isBasic() {
        if (
            !this.name ||
            this.isLiteralType ||
            ((!this.properties || this.properties.length == 0) && (!this.associations || this.associations.length == 0) && (!this.typeArguments || this.typeArguments.length == 0))
        ) {
            return true;
        }
        return Utils.isBasicType(this.name);
    }

    public getFullname() {
        return this._text;
    }

    public getSpecialTypes(specilTypes: Set<TypeComment>) {
        if (((!this.name && !this.associationType) || (this.name && Utils.isBasicType(this.name))) && !this.isFunctionType) return;
        if ('PropType' !== this.name && 'Array' !== this.name) {
            specilTypes.add(this);
        }

        this.typeArguments?.forEach((_type) => _type.getSpecialTypes(specilTypes));
        this.associations?.forEach((_type) => _type.getSpecialTypes(specilTypes));
        this.properties?.forEach((property) => property.type?.getSpecialTypes(specilTypes));
    }

    public getAllTypeArgumentsType(specilTypes: Set<TypeComment>) {
        if (!this.isBasic() || this.name === 'Array' || this.isFunctionType) {
            if ('PropType' !== this.name && 'Array' !== this.name) {
                specilTypes.add(this);
            }
            this.typeArguments?.forEach((_type) => _type.getAllTypeArgumentsType(specilTypes));
        } else if (this.associationType) {
            this.associations?.forEach((_type) => _type.getAllTypeArgumentsType(specilTypes));
        } else if (this.functionParams) {
            this.functionParams.forEach((_param) => _param.type.getAllTypeArgumentsType(specilTypes));
        } else if (this.functionReturnType) {
            this.functionReturnType.getAllTypeArgumentsType(specilTypes);
        }
    }
}
