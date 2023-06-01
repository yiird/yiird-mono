<template>
    <y-btn shape="circle">
        <y-icon name="heart"></y-icon>
    </y-btn>
    <y-btn shape="square">
        <y-icon name="heart"></y-icon>
    </y-btn>
    <y-btn shape="ellipse">
        <y-icon name="heart"></y-icon>
        &nbsp;椭圆形
    </y-btn>
    <y-btn shape="rectangle">
        <y-icon name="heart"></y-icon>
        &nbsp;矩形
    </y-btn>
    <y-btn :shape="shapeRef">
        <y-icon name="heart"></y-icon>
    </y-btn>
    <br />
    <y-btn
        shape="circle"
        color="primary">
        <y-icon name="heart"></y-icon>
    </y-btn>
    <y-btn
        shape="square"
        color="primary"
        mode="link">
        <y-icon name="heart"></y-icon>
    </y-btn>
    <y-btn
        shape="ellipse"
        color="primary"
        mode="dashed">
        <y-icon name="heart"></y-icon>
        &nbsp;椭圆形
    </y-btn>
    <y-btn
        shape="rectangle"
        color="primary"
        mode="half">
        <y-icon name="heart"></y-icon>
        &nbsp;矩形
    </y-btn>
    <y-btn
        :shape="shapeRef"
        color="primary"
        mode="empty">
        <y-icon name="heart"></y-icon>
    </y-btn>
</template>

<script lang="ts" setup>
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addIcons, type BtnShape } from '@yiird/elements';
import { ref } from 'vue';
addIcons(faHeart);
const shapeRef = ref<BtnShape>('rectangle');
let flag = true;
setInterval(() => {
    shapeRef.value = flag ? 'circle' : 'rectangle';
    flag = !flag;
}, 3000);
</script>

<style scoped>
.btn {
    margin: 0.5rem;
}
</style>
