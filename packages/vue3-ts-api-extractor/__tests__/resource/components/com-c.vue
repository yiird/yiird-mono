<template>
	<button>按钮C</button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Foo = {
	o: string;
	b: object;
};

/**
 * ComC Description
 *
 * @name ComC
 * @author Lou Fei
 * @date 2015-12-12 11:22
 */
export default defineComponent({
	props: {
		/**
		 * 按钮尺寸
		 * @default `md`
		 * @private
		 * @values `xl`,`md`,`sm`
		 */
		size: String as PropType<string>,
		/**
		 * 颜色
		 *
		 * @values `red`,`green`
		 */
		color: {
			type: String as PropType<string>,
			required: true,
			default: 'red'
		}
	},
	methods: {
		/**
		 * Fn1 description
		 *
		 * @param arg1 {String} arg1 description
		 * @param arg2 {String} arg2 description
		 */
		fn1(arg1: string, arg2: number): string {
			console.log(arg1, arg2);
			return '';
		},
		/**
		 * @typedef NestFoo
		 * @property {String} b_1 property b_1's description
		 * @property {Number} b_2 property b_2's description
		 */
		/**
		 * @typedef Foo
		 * @property {String} o property o's description
		 * @property {NestFoo} b property b's description
		 */
		/**
		 * Fn2 description
		 *
		 * @param {string} arg1 arg1 description
		 * @param {Foo} arg2 arg2 description
		 */
		fn2(arg1: string, arg2: Foo): string {
			console.log(arg1, arg2);
			return '';
		}
	}
});
</script>
<style lang=""></style>
