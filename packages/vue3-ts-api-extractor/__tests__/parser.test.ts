import { describe, expect, test } from '@jest/globals';
import { ScriptKind } from 'typescript';
import { Context } from '../src/common/Context';
import { ScriptFile } from '../src/common/ScriptFile';
import { SfcFile } from '../src/common/SfcFile';
import { TemplateSlotParser } from '../src/parser/node/TemplateSlotParser';
import { TsxParser } from '../src/parser/node/TsxParser';

const script = `
import Vue from 'vue';
import A from '../a';
const a = 1;
function method(){
    const b=2;
}
export default {
	name:'TestComponent'
}
`;

const script2 = `
// ExportDeclaration
export * from 'a';
export { B } from 'b';
export * as V from 'c';
export { A };

class A {}
// Declaration or Expression 导出
export const fn1 = ()=>{}
export function fn2(){}
export const c1=1;
export class D {}

// ExportAssignment
export default D;
`;

const sfc = `
<template>
	<div>
		<slot></slot>
		<slot name="abc"></slot>
	</div>
</template>
<script setup>
	import Vue from 'vue';
	const props = defineProps({
		foo: { type: String, required: true },
		bar: Number
	})

	props.foo // string
	props.bar // number | undefined
</script>
`;

describe('Test Parser', () => {
	test('TsxParser.parseDeclarations', () => {
		const scriptFile = new ScriptFile('x.ts', script, ScriptKind.JSX);
		const context = new Context();
		const parser = new TsxParser(scriptFile, context);
		const scriptStructure = parser.parse();
		expect(scriptStructure.filename).toBe('x.ts');
		expect(scriptStructure.declarations.size).toBe(2);
		expect(scriptStructure.declarations.get('method')?.localDeclarations.get('b')).not.toBeUndefined();
	});

	test('TsxParser.parseEntries', () => {
		const scriptFile = new ScriptFile('x.ts', script2, ScriptKind.JSX);
		const context = new Context();
		const parser = new TsxParser(scriptFile, context);
		const scriptStructure = parser.parse();
		expect(scriptStructure.entries.size).toBe(9);
	});

	test('TemplateSlotParser.parseSlotNodes', () => {
		const sfcFile = new SfcFile('x.ts', sfc);
		const context = new Context();
		const parser = new TemplateSlotParser(sfcFile, context);
		const sfcStructure = parser.parse();
		expect(sfcStructure.slotNodes.length).toBe(2);
	});
});
