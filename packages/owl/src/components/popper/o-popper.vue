<template>
	<Teleport :to="popperTo">
		<div
			v-show="display__"
			v-if="refresh__"
			:id="id__"
			v-bind="$attrs"
			ref="popper"
			:class="block"
			:style="{ ...theme.vars }">
			<slot></slot>
			<div
				class="arrow"
				data-popper-arrow></div>
		</div>
	</Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { usePrefab } from '../../common/prefab';
import { extractDom, PopperPlacement, PopperProps, usePopper } from './definition';

export default defineComponent({
	name: 'OPopper',
	props: PopperProps,
	setup(props) {
		const prefab = usePrefab(props);

		const { display__ } = prefab;

		const popper = ref<HTMLElement>();

		const obtainPlacement = computed<PopperPlacement>(() => props.placement);

		const obtainOffset = computed(() => {
			return [props.offset?.skid || 0, props.offset?.distance || 0];
		});

		const { popperTo, show, hide } = usePopper(extractDom(props.reference), popper, {
			placement: obtainPlacement,
			offset: obtainOffset,
			mode: props.mode,
			display: display__
		});

		return {
			...prefab,
			popperTo,
			popper,
			show,
			hide
		};
	}
});
</script>

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
