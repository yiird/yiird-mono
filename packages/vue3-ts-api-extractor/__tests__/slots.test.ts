import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { SfcHandle } from '../src/parser/sfc-handle';
import { LoaderOptions } from '../src/types';

describe('Test Emits', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);

	test('Normal', () => {
		const filePath = path.resolve(__dirname, './resource/components/com-slots.vue');
		loader.load(filePath);
		const cache = loader.getCache(filePath);

		expect(cache).toBeDefined();

		const handle = new SfcHandle(cache!);
		const slots = handle.slots();
		const slot0 = slots[0];
		expect(slot0).toBeDefined();
		expect(slot0.name).toBe('default');
		expect(slot0.description).toBe('默认插槽');
		const slot1 = slots[1];
		expect(slot1).toBeDefined();
		expect(slot1.name).toBe('item');
		expect(slot1.callbackArgs).toBeDefined();
		expect(slot1.callbackArgs).toHaveLength(1);
		expect(slot1.callbackArgs).toHaveProperty('0.type', "{title:'标题',content:'内容'}");
	});
});
