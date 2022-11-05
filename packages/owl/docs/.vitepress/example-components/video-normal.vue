<template>
	<o-video src="/test.mp4"></o-video>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue';

export default defineComponent({
	setup() {
		onBeforeMount(() => {
			const zlmScript = document.createElement('script');
			zlmScript.src = '/js/ZLMRTCClient.js';
			document.head.appendChild(zlmScript);
		});
		onMounted(() => {
			console.log(window['ZLMRTCClient']);
		});
		return {};
	}
});
</script>

<style scoped></style>
