<template>
    <span class="tip">正常</span>
    <br />
    <y-icon
        fixed-width
        icon="camera"
        animation="beat"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="coffee"
        animation="beat-fade"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="6"
        animation="fade"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="basketball"
        animation="bounce"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="home"
        animation="flip"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="bell"
        animation="shake"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        icon="sync"
        animation="spin"
        size="2x"></y-icon>
    <hr />
    <span class="tip">速度</span>
    <br />
    <y-icon
        fixed-width
        icon="camera"
        animation="beat"
        :animation-options="animationOptions"
        size="2x"></y-icon>
    <hr />
</template>

<script lang="ts" setup>
import { fa6, faBasketball, faBell, faCamera, faCoffee, faHome, faSync } from '@fortawesome/pro-solid-svg-icons';
import { addIcons, type IconAnimationOptions } from '@yiird/elements';
import { ref, type Ref } from 'vue';

addIcons(faCamera, faCoffee, fa6, faHome, faBasketball, faBell, faSync);

const animationOptions: Ref<IconAnimationOptions> = ref({
    animationDuration: '3s'
});
</script>

<style scoped>
.y-icon {
    margin: 5px;
}
</style>
