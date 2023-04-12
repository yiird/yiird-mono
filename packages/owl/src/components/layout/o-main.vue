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

<script lang="ts">
import { defineComponent, inject, watchEffect } from 'vue';
import { usePrefab } from '../../common/prefab';
import { MainPositionKey, MainProps, type MainVariables } from './definition';
export default defineComponent({
	name: 'OMain',
	props: MainProps,
	setup(props) {
		const prefab = usePrefab<MainVariables>(props);
		const { theme, bem } = prefab;

		const block = bem.block;

		const mainPosition = inject(MainPositionKey);

		watchEffect(() => {
			theme.originVars.right = mainPosition?.right || '0';
			theme.originVars.left = mainPosition?.left || '0';
			theme.originVars.top = mainPosition?.top || '0';
			theme.originVars.bottom = mainPosition?.bottom || '0';
		});

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
