import { describe, it } from '@jest/globals';
import { parse, stringify } from 'comment-json';
import { resolve } from 'path';
import { extract } from '../src';
import { ExtractOptions } from '../src/types';

describe('测试 整体 相关功能', () => {
	it('Test extract', () => {
		const options: ExtractOptions = {
			loader: {
				root: resolve(__dirname),
				scanDirs: ['./resource'],
				extensions: ['.vue', '.ts'],
				externals: ['vue', '@vue/*', 'lodash-es', '@fortawesome/*']
			},
			markdown: {
				output: {
					dir: '/targetDir/',
					singleFile: false,
					name(name) {
						return name;
					}
				},
				transform(md) {
					console.log(md);
					return md;
				}
			}
		};

		extract(options);
	});

	it('test ssss', () => {
		const json = parse(
			`{
			"b_1": 1, //ssss
			"b2": 2
			}`,
			undefined,
			false
		);
		console.log(stringify(json, null, 2));
	});
});
