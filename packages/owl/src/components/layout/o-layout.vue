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
import { BemClasses } from '../../common/bem';
import { usePrefab } from '../../common/prefab';
import { Theme } from '../../theme';
import { LayoutProps, LayoutVariables, MainPosition, MainPositionKey } from './definition';

export default defineComponent({
	name: 'OLayout',
	props: LayoutProps,
	setup(props, ctx) {
		const prefab = usePrefab({ props, ctx });
		const { cType__ } = prefab;
		const theme = new Theme<LayoutVariables>(cType__);
		const bem = new BemClasses(cType__);

		const block = bem.block;

		bem.elements;
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

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
