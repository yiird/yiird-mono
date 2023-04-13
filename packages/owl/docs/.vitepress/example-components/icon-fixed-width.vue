<template>
    <span class="tip">未对齐</span>
    <br />
    <o-icon
        icon="camera"
        size="2x"></o-icon>
    <o-icon
        icon="coffee"
        size="2x"></o-icon>
    <o-icon
        icon="6"
        size="2x"></o-icon>
    <o-icon
        icon="home"
        size="2x"></o-icon>
    <br />
    <hr />
    <span class="tip">对齐</span>
    <br />
    <o-icon
        fixed-width
        icon="camera"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="coffee"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="6"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="home"
        size="2x"></o-icon>
    <br />
</template>

<script lang="ts">
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.o-icon {
    margin: 5px;
    background-color: aqua;
}
</style>
