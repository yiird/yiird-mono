<template>
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Icon',
	props: {
		name: {
			type: String,
			default: '1'
		}
	},
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

<style lang="scss" scoped>
@import './style.scss';
</style>
