<template>
	<button>按钮Emits</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ComDProps } from './assist/ComDProps';
/**
 * ComEmits Description
 *
 * @name ComEmits
 * @author Lou Fei
 * @date 2015-12-12 11:22
 */
export default defineComponent({
	props: ComDProps,
	emits: ['do-click', 'do-click-2', 'do-click-3'],
	setup(props, { emit }) {
		const arg1 = 0;
		const arg2 = {
			o: 'o',
			b: 'b'
		};

		/**
		 * @typedef Foo
		 * @property o {string} property o's description
		 * @property b {string} property b's description
		 */
		/**
		 * do-click 事件
		 * @param arg1 {Number} arg1 description
		 * @param arg2 {Foo} arg2 description
		 */
		emit('do-click', arg1, arg2);

		/**
		 * @typedef Foo2
		 * @property o {string} property o's description
		 * @property b {string} property b's description
		 */
		/**
		 * do-click2 事件
		 * @param arg1 {Foo2} arg1 description
		 */
		emit('do-click-2', {
			a: '0',
			b: '1'
		});

		return {};
	},
	methods: {
		emitFn() {
			/**
			 * @typedef Foo3
			 * @property o {string} property o's description
			 * @property b {string} property b's description
			 */
			/**
			 * do-click3 事件
			 * @param arg1 {Foo3} arg1 description
			 */
			this.$emit('do-click-3', {
				a: '2',
				b: '3'
			});
		}
	}
});
</script>
<style lang=""></style>
