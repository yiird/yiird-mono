<template>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			prefix-text="https://"
			placeholder="请输入">
			<template #prefix="slotScope">
				{{ slotScope.text }}
			</template>
		</o-input>
	</div>
	<div class="demo-wrap">
		<o-input
			v-model="data"
			placeholder="请输入">
			<template #prefix>
				单位(
				<o-icon
					fixed-width
					icon="dollar">
				</o-icon>
				)
			</template>
		</o-input>
	</div>
</template>

<script
	lang="ts"
	setup>
import { faDollar, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';
import { ref, watch } from 'vue';

addIcons(faUser, faUserCircle, faDollar);

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
