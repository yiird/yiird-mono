<template>
	<button>按钮D</button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

const BaseProps = {
	/**
	 * id
	 */
	id: {
		type: String,
		required: true
	}
};

const ComDProps = {
	...BaseProps,
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
};

/**
 * ComD Description
 *
 * @name ComD
 * @author Lou Fei
 * @date 2015-12-12 11:22
 */
export default defineComponent({
	props: ComDProps
});
</script>
<style lang=""></style>
