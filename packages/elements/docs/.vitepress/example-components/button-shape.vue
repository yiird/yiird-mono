<template>
    <y-btn shape="circle">
        <y-icon icon="heart"></y-icon>
    </y-btn>
    <y-btn shape="square">
        <y-icon icon="heart"></y-icon>
    </y-btn>
    <y-btn shape="ellipse">
        <y-icon icon="heart"></y-icon>
        &nbsp;椭圆形
    </y-btn>
    <y-btn shape="rectangle">
        <y-icon icon="heart"></y-icon>
        &nbsp;矩形
    </y-btn>
    <y-btn :shape="shapeRef">
        <y-icon icon="heart"></y-icon>
    </y-btn>
</template>

<script lang="ts">
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { defineComponent, ref } from 'vue';
import { addIcons, type BtnShape } from '../../../packages';
addIcons(faHeart);
export default defineComponent({
    setup() {
        const shapeRef = ref<BtnShape>('rectangle');
        let flag = true;
        setInterval(() => {
            shapeRef.value = flag ? 'circle' : 'rectangle';
            flag = !flag;
        }, 3000);
        return {
            shapeRef
        };
    }
});
</script>

<style scoped>
.btn {
    margin: 0.5rem;
}
</style>
