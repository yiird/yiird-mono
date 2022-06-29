<template>
	<Content />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
	setup() {
		onMounted(() => {
			const classList = document.documentElement.classList;
			const query = window.matchMedia('(prefers-color-scheme: dark)');
			function setClass(dark: boolean): void {
				classList[dark ? 'add' : 'remove']('dark');
			}
			window.addEventListener('storage', () => {
				let userPreference = localStorage.getItem('vitepress-theme-appearance') || 'auto';
				let isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark';
				setClass(isDark);
			});
		});
	}
});
</script>

<style scoped></style>
