import { describe, expect, test } from '@jest/globals';
import { tsquery } from '@phenomnomnominal/tsquery';
import { ScriptKind, SyntaxKind } from 'typescript';

const script = `
abstract class A{}
const a = 1;
`;

const script2 = `
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
describe('Test Tsquery', () => {
	test('Test Tsquery Declarations Selector', () => {
		const not = ':not([modifiers.0.kind=' + SyntaxKind.ExportKeyword + '])';
		const selector = `VariableStatement${not},FunctionDeclaration${not},ClassDeclaration${not}`;
		const results = tsquery(script, selector, {
			visitAllChildren: true
		});
		expect(results.length).toBe(2);
	});

	test('Test Tsquery First Level Children', () => {
		const root = tsquery.ast(script2, '', ScriptKind.TSX);
		const selector = `VariableStatement,FunctionDeclaration`;
		const nodes = tsquery(root, selector, {
			visitAllChildren: true
		});
		nodes.filter((_node) => root !== _node && root === _node.parent);
		expect(nodes.length).toBeGreaterThan(0);
	});
});
