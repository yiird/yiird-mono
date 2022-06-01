import { createSourceFile, ScriptKind, ScriptTarget, SourceFile } from 'typescript';
import { NodeUtils } from './NodeUtils';
import { ReferInfo } from './ReferInfo';

export class ScriptFile {
	private _filename: string;
	private _script?: SourceFile;
	private _lang: ScriptKind;
	private _referInfos: Array<ReferInfo>;
	private _refers: Array<string>;
	private _froms: Array<string>;

	constructor(filename: string, source: string | undefined, lang: ScriptKind) {
		this._filename = filename;
		this._lang = lang;
		this._referInfos = new Array<ReferInfo>();
		this._refers = new Array<string>();
		this._froms = new Array<string>();
		if (source) {
			this._script = createSourceFile(filename, source, ScriptTarget.ESNext, true, this._lang);
			this._init();
		}
	}

	private _init() {
		this._initImportInfo();
	}

	private _initImportInfo() {
		if (!this.script) return;
		const importDeclarations = NodeUtils.extractImporters(this.script);

		for (const importDeclaration of importDeclarations) {
			const referInfo = new ReferInfo(importDeclaration);
			this._referInfos.push(referInfo);
			this._refers.push(referInfo.refer);
		}
	}

	/**
	 * Getter script
	 * @return {SourceFile}
	 */
	public get script(): SourceFile | undefined {
		return this._script;
	}

	/**
	 * Getter lang
	 * @return {ScriptKind}
	 */
	public get lang(): ScriptKind {
		return this._lang;
	}

	/**
	 * Getter referEntries
	 * @return {Array<ReferInfo>}
	 */
	public get referInfos(): Array<ReferInfo> {
		return this._referInfos;
	}

	/**
	 * Getter refers
	 * @return {Array<string>}
	 */
	public get refers(): Array<string> {
		return this._refers;
	}

	/**
	 * Getter froms
	 * @return {Array<string>}
	 */
	public get froms(): Array<string> {
		return this._froms;
	}

	/**
	 * Getter filename
	 * @return {string}
	 */
	public get filename(): string {
		return this._filename;
	}
}
