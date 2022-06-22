<template>
	<div class="logo">
		<img :src="fm.hero.logo" alt="" />
	</div>
</template>

<script lang="ts">
import { useData } from 'vitepress';
import { defineComponent } from 'vue';
export default defineComponent({
	setup() {
		const { frontmatter: fm } = useData();
		return {
			fm: fm
		};
	}
});
</script>

<style lang="scss" scoped>
.logo {
	img {
		display: flex;
		justify-content: center;
		margin: auto;
		width: 200px;
	}
}
</style>
