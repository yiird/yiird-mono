import { watch } from 'chokidar';
import EventEmitter from 'events';
import { glob, IOptions } from 'glob';
import { isAbsolute, join, resolve } from 'path';
import { Context } from './common/Context';
import { ScriptFile } from './common/ScriptFile';
import { SfcFile } from './common/SfcFile';
import { FileKind, Utils } from './common/Utils';
import { ScriptParserFactory } from './parser/node/ScriptParserFactory';
import { SfcParserFactory } from './parser/node/SfcParserFactory';
import { ScannerOptions } from './types';

export class Scanner extends EventEmitter {
	private _options: ScannerOptions;
	private _context: Context;
	//阻止重复加载次数
	private _prevent_duplicate_loads_times = 0;

	constructor(options: ScannerOptions) {
		super();
		this._options = options;
		this._context = new Context();
		this._context.scannerOptions = options;
		if (options.watch === true) {
			const watchglobfiles: string[] = [];
			if (options.scanDirs.length > 0) {
				options.scanDirs.forEach((scanDir) => {
					watchglobfiles.push(join(scanDir, '**/*+(' + options.extensions?.join('|') + ')'));
				});
			} else {
				watchglobfiles.push('**/*+(' + options.extensions?.join('|') + ')');
			}
			const watcher = watch(watchglobfiles, {
				cwd: options.root,
				alwaysStat: true
			});
			watcher.on('all', (eventName, path, states) => {
				if (states?.isFile()) {
					this.emit('filechange', resolve(options.root, path), eventName);
				}
			});
		}
	}

	private _loadSfc(filename: string, source: string) {
		const file = new SfcFile(filename, source);
		this._context.addFile(file);
		const structure = SfcParserFactory.createParser(file, this._context).parse();
		this._context.addStructure(structure);
	}

	private _loadScript(filename: string, source: string, kind: FileKind) {
		const lang = Utils.fileKindToScriptKind(kind);
		const file = new ScriptFile(filename, source, lang);
		this._context.addFile(file);

		const structure = ScriptParserFactory.createParser(file, this._context).parse();
		this._context.addStructure(structure);
	}

	private isExcuded(refer: string, externals: string[] = []) {
		return externals.filter((external) => (external.endsWith('*') && refer.startsWith(external.replaceAll('*', ''))) || external === refer).length > 0;
	}

	private _load(filename: string, forceUpdate = false, from?: string) {
		const source = Utils.getSource(filename);
		const fileKind = Utils.getFileKind(filename);
		const cached = this._context.getScriptFile(filename);
		if (!cached || forceUpdate) {
			if (fileKind === FileKind.VUE) {
				this._loadSfc(filename, source);
			} else {
				this._loadScript(filename, source, fileKind);
			}
		} else {
			this._prevent_duplicate_loads_times++;
		}
		if (from) {
			this._context.updateFrom(filename, from);
		}
		if (forceUpdate) {
			if (cached?.froms) {
				const loadedOne = this._context.getScriptFile(filename);
				if (loadedOne) {
					loadedOne.froms = cached.froms;
				}
			}
		}
		this._context.getRefers(filename).forEach((_referFilename) => {
			if (!this.isExcuded(_referFilename, this._options.externals)) {
				const realReferPath = Utils.getReferPath(filename, _referFilename, this._options.extensions);
				if (realReferPath) {
					this._load(realReferPath, forceUpdate, filename);
				}
			}
		});
	}

	private _findAvailableFile(): Array<string> {
		const files: Array<string> = [];
		this._options.scanDirs.forEach((scanDir) => {
			const globOptions: IOptions = {
				ignore: this._options.ignore,
				absolute: true
			};
			if (isAbsolute(scanDir)) {
				globOptions.cwd = scanDir;
				const _files = glob.sync('**/*+(' + this._options.extensions?.join('|') + ')');
				files.push(..._files);
			} else {
				globOptions.cwd = join(this._options.root, scanDir);
				const _files = glob.sync('**/*+(' + this._options.extensions?.join('|') + ')', globOptions);
				files.push(..._files);
			}
		});
		return files;
	}

	public get prevent_duplicate_loads_times() {
		return this._prevent_duplicate_loads_times;
	}

	scan(filename?: string, forceUpdate = false): void {
		if (filename) {
			this._load(filename, forceUpdate);
		} else {
			this._findAvailableFile().forEach((_filename) => {
				this._load(_filename, forceUpdate);
			});
		}
	}

	getContext() {
		return this._context;
	}
}
