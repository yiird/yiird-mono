import { NodeArray, ParameterDeclaration } from 'typescript';
import { ParamComment } from '../node/ParamComment';
import { TypeComment } from '../node/TypeComment';
import { BasicComment } from './BasicComment';

export class MethodComment extends BasicComment {
	private _parameterNodes?: NodeArray<ParameterDeclaration>;
	private _parameters?: Array<ParamComment>;
	private _returnType?: TypeComment;
	private _isPriavte?: boolean;

	public get parameterNodes(): NodeArray<ParameterDeclaration> | undefined {
		return this._parameterNodes;
	}
	public set parameterNodes(value: NodeArray<ParameterDeclaration> | undefined) {
		this._parameterNodes = value;
	}
	public get parameters(): Array<ParamComment> | undefined {
		return this._parameters;
	}
	public set parameters(value: Array<ParamComment> | undefined) {
		this._parameters = value;
	}

	public get returnType(): TypeComment | undefined {
		return this._returnType;
	}
	public set returnType(value: TypeComment | undefined) {
		this._returnType = value;
	}

	public get isPrivate(): boolean | undefined {
		return this._isPriavte;
	}
	public set isPrivate(value: boolean | undefined) {
		this._isPriavte = value;
	}
}
