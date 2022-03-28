import { describe, expect, it } from '@jest/globals';
import { resolve } from 'path';
import { Loader } from '../src/parser/loader';
import { SfcHandle } from '../src/parser/sfc-handle';
import { SfcScriptHandle } from '../src/parser/sfc-script-handle';
import { LoaderOptions } from '../src/types';

describe('测试 SFC 相关功能', () => {
	const filePath = '/Users/congcong/Public/projects/yiird/learn/learn-lerna/packages/vue3-ts-api-extractor/__tests__/resource/packages/button/o-button.vue';
	const options: LoaderOptions = {
		root: resolve(__dirname),
		scanDirs: ['./resource'],
		extensions: ['.vue', '.ts'],
		externals: ['vue', '@vue/*', 'lodash-es', '@fortawesome/*']
	};
	const loader = new Loader(options);
	loader.load();
	const cache = loader.getCache(filePath);
	it('Test defaultExport', () => {
		if (cache) {
			const handle = new SfcScriptHandle(cache);
			const defaultExport = handle.defaultExport();
			expect(defaultExport).not.toBeUndefined();
		}
	});

	it('Test props', () => {
		if (cache) {
			const handle = new SfcScriptHandle(cache);
			const props = handle.props();
			console.log(props);
		}
	});

	it('Test methods', () => {
		if (cache) {
			const handle = new SfcScriptHandle(cache);
			const methods = handle.methods();
			console.log(methods);
		}
	});

	it('Test emits', () => {
		if (cache) {
			const handle = new SfcScriptHandle(cache);
			const emits = handle.emits();
			console.log(emits);
		}
	});
	it('Test slots', () => {
		if (cache) {
			const handle = new SfcHandle(cache);
			const slots = handle.slots();
			console.log(slots);
		}
	});
});
