import { describe, expect, test } from '@jest/globals';
import { isArray, isObject } from 'lodash-es';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { SfcScriptHandle } from '../src/parser/sfc-script-handle';
import { LoaderOptions } from '../src/types';

describe('Test Methods', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);
	loader.load();

	test('type for method parameter', () => {
		const filePathC = path.resolve(__dirname, './resource/components/com-c.vue');
		const cacheC = loader.getCache(filePathC);
		if (cacheC) {
			const scriptHandleC = new SfcScriptHandle(cacheC);
			const methods = scriptHandleC.methods();
			expect(methods.length).toBe(2);

			const fn1 = methods[0];
			expect(fn1.description).toBe('Fn1 description');
			expect(fn1.parameters!.length).toBe(2);
			const fn1_param1 = fn1.parameters![0];
			expect(fn1_param1.type).toBe('String');
			expect(fn1_param1.description).toBe('arg1 description');

			const fn1_param2 = fn1.parameters![1];
			expect(fn1_param2.type).toBe('String');
			expect(fn1_param2.description).toBe('arg2 description');

			const fn2 = methods[1];
			expect(fn2.parameters!.length).toBe(2);
			const fn2_param1 = fn2.parameters![0];
			expect(fn2_param1.type).toBe('string');
			const fn2_param2 = fn2.parameters![1];
			if (isArray(fn2_param2.type)) {
				const property1 = fn2_param2.type![0];
				if (property1 && isObject(property1)) {
					expect(property1.name).toBe('o');
					expect(property1.type).toBe('string');
				}

				const property2 = fn2_param2.type![1];
				if (property2 && isObject(property2)) {
					expect(property2.name).toBe('b');
					if (isArray(property2.type)) {
						const property2_1 = property2.type[0];
						const property2_2 = property2.type[1];
						expect(property2_1.name).toBe('b_1');
						expect(property2_1.type).toBe('string');
						expect(property2_2.name).toBe('b_2');
						expect(property2_2.type).toBe('number');
					}
				}
			}
		}
	});
});
