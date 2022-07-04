<template>
	<o-button shape="circle">circle</o-button>
	<o-button shape="square">square</o-button>
	<o-button shape="ellipse">ellipse</o-button>
	<o-button shape="rectangle">rectangle</o-button>
	<o-button :shape="shapeRef">rectangle</o-button>
</template>

<script lang="ts">
import { ButtonShape } from '@yiird/owl';
import { defineComponent, ref } from 'vue';
export default defineComponent({
	setup() {
		const shapeRef = ref<ButtonShape>('rectangle');
		let flag = true;
		setInterval(() => {
			shapeRef.value = flag ? 'circle' : 'rectangle';
			flag = !flag;
		}, 3000);
		return {
			shapeRef
		};
	}
});
</script>

<style scoped>
.o-button {
	margin: 0.5rem;
}
</style>
