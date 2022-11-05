<template>
	<o-button shape="circle">
		<o-icon icon="heart"></o-icon>
	</o-button>
	<o-button shape="square">
		<o-icon icon="heart"></o-icon>
	</o-button>
	<o-button shape="ellipse">
		<o-icon icon="heart"></o-icon>
		&nbsp;椭圆形
	</o-button>
	<o-button shape="rectangle">
		<o-icon icon="heart"></o-icon>
		&nbsp;矩形
	</o-button>
	<o-button :shape="shapeRef">
		<o-icon icon="heart"></o-icon>
	</o-button>
</template>

<script lang="ts">
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addIcons, ButtonShape } from '@yiird/owl';
import { defineComponent, ref } from 'vue';
addIcons(faHeart);
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
