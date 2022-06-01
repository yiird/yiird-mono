import { describe, test } from '@jest/globals';
import { compileScript, parse, SFCParseOptions } from '@vue/compiler-sfc';

const source = `
<template>
<span>1111</span>
</template>
<script setup lang="ts">

const props = defineProps({
 /**
  * aaa 
  */
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
`;

const getSFCParseOptions = (filePath: string): SFCParseOptions => {
	const sfcParseOptions: SFCParseOptions = {};
	sfcParseOptions.filename = filePath;
	sfcParseOptions.sourceMap = false;
	return sfcParseOptions;
};

describe('Test Vue Sfc Parser', () => {
	test('Test Tsquery Declarations Selector', () => {
		const sfcParseOptions = getSFCParseOptions('./aa.vue');
		const sfc = parse(source, sfcParseOptions);
		const aa = compileScript(sfc.descriptor, {
			id: 'aa',
			reactivityTransform: false
		});
		console.log(aa.content);
	});
});
