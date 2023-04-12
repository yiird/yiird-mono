<template>
	<div
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		:class="block"
		:style="{ ...theme.vars }">
		<slot></slot>
	</div>
</template>

<script lang="tsx">
import { defineComponent, provide, reactive } from 'vue';
import { usePrefab } from '../../common/prefab';
import { LayoutProps, type LayoutVariables, type MainPosition, MainPositionKey } from './definition';

export default defineComponent({
	name: 'OLayout',
	props: LayoutProps,
	setup(props) {
		const prefab = usePrefab<LayoutVariables>(props);
		const { theme, bem } = prefab;

		const block = bem.block;

		const mainPosition = reactive<MainPosition>({});
		provide(MainPositionKey, mainPosition);

		return {
			...prefab,
			theme,
			block
		};
	}
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
