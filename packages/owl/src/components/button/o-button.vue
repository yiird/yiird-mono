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
import { BemClasses } from '../../common/bem';
import { usePrefab } from '../../common/prefab';
import { GlobalThemeKey, Theme } from '../../theme';
import { ButtonBemKeys, ButtonProps, ButtonVariables } from './definition';

/**
 * Button使用
 * @name OButton
 */
export default defineComponent({
	name: 'OButton',
	props: ButtonProps,
	setup(props, ctx) {
		const prefab = usePrefab({ props, ctx });
		const { cType__ } = prefab;

		const globalTheme = inject(GlobalThemeKey);

		const theme = new Theme<ButtonVariables>(cType__);

		const bem = new BemClasses<ButtonBemKeys>(cType__);

		const obtainBgColor = computed(() => {
			const color = props.color;
			const key = `color${capitalize(color)}`;
			return globalTheme?.varNames[key];
		});

		const obtainTextColor = computed(() => {
			return props.textColor || 'white';
		});

		const block = bem.block;
		const elements = bem.elements;

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
	},
	methods: {
		doClick() {
			console.log(111);
		}
	}
});
</script>

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
