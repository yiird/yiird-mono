<template>
    <span class="tip">未对齐</span>
    <br />
    <y-icon
        :fixed-width="false"
        name="camera"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        name="coffee"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        name="6"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        name="home"
        size="2x"></y-icon>
    <br />
    <hr />
    <span class="tip">对齐</span>
    <br />
    <y-icon
        name="camera"
        size="2x"></y-icon>
    <y-icon
        name="coffee"
        size="2x"></y-icon>
    <y-icon
        name="6"
        size="2x"></y-icon>
    <y-icon
        name="home"
        size="2x"></y-icon>
    <br />
</template>

<script lang="ts" setup>
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/elements';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.icon {
    margin: 5px;
    background-color: aqua;
}
</style>
