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

<script lang="ts">
import { fa6, faBasketball, faBell, faCamera, faCoffee, faHome, faSync } from '@fortawesome/free-solid-svg-icons';
import { defineComponent, ref, type Ref } from 'vue';
import { addIcons, type IconAnimationOptions } from '../../../packages';

addIcons(faCamera, faCoffee, fa6, faHome, faBasketball, faBell, faSync);

export default defineComponent({
    setup() {
        const animationOptions: Ref<IconAnimationOptions> = ref({
            animationDuration: '3s'
        });
        return {
            animationOptions
        };
    }
});
</script>

<style scoped>
.y-icon {
    margin: 5px;
}
</style>
