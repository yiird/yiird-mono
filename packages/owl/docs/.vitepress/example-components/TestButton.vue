<template>
	<o-button :shape="shape" :size="size"></o-button>
</template>

<script lang="ts">
import { ButtonShape, ButtonSize } from '@yiird/owl';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup() {
		const shape = ref<ButtonShape>('circle');
		const size = ref<ButtonSize>('md');
		return {
			size,
			shape
		};
	}
});
</script>

<style scoped></style>
