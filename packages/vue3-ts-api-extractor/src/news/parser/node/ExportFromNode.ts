import { Node } from 'typescript';
import { ExportNode } from './ExportNode';

export class ExportFromNode extends ExportNode {
	private _fromName: string;
	private _moduleSpecifier: string;

	constructor(exportedName: string, fromName: string, moduleSpecifier: string, root: Node) {
		super(exportedName, root, new Map());
		this._fromName = fromName;
		this._moduleSpecifier = moduleSpecifier;
	}

	/**
	 * Getter fromName
	 * @return {string}
	 */
	public get fromName(): string {
		return this._fromName;
	}

	/**
	 * Getter moduleSpecifier
	 * @return {string}
	 */
	public get moduleSpecifier(): string {
		return this._moduleSpecifier;
	}
}
