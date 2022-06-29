<template>
	<button v-show="display__" v-if="refresh__" :id="id__" :class="block" :style="{ ...theme__?.vars }">
		<!-- 默认插槽 -->
		<slot>dd</slot>
		<span :class="elements.text"></span>
	</button>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, watchEffect } from 'vue';
import { useCommon } from '../../common/logic';
import { bemKeys, cssVars, props } from './definition';

/**
 * Button使用
 * @name OButton
 */
export default defineComponent({
	name: 'Button',
	props: props,
	setup(props, ctx) {
		const prefab = useCommon({ props, ctx, bemKeys, cssVars });
		const { bem__, theme__, domRefresh: domRefresh2 } = prefab;
		const block = bem__.block;
		const elements = bem__.elements;

		const shapeRef = computed(() => {
			return 'shape-' + props.shape;
		});

		watchEffect(() => {
			bem__.addModifier(shapeRef);
		});

		return {
			...prefab,
			block,
			elements,
			domRefresh2
		};
	},
	methods: {
		doClick() {
			console.log(111);
		}
	}
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
