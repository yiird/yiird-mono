import ts from 'typescript';
import { ExportFromNode } from '../parser/node/ExportFromNode';
import { ScriptNode } from '../parser/node/ScriptNode';
import { ScriptStructure } from '../parser/node/ScriptStructure';
import { SfcStructure } from '../parser/node/SfcStructure';
import { ScannerOptions } from '../types';
import { ReferInfo } from './ReferInfo';
import { ScriptFile } from './ScriptFile';
import { Utils } from './Utils';

export class Context {
	private _scriptFiles = new Map<string, ScriptFile>();
	private _structures = new Map<string, ScriptStructure>();

	private _scannerOptions: ScannerOptions = {
		root: '',
		scanDirs: [],
		extensions: ['.vue', '.ts'],
		externals: ['vue', '@vue/*']
	};
	public get scannerOptions(): ScannerOptions {
		return this._scannerOptions;
	}
	public set scannerOptions(options: ScannerOptions) {
		Object.assign(this._scannerOptions, options);
	}

	addFile(scriptFile: ScriptFile) {
		this._scriptFiles.set(scriptFile.filename, scriptFile);
	}

	addStructure(structure: ScriptStructure) {
		this._structures.set(structure.filename, structure);
	}

	getRefers(filename: string): string[] {
		const source = this._scriptFiles.get(filename);
		return source?.refers || [];
	}

	getAffectedFiles(filename: string): Array<string> {
		return Array.from(this._getAffectedFiles(filename));
	}

	private _getAffectedFiles(filename: string): Set<string> {
		const source = this._scriptFiles.get(filename);
		const affected = new Set<string>();
		source?.froms.forEach((from) => {
			affected.add(from);
			this._getAffectedFiles(from).forEach((_from) => {
				affected.add(_from);
			});
		});
		return affected;
	}

	updateFrom(filename: string, frompath: string) {
		const source = this._scriptFiles.get(filename);
		if (source) {
			if (!source.froms.includes(frompath)) {
				source.froms.push(frompath);
			}
		}
	}

	getScriptFile(filename: string): ScriptFile | undefined {
		return this._scriptFiles.get(filename);
	}

	getStructure(filename: string): ScriptStructure | undefined {
		return this._structures.get(filename);
	}

	getAllSfc(): SfcStructure[] {
		return Array.from(this._structures.values()).filter((structure) => structure instanceof SfcStructure) as Array<SfcStructure>;
	}

	/**
	 * 从当前引入的脚本中查找定义
	 * @param name 定义名称
	 * @param structure 当前脚本结构
	 * @returns 脚本节点
	 */
	getNodeByName(name: string, structure: ScriptStructure): ScriptNode | undefined {
		const node = structure.declarations.get(name);
		if (node) return node;
		else {
			const scriptFile = this.getScriptFile(structure.filename);
			let target: ReferInfo | undefined;
			let targetName: string | undefined;
			scriptFile?.referInfos.forEach((info) => {
				const _targetName = info.importMap.get(name);
				if (_targetName) {
					targetName = _targetName;
					target = info;
				}
			});
			if (target && targetName) {
				const referPath = Utils.getReferPath(structure.filename, target.refer, this.scannerOptions.extensions);
				if (referPath) {
					const referStructure = this.getStructure(referPath);
					if (referStructure) {
						const targetScriptNode = this._handle_ALL_IN_Exports(referStructure).get(targetName);
						if (targetScriptNode) {
							const targetNode = targetScriptNode.projection || targetScriptNode.root;
							if (ts.isIdentifier(targetNode)) {
								return this.getNodeByName(targetNode.text, referStructure);
							} else {
								return targetScriptNode;
							}
						}
					}
				}
			}
		}
	}

	private _handle_ALL_IN_Exports(referStructure: ScriptStructure) {
		const map = new Map();
		referStructure.entries.forEach((entry, key) => {
			if (key.startsWith('ALL_IN_')) {
				if (entry instanceof ExportFromNode) {
					const referPath = Utils.getReferPath(referStructure.filename, entry.moduleSpecifier, this.scannerOptions.extensions);
					if (referPath) {
						const _referStructure = this.getStructure(referPath);
						if (_referStructure) {
							const _map = this._handle_ALL_IN_Exports(_referStructure);
							_map.forEach((_entry, _key) => {
								map.set(_key, _entry);
							});
						}
					}
				}
			} else {
				map.set(key, entry);
			}
		});
		return map;
	}
}
