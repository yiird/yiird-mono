import { describe, expect, test } from '@jest/globals';
import path from 'path';
import { Loader } from '../src/parser/loader';
import { SfcScriptHandle } from '../src/parser/sfc-script-handle';
import { LoaderOptions } from '../src/types';

describe('Test Props', () => {
	const loaderOptions: LoaderOptions = {
		root: path.resolve(__dirname, '.'),
		scanDirs: ['./resource']
	};
	const loader = new Loader(loaderOptions);
	loader.load();

	test('Normal', () => {
		const filePathC = path.resolve(__dirname, './resource/components/com-c.vue');
		const cacheC = loader.getCache(filePathC);
		if (cacheC) {
			const scriptHandleC = new SfcScriptHandle(cacheC);
			expect(scriptHandleC.props().length).toBe(2);

			const firstOne = scriptHandleC.props()[0];
			expect(firstOne.name).toBe('size');
			expect(firstOne.description).toBe('按钮尺寸');
			expect(firstOne.type).toBe('String');
			expect(firstOne.isPrivate).toBe(true);
			expect(firstOne.values).toBe('`xl`,`md`,`sm`');
			expect(firstOne.default).toBe('`md`');

			const secondOne = scriptHandleC.props()[1];
			expect(secondOne.name).toBe('color');
			expect(secondOne.description).toBe('颜色');
			expect(secondOne.type).toBe('String');
			expect(secondOne.isPrivate).toBe(false);
			expect(secondOne.values).toBe('`red`,`green`');
			expect(secondOne.default).toBe('red');
		}
	});

	test('From outside declaration and have ...(Spread Assignment)', () => {
		const filePathD = path.resolve(__dirname, './resource/components/com-d.vue');
		const cacheD = loader.getCache(filePathD);
		if (cacheD) {
			const scriptHandleD = new SfcScriptHandle(cacheD);
			expect(scriptHandleD.props().length).toBe(3);

			const firstOne = scriptHandleD.props()[0];
			expect(firstOne.name).toBe('id');
			expect(firstOne.description).toBe('id');
			expect(firstOne.type).toBe('String');
			expect(firstOne.isPrivate).toBe(false);

			const secondOne = scriptHandleD.props()[1];
			expect(secondOne.name).toBe('size');
			expect(secondOne.description).toBe('按钮尺寸');
			expect(secondOne.type).toBe('String');
			expect(secondOne.isPrivate).toBe(true);
			expect(secondOne.values).toBe('`xl`,`md`,`sm`');
			expect(secondOne.default).toBe('`md`');

			const thirdOne = scriptHandleD.props()[2];
			expect(thirdOne.name).toBe('color');
			expect(thirdOne.description).toBe('颜色');
			expect(thirdOne.type).toBe('String');
			expect(thirdOne.isPrivate).toBe(false);
			expect(thirdOne.values).toBe('`red`,`green`');
			expect(thirdOne.default).toBe('red');
		}
	});

	test('From another file and have ...(Spread Assignment)', () => {
		const filePathE = path.resolve(__dirname, './resource/components/com-e.vue');

		const cacheE = loader.getCache(filePathE);
		if (cacheE) {
			const scriptHandleE = new SfcScriptHandle(cacheE);
			expect(scriptHandleE.props().length).toBe(3);

			const firstOne = scriptHandleE.props()[0];
			expect(firstOne.name).toBe('id');
			expect(firstOne.description).toBe('id');
			expect(firstOne.type).toBe('String');
			expect(firstOne.isPrivate).toBe(false);

			const secondOne = scriptHandleE.props()[1];
			expect(secondOne.name).toBe('size');
			expect(secondOne.description).toBe('按钮尺寸');
			expect(secondOne.type).toBe('String');
			expect(secondOne.isPrivate).toBe(true);
			expect(secondOne.values).toBe('`xl`,`md`,`sm`');
			expect(secondOne.default).toBe('`md`');

			const thirdOne = scriptHandleE.props()[2];
			expect(thirdOne.name).toBe('color');
			expect(thirdOne.description).toBe('颜色');
			expect(thirdOne.type).toBe('String');
			expect(thirdOne.isPrivate).toBe(false);
			expect(thirdOne.values).toBe('`red`,`green`');
			expect(thirdOne.default).toBe('red');
		}
	});
});
