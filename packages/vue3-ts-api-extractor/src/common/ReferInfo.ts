import ts, { ImportDeclaration, StringLiteral } from 'typescript';

export class ReferInfo {
    private _importMap = new Map<string, string>();
    private _refer: string;
    private _node: ImportDeclaration;

    constructor(node: ImportDeclaration) {
        this._node = node;
        const moduleSpecifier = this._node.moduleSpecifier;
        this._refer = (moduleSpecifier as StringLiteral).text;
        this._init();
    }
    private _init() {
        this._initDefault();
        this._initNamed();
    }

    private _initNamed() {
        const namedBindings = this._node.importClause?.namedBindings;
        if (!namedBindings) return;
        if (ts.isNamedImports(namedBindings)) {
            namedBindings.elements.forEach((importSpecifier) => {
                const propertyName = importSpecifier.propertyName;
                const name = importSpecifier.name;
                if (propertyName) {
                    this.importMap.set(propertyName.text, name.text);
                } else {
                    this.importMap.set(name.text, name.text);
                }
            });
        } else if (ts.isNamespaceImport(namedBindings)) {
            this.importMap.set(namedBindings.name.text, '*');
        }
    }
    private _initDefault() {
        const defaultImport = this._node.importClause?.name?.text;
        if (defaultImport) this.importMap.set(defaultImport, 'default');
    }

    /**
     * Getter filename
     * @return {string}
     */
    public get refer(): string {
        return this._refer;
    }

    public get importMap() {
        return this._importMap;
    }
}
