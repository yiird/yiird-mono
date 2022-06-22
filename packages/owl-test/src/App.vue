<script lang="ts">
import { ButtonInstance } from '@yiird/owl';
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup() {
		const button = ref<ButtonInstance>();
		return {};
	}
});
</script>

<template>
	<o-button ref="button" name="aaa">3</o-button>
	<o-button name="bbb">1</o-button>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
