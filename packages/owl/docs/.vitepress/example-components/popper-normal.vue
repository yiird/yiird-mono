<template>
	<div class="opperator">
		<o-button @click="changePlacement('top')">上</o-button>
		<o-button @click="changePlacement('bottom')">下</o-button>
		<o-button @click="changePlacement('left')">左</o-button>
		<o-button @click="changePlacement('right')">右</o-button>
		<o-button @click="changePlacement('top-start')">上-开始</o-button>
		<o-button @click="changePlacement('top-end')">上-结束</o-button>
		<o-button @click="changePlacement('bottom-start')">下-开始</o-button>
		<o-button @click="changePlacement('bottom-end')">下-结束</o-button>
		<o-button @click="changePlacement('left-start')">左-开始</o-button>
		<o-button @click="changePlacement('left-end')">左-结束</o-button>
		<o-button @click="changePlacement('right-start')">右-开始</o-button>
		<o-button @click="changePlacement('right-end')">右-结束</o-button>
	</div>
	<div class="scroll-wrap">
		<div class="scroll-content">
			<o-button
				ref="popperReference"
				color="warning"
				size="3x">
				popper
			</o-button>
			<o-popper
				v-if="popperReference"
				mode="manul"
				bg-color="white"
				:display="true"
				:placement="placement"
				:reference="popperReference">
				显示起泡显示起泡显示起泡<br />
				显示起泡显示起泡显示起泡<br />
				显示起泡显示起泡显示起泡<br />
			</o-popper>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup>
import { PopperPlacement } from '@yiird/owl';
import { ref } from 'vue';
const popperReference = ref();
const placement = ref<PopperPlacement>('bottom');
const changePlacement = (_placement: PopperPlacement) => {
	placement.value = _placement;
};
</script>

<style
	scoped
	lang="scss">
.opperator {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
}
.scroll-wrap {
	height: 350px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* height: 100px;
	overflow: scroll;
	.scroll-content {
		height: 300px;
		padding: 150px;
	} */
}
</style>
