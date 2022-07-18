<template>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			prefix="lock"
			type="password"
			placeholder="请输入密码">
		</o-input>
	</div>
</template>

<script
	lang="ts"
	setup>
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';
import { ref, watch } from 'vue';

addIcons(faLock);

const data = ref();

watch(data, () => {
	console.log(data.value);
});
</script>

<style
	lang="scss"
	scoped>
.demo-wrap {
	padding: 20px;
}
</style>
