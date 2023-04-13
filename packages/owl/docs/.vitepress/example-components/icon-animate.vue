<template>
    <span class="tip">正常</span>
    <br />
    <o-icon
        fixed-width
        icon="camera"
        animation="beat"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="coffee"
        animation="beat-fade"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="6"
        animation="fade"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="basketball"
        animation="bounce"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="home"
        animation="flip"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="bell"
        animation="shake"
        size="2x"></o-icon>
    <o-icon
        fixed-width
        icon="sync"
        animation="spin"
        size="2x"></o-icon>
    <hr />
    <span class="tip">速度</span>
    <br />
    <o-icon
        fixed-width
        icon="camera"
        animation="beat"
        :animation-options="animationOptions"
        size="2x"></o-icon>
    <hr />
</template>

<script lang="ts">
import { fa6, faBasketball, faBell, faCamera, faCoffee, faHome, faSync } from '@fortawesome/free-solid-svg-icons';
import { addIcons, IconAnimationOptions } from '@yiird/owl';
import { defineComponent, ref, Ref } from 'vue';

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
.o-icon {
    margin: 5px;
}
</style>
