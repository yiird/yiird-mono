<template>
    <span class="tip">1x - 10x</span>
    <br />
    <y-icon
        icon="camera"
        size="1x"></y-icon>
    <y-icon
        icon="camera"
        size="2x"></y-icon>
    <y-icon
        icon="camera"
        size="3x"></y-icon>
    <y-icon
        icon="camera"
        size="4x"></y-icon>
    <y-icon
        icon="camera"
        size="5x"></y-icon>
    <y-icon
        icon="camera"
        size="6x"></y-icon>
    <y-icon
        icon="camera"
        size="7x"></y-icon>
    <y-icon
        icon="camera"
        size="8x"></y-icon>
    <y-icon
        icon="camera"
        size="9x"></y-icon>
    <y-icon
        icon="camera"
        size="10x"></y-icon>
    <hr />
    <span class="tip">2xs - 2xl</span>
    <br />
    <y-icon
        icon="camera"
        size="2xs"></y-icon>
    <y-icon
        icon="camera"
        size="xs"></y-icon>
    <y-icon
        icon="camera"
        size="sm"></y-icon>
    <y-icon
        icon="camera"
        size="lg"></y-icon>
    <y-icon
        icon="camera"
        size="xl"></y-icon>
    <y-icon
        icon="camera"
        size="2xl"></y-icon>
</template>

<script lang="ts">
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { defineComponent } from 'vue';
import { addIcons } from '../../../packages';

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
.y-icon {
    margin: 5px;
}
</style>
