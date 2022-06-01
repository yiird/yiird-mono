import fs from 'fs';
import { kebabCase } from 'lodash-es';
import path from 'path';
import { Markdown } from './markdown';
import { FileCache, Loader } from './parser/loader';
import { SfcHandle } from './parser/sfc-handle';
import { ExtractOptions, MarkdownOptions, Sfc } from './types';
export * from './types';

export const extract = (options: ExtractOptions) => {
	const loader = new Loader(options.loader);
	loader.load();
	handleMarkdown(handleParse(loader.getSfcs(), loader), options.markdown);
	if (options.watch) {
		loader.on('loaded', (cache: FileCache) => {
			if (cache.isSfc()) {
				handleMarkdown(handleParse([cache.getFilePath()], loader), options.markdown);
			}
		});

		options.loader.scanDirs.forEach((dir) => {
			const targetDir = path.join(options.loader.root, dir);
			fs.watch(
				targetDir,
				{
					recursive: true
				},
				(eventType, filename) => {
					//if (options.loader.extensions?.includes(path.extname(filename))) {
					loader.reload(path.join(targetDir, filename));
					//}
				}
			);
		});
	}
};

export const toSfc = (cache: FileCache): Sfc => {
	const handle = new SfcHandle(cache);
	const bean: Sfc = {
		name: handle.name,
		date: handle.date,
		author: handle.author,
		description: handle.description,
		props: handle.props(),
		slots: handle.slots(),
		methods: handle.methods(),
		emits: handle.emits()
	};
	return bean;
};

const handleParse = (sfcPaths: string[], loader: Loader) => {
	const result: Sfc[] = [];
	sfcPaths.forEach((filePath) => {
		const cache = loader.getCache(filePath);
		if (cache) result.push(toSfc(cache));
	});
	return result;
};

const handleMarkdown = (sfcs: Sfc[], options?: MarkdownOptions) => {
	if (options) {
		const markdown = new Markdown(options);
		const singlemdWithLangKeys = new Map<string, string>();
		sfcs.forEach((sfc) => {
			const jsonWithLangs = markdown.transform(sfc);
			const langKeys = Object.keys(jsonWithLangs);
			for (const langKey of langKeys) {
				const md = markdown.toMardown(jsonWithLangs[langKey]);
				if (options.output) {
					const fileName = (sfc.name ? kebabCase(sfc.name) : 'no-name') + '.md';
					const filePath = path.join(options.output.dir, langKey, options.output.name ? options.output.name(fileName) : fileName);
					const dir = path.dirname(filePath);
					if (mkdirsSync(dir)) {
						if (!options.output.singleFile) {
							fs.writeFile(filePath, md, { encoding: 'utf8', flag: 'w' }, (err) => {
								if (err !== null) {
									console.error(err);
								}
							});
						} else {
							if (singlemdWithLangKeys.get(langKey)) {
								singlemdWithLangKeys.set(langKey, singlemdWithLangKeys.get(langKey) + '\n\n' + md);
							} else {
								singlemdWithLangKeys.set(langKey, md);
							}
						}
					}
				}
			}
		});
		if (singlemdWithLangKeys.size > 0) {
			const fileName = 'index.md';
			singlemdWithLangKeys.forEach((singlemd, langKey) => {
				if (options.output) {
					const filePath = path.join(options.output.dir, langKey, options.output.name ? options.output.name(fileName) : fileName);
					const dir = path.dirname(filePath);
					if (mkdirsSync(dir)) {
						fs.writeFile(filePath, singlemd, { encoding: 'utf8', flag: 'w' }, (err) => {
							if (err !== null) {
								console.error(err);
							}
						});
					}
				}
			});
		}
	}
};

const mkdirsSync = (dirname: string) => {
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
};
