<template>
	<button>按钮D</button>
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
	emits: ['do-click'],
	setup(props, { emit }) {
		const arg1 = 0;
		const arg2 = 1;

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
		return {};
	}
});
</script>
<style lang=""></style>
