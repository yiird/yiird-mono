<template>
	<div class="demo-wrap">
		<o-input
			v-model="data1"
			bind="prefix"
			prefix-text="http://"
			placeholder="绑定前缀">
		</o-input>
	</div>

	<div class="demo-wrap">
		<o-input
			v-model="data2"
			bind="suffix"
			suffix="dollar-sign"
			suffix-text="美元"
			placeholder="绑定后缀">
		</o-input>
	</div>

	<div class="demo-wrap">
		<o-input
			v-model="data3"
			bind="all"
			prefix-text="http://"
			suffix-text=".com"
			placeholder="绑定前缀和后缀">
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

const data1 = ref();
const data2 = ref();
const data3 = ref();

watch(data1, () => {
	console.log(data1.value);
});

watch(data2, () => {
	console.log(data2.value);
});
watch(data3, () => {
	console.log(data3.value);
});
</script>

<style
	lang="scss"
	scoped>
.demo-wrap {
	padding: 20px;
}
</style>
