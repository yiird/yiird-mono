import { tsquery } from '@phenomnomnominal/tsquery';
import { ScriptKind, SyntaxKind } from 'typescript';
import { describe, expect, test } from 'vitest';

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

const script3 = `
const obtainValue = computed({
	get() {
		let realValue = props.modelValue;
		if (props.prefixText && realValue?.startsWith(props.prefixText)) {
			realValue = realValue.substring(0, props.prefixText?.length - 1);
		}
		if (props.suffixText && realValue?.endsWith(props.suffixText)) {
			const startIndex = realValue.length - props.suffixText.length - 1;
			realValue = realValue.substring(startIndex, realValue.length - 1);
		}
		return realValue;
	},
	set(value) {
		let realValue = value;
		if (props.bind === 'all') {
		} else if (props.bind === 'prefix') {
		} else if (props.bind === 'suffix') {
		}
		ctx.emit('update:modelValue', realValue);
	}
});
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

    test('ddddd', () => {
        const selector = 'CallExpression:has([name=emit])';
        const root = tsquery.ast(script3, '', ScriptKind.TSX);
        const nodes = tsquery(root, selector, {
            visitAllChildren: true
        });
        console.log(nodes);
    });
});
