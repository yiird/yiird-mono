export abstract class AbstractNode {
	private _name?: string;
	constructor(name?: string) {
		this._name = name;
	}
	get name(): string | undefined {
		return this._name;
	}
}