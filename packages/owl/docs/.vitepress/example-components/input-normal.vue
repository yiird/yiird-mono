<template>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			placeholder="请输入">
		</o-input>
	</div>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			prefix="user"
			placeholder="请输入">
		</o-input>
	</div>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			prefix-text="http://"
			placeholder="请输入">
		</o-input>
	</div>

	<div class="demo-wrap">
		<o-input
			v-model="data"
			suffix="dollar-sign"
			suffix-text="美元"
			placeholder="请输入">
		</o-input>
	</div>

	<div class="demo-wrap">
		<o-input
			:loading="loading"
			placeholder="Loading效果">
		</o-input>
	</div>
</template>

<script
	lang="ts"
	setup>
import { faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';
import { ref, watch } from 'vue';

addIcons(faUser, faDollarSign);

const data = ref();

watch(data, () => {
	console.log(data.value);
});

const loading = ref(true);
</script>

<style
	lang="scss"
	scoped>
.demo-wrap {
	padding: 20px;
}
</style>
