<template>
	<div class="scroll-wrap">
		<div class="popper1">
			<o-button
				ref="popperReference1"
				size="2x"
				color="primary">
				click
			</o-button>
			<o-popper
				v-if="popperReference1"
				mode="click"
				:reference="popperReference1">
				显示气泡
			</o-popper>
		</div>
		<div class="popper2">
			<o-button
				ref="popperReference2"
				size="2x"
				color="success">
				hover
			</o-button>
			<o-popper
				v-if="popperReference2"
				:reference="popperReference2">
				显示气泡
			</o-popper>
		</div>
		<div class="popper3">
			<o-button
				ref="popperReference3"
				size="2x"
				color="warning">
				click-out
			</o-button>
			<o-popper
				v-if="popperReference3"
				mode="click-out"
				:reference="popperReference3">
				显示气泡
			</o-popper>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup>
import { ref } from 'vue';
const popperReference1 = ref();
const popperReference2 = ref();
const popperReference3 = ref();
</script>

<style
	scoped
	lang="scss">
.scroll-wrap {
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	/* height: 100px;
	overflow: scroll;
	.scroll-content {
		height: 300px;
		padding: 150px;
	} */
}
</style>
