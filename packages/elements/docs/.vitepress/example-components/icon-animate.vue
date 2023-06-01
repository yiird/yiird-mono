<template>
    <span class="tip">正常</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        animation="beat"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="coffee"
        animation="beat-fade"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="6"
        animation="fade"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="basketball"
        animation="bounce"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="home"
        animation="flip"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="bell"
        animation="shake"
        size="2x"></y-icon>
    <y-icon
        fixed-width
        name="sync"
        animation="spin"
        size="2x"></y-icon>
    <hr />
    <span class="tip">速度</span>
    <br />
    <y-icon
        fixed-width
        name="camera"
        animation="beat"
        :animation-options="animationOptions"
        size="2x"></y-icon>
    <hr />
</template>

<script lang="ts" setup>
import { fa6, faBasketball, faBell, faCamera, faCoffee, faHome, faSync } from '@fortawesome/free-solid-svg-icons';
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
