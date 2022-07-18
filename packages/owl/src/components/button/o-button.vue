<template>
	<button
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		:class="block"
		:disabled="disabled"
		:style="{ ...theme.vars }">
		<!-- 默认插槽 -->
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { capitalize } from 'lodash-es';
import { defineComponent, inject, watchEffect } from 'vue';
import { usePrefab } from '../../common/prefab';
import { GlobalThemeKey } from '../../theme';
import { ButtonBemKeys, ButtonProps, ButtonVariables } from './definition';

/**
 * Button使用
 * @name OButton
 */
export default defineComponent({
	name: 'OButton',
	props: ButtonProps,
	setup(props) {
		const prefab = usePrefab<ButtonVariables, ButtonBemKeys>(props);
		const { theme, bem } = prefab;

		const globalTheme = inject(GlobalThemeKey);

		const block = bem.block;
		const elements = bem.elements;

		const obtainBgColor = computed(() => {
			const color = props.color;
			const key = `color${capitalize(color)}`;
			return globalTheme?.varNames[key];
		});

		const obtainTextColor = computed(() => {
			return props.textColor || 'white';
		});

		const obtainShape = computed(() => {
			return 'shape-' + props.shape;
		});

		const obtainSize = computed(() => {
			return 'size-' + props.size;
		});

		const obtainMode = computed(() => {
			return 'mode-' + props.mode;
		});

		watchEffect(() => {
			theme.originVars.bgColor = `var(${obtainBgColor.value})`;
			theme.originVars.textColor = obtainTextColor.value;
			if (props.disabled) {
				bem.addModifier('state-disabled');
			} else {
				bem.removeModifier('state-disabled');
			}
		});
		bem.addModifier(obtainShape, obtainSize, obtainMode);

		return {
			...prefab,
			theme,
			block,
			elements
		};
	}
});
</script>

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
