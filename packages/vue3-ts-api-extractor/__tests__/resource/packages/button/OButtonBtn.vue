<template>
	<button>
		<!-- @slot button内容 -->
		<slot></slot>
	</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * 按钮组件
 * ddddd
 * dddddddd
 */
const OButtonBtn = defineComponent({
	props: {
		/**
		 * aaaaa
		 */
		a: {
			type: [String, Number],
			required: true,
			default: '11'
		},
		/**
		 * bbbbb
		 * @values jian aaa sss
		 */
		b: {
			type: Object,
			required: true,
			default() {
				return {
					b1: 1, //ssss
					b2: 2
				};
			}
		},
		c: String
	},
	emits: ['abc', 'aaa'],
	setup(props, ctx) {
		ctx.emit('abc', false);
		return {
			aa: true
		};
	},
	methods: {
		fn1(a: string, b: number): string | number | undefined {
			this.$emit('aaa', true);
			return '';
		},
		/**
		 * 中国人最牛逼
		 * @param {string} <a=str> A的描述
		 * @param {number} b - B的描述
		 * @returns {string,string} 加那那那
		 */
		fn2: function (a: string, b: number | string) {
			console.log(1);
			return null;
		}
	}
});
export default OButtonBtn;
</script>

<style lang="scss" scoped>
@import '../../themes/styles/button.scss';
</style>
