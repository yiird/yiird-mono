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

<style lang="scss">
.tip {
	background-color: #eee;
	padding: 0.1rem 1rem;
	display: block;
	color: #8e8e8e;
	font-size: 1rem;
	box-shadow: 1px 1px 6px 0px rgb(128 128 128 / 24%);
	overflow: hidden;
	font-size: 0.8rem;
	min-width: 5rem;
	text-align: center;
	line-height: 1.5rem;
	float: right;
	clear: both;
}
hr {
	margin-bottom: 0;
	border-color: #e7e7e7;
	border-top: none;
}
</style>
