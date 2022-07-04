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
import { MainPositionKey, SiderProps, SiderVariables } from './definition';
export default defineComponent({
	name: 'OSiderRight',
	props: SiderProps,
	setup(props, ctx) {
		const mainPosition = inject(MainPositionKey);

		const prefab = usePrefab({ props, ctx });
		const { cType__ } = prefab;

		if (mainPosition && mainPosition.existSider === cType__) {
			throw Error('不能在同一侧，放置两个Sider组件');
		}

		const theme = new Theme<SiderVariables>(cType__);
		const bem = new BemClasses(cType__);
		const block = bem.block;

		const obtainWidth = computed(() => {
			return props.width;
		});

		theme.originVars.left = 'unset';
		theme.originVars.right = '0';

		watchEffect(() => {
			if (mainPosition) {
				mainPosition.right = obtainWidth.value;
			}

			theme.originVars.width = obtainWidth.value;
			theme.originVars.top = mainPosition?.top || '0';
			theme.originVars.bottom = mainPosition?.bottom || '0';
		});

		onScopeDispose(() => {
			if (mainPosition) {
				mainPosition.right = undefined;
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
