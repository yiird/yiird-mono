<template>
	<span class="tip">1x - 10x</span>
	<br />
	<o-icon
		icon="camera"
		size="1x"></o-icon>
	<o-icon
		icon="camera"
		size="2x"></o-icon>
	<o-icon
		icon="camera"
		size="3x"></o-icon>
	<o-icon
		icon="camera"
		size="4x"></o-icon>
	<o-icon
		icon="camera"
		size="5x"></o-icon>
	<o-icon
		icon="camera"
		size="6x"></o-icon>
	<o-icon
		icon="camera"
		size="7x"></o-icon>
	<o-icon
		icon="camera"
		size="8x"></o-icon>
	<o-icon
		icon="camera"
		size="9x"></o-icon>
	<o-icon
		icon="camera"
		size="10x"></o-icon>
	<hr />
	<span class="tip">xs sm lg</span>
	<br />
	<o-icon
		icon="camera"
		size="xs"></o-icon>
	<o-icon
		icon="camera"
		size="sm"></o-icon>
	<o-icon
		icon="camera"
		size="lg"></o-icon>
</template>

<script lang="ts">
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';
import { defineComponent } from 'vue';

//这里是做演示，添加图标应在程序入口处，vue安装owl插件时进行配置
/*
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {createUI,OwlOptions} from '@yiird/owl';
const app = Vue.createApp();

const options:OwlOptions = {
	icons:[faCamera]
}
app.use(createUI(),options)
*/
addIcons(faCamera);

export default defineComponent({
	setup() {
		return {};
	}
});
</script>

<style scoped>
.o-icon {
	margin: 5px;
}
</style>
