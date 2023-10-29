<template>
    <span class="tip">未对齐</span>
    <br />
    <y-icon
        icon="camera"
        size="2x"></y-icon>
    <y-icon
        icon="coffee"
        size="2x"></y-icon>
    <y-icon
        icon="6"
        size="2x"></y-icon>
    <y-icon
        icon="home"
        size="2x"></y-icon>
    <br />
    <hr />
    <span class="tip">对齐</span>
    <br />
    <y-icon
        fixed-width
        icon="camera"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="coffee"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="6"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="home"
        size="2x"></y-icon>
    <br />
</template>

<script lang="ts" setup>
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/pro-solid-svg-icons';
import { addIcons } from '@yiird/elements';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.icon {
    margin: 5px;
    background-color: aqua;
}
</style>
