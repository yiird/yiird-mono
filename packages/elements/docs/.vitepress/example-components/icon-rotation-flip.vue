<template>
    <span class="tip">正常</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        size="2x"></y-icon>
    <hr />
    <span class="tip">旋转</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        rotation="90"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        rotation="90"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        rotation="90"
        size="2x"></y-icon>
    <hr />
    <span class="tip">翻转-horizontal</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        flip="horizontal"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        flip="horizontal"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        flip="horizontal"
        size="2x"></y-icon>
    <hr />
    <span class="tip">翻转-vertical</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        flip="vertical"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        flip="vertical"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        flip="vertical"
        size="2x"></y-icon>
    <hr />
    <span class="tip">翻转-both</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        flip="both"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        flip="both"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        flip="both"
        size="2x"></y-icon>
</template>

<script lang="ts" setup>
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/elements';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.icon {
    margin: 5px;
}
</style>
