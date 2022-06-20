<template>
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'OIcon',
	setup() {
		return {
			icon: '22'
		};
	},
	methods: {
		doClick() {
			console.log('click');
		}
	}
});
</script>

<style lang="scss" scoped></style>
