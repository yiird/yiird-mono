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
import { computed, defineComponent, inject, onScopeDispose, watchEffect } from 'vue';
import { BemClasses } from '../../common/bem';
import { usePrefab } from '../../common/prefab';
import { Theme } from '../../theme';
import { FooterVariables, HeaderProps, MainPositionKey } from './definition';

export default defineComponent({
	name: 'OFooter',
	props: HeaderProps,
	setup(props, ctx) {
		const prefab = usePrefab({ props, ctx });
		const { cType__ } = prefab;

		const theme = new Theme<FooterVariables>(cType__);
		const bem = new BemClasses(cType__);
		const block = bem.block;

		const obtainHeight = computed(() => {
			return props.height;
		});

		const mainPosition = inject(MainPositionKey);

		watchEffect(() => {
			if (mainPosition) {
				mainPosition.bottom = obtainHeight.value;
			}
			theme.originVars.height = obtainHeight.value;
		});

		onScopeDispose(() => {
			if (mainPosition) {
				mainPosition.bottom = undefined;
			}
		});

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
