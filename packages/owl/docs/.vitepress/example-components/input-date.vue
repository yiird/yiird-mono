<template>
	<div class="demo-wrap">
		<o-input
			type="date"
			placeholder="请输入">
		</o-input>
	</div>
</template>

<script
	lang="ts"
	setup>
import { ref } from 'vue';

const data = ref();

// watch(data, () => {
// 	console.log(data.value);
// });
</script>

<style
	lang="scss"
	scoped>
.demo-wrap {
	padding: 20px;
}
</style>
