import { transform } from './markdown';
import { FileCache, Loader } from './parser/loader';
import { SfcHandle } from './parser/sfc-handle';
import { ExtractOptions, MarkdownOptions, Sfc } from './types';
export * from './types';
export const extract = (options: ExtractOptions) => {
	const loader = new Loader(options.loader);
	loader.on('reload-sfc', (sfcPaths) => {
		handleMarkdown(handleParse(sfcPaths, loader), options.markdown);
	});
	loader.load();
	handleMarkdown(handleParse(loader.getSfcs(), loader), options.markdown);
};

export const toSfc = (cache: FileCache): Sfc => {
	const handle = new SfcHandle(cache);
	const bean: Sfc = {
		name: handle.name,
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
		sfcs.forEach((sfc) => {
			const result = transform(sfc);
			if (options.transform) {
				options.transform(result);
			}
		});
	}
};
