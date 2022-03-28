<template>
	<button v-if="refresh__" v-show="display__" :id="id__" v-bind="$attrs" ref="rootRef" :class="class__">
		<slot name="header" item="11">
			<!-- 顶部插槽 -->
			<!-- item {args0:参数1,args1: 参数2} -->
		</slot>
	</button>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { withPrefab } from '../../core/logic-base';
import { ButtonProps } from './o-button-props';

/**
 * 按钮组件
 * ddddd
 * dddddddd
 */
export default defineComponent({
	name: 'OButton',
	props: ButtonProps,
	emits: ['aa', 'bb'],
	setup(props, ctx) {
		const prefab = withPrefab({ props, ctx });

		//尺寸样式
		const obtainSizeClass = computed(() => {
			return !props.size || prefab.cType__ + '--' + props.size;
		});
		const obtainShapeClass = computed(() => {
			return !props.shape || prefab.cType__ + '--' + props.shape;
		});

		const obtainColorAndModeClass = computed(() => {
			return !props.color || prefab.cType__ + '--' + props.color + (props.mode ? '--' + props.mode : '');
		});

		const obtainDisabledClass = computed(() => {
			return !props.disabled || prefab.cType__ + '--disabled';
		});

		prefab.addClass([obtainColorAndModeClass, obtainSizeClass, obtainShapeClass, obtainDisabledClass]);

		const rootRef = ref<HTMLButtonElement | null>(null);
		const obtainText = ref<string>();

		onMounted(() => {
			obtainText.value = rootRef.value?.innerText;
		});

		return {
			...prefab,
			rootRef,
			obtainText,
			aa: true
		};
	},
	methods: {
		fn1(): string | number | undefined {
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
</script>

<style lang="scss" scoped>
@import '../../themes/styles/button.scss';
</style>
