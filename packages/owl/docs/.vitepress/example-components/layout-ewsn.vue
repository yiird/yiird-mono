<template>
	<o-layout>
		<o-header>header</o-header>
		<o-sider-right>right</o-sider-right>
		<o-sider-left>left</o-sider-left>
		<o-main>main</o-main>
		<o-footer>footer</o-footer>
	</o-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	}
});
</script>

<style
	lang="scss"
	scoped>
.o-layout {
	color: white;
	text-align: center;
	line-height: 5rem;
}
.o-header,
.o-footer {
	background-color: #42b884;
}
.o-sider-right,
.o-sider-left {
	background-color: #a5d6a7;
}

.o-main {
	background-color: #009688;
}
</style>
