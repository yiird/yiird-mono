<template>
	<component :is="example"></component>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
	setup() {
		const example = ref<string>();
		onMounted(() => {
			if (window) {
				window.addEventListener(
					'message',
					(event) => {
						example.value = event.data;
					},
					false
				);
				window.parent.postMessage('ready', '*');
			}
		});
		return {
			example
		};
	}
});
</script>

<style lang="scss" scoped></style>
