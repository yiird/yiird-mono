import { describe, expect, test } from '@jest/globals';
import { ScriptKind } from 'typescript';
import { ScriptFile } from '../src/common/ScriptFile';
import { SfcFile } from '../src/common/SfcFile';

const sfc = `
<template><span></span></template>
<script lang="ts">
import Vue from 'vue';
import A from '../a';
export default {
	name:'TestComponent'
}
</script>
`;

const script = `
import Vue from 'vue';
import A from '../a';
export default {
	name:'TestComponent'
}
`;

describe('Test common', () => {
    test('SfcFile', () => {
        const sfcFile = new SfcFile('', sfc);
        expect(sfcFile.lang).toBe(ScriptKind.TS);
        expect(sfcFile.template?.content).toBe('<span></span>');
        expect(sfcFile.referInfos.length).toBe(2);
    });

    test('ScriptFile', () => {
        const scriptFile = new ScriptFile('', script, ScriptKind.TS);
        expect(scriptFile.referInfos.length).toBe(2);
        expect(scriptFile.referInfos[0].refer).toBe('vue');
        expect(scriptFile.referInfos[1].refer).toBe('../a');
    });
});
