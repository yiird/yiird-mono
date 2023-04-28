<template>
    <span class="tip">未对齐</span>
    <br />
    <y-icon
        :fixed-width="false"
        icon="camera"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        icon="coffee"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        icon="6"
        size="2x"></y-icon>
    <y-icon
        :fixed-width="false"
        icon="home"
        size="2x"></y-icon>
    <br />
    <hr />
    <span class="tip">对齐</span>
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
</template>

<script lang="ts">
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '../../../packages';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.icon {
    margin: 5px;
    background-color: aqua;
}
</style>
