<template>
	<OIcon></OIcon>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import { OIcon } from '../icon';

const OButton = defineComponent({
	components: { OIcon },
	setup() {
		const aa = new Map();
		return {
			aa
		};
	}
});
export default OButton;
</script>

<style lang="scss" scoped></style>
