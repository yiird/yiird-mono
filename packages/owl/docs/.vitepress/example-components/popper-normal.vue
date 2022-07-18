<template>
	<div class="scroll-wrap">
		<div class="scroll-content">
			<o-button ref="popperReference">popper</o-button>
			<o-popper
				v-if="popperReference"
				:reference="popperReference">
				显示起泡
			</o-popper>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup>
import { ref } from 'vue';
const popperReference = ref();
</script>

<style
	scoped
	lang="scss">
.scroll-wrap {
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* height: 100px;
	overflow: scroll;
	.scroll-content {
		height: 300px;
		padding: 150px;
	} */
}
</style>
