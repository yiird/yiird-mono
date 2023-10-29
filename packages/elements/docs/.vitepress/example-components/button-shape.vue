<template>
    <div class="wrap">
        <y-button shape="circle">
            <y-icon icon="heart"></y-icon>
        </y-button>
        <y-button shape="square">
            <y-icon icon="heart"></y-icon>
        </y-button>
        <y-button shape="ellipse">
            <y-icon icon="heart"></y-icon>
            &nbsp;椭圆形
        </y-button>
        <y-button shape="rectangle">
            <y-icon icon="heart"></y-icon>
            &nbsp;矩形
        </y-button>
        <y-button :shape="shapeRef">
            <y-icon icon="heart"></y-icon>
        </y-button>
        <br />
        <y-button
            shape="circle"
            color="primary">
            <y-icon icon="heart"></y-icon>
        </y-button>
        <y-button
            shape="square"
            color="primary"
            mode="link">
            <y-icon icon="heart"></y-icon>
        </y-button>
        <y-button
            shape="ellipse"
            color="primary"
            mode="dashed">
            <y-icon icon="heart"></y-icon>
            &nbsp;椭圆形
        </y-button>
        <y-button
            shape="rectangle"
            color="primary"
            mode="half">
            <y-icon icon="heart"></y-icon>
            &nbsp;矩形
        </y-button>
        <y-button
            :shape="shapeRef"
            color="primary"
            mode="empty">
            <y-icon icon="heart"></y-icon>
        </y-button>
    </div>
</template>

<script lang="ts" setup>
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { addIcons, } from '@yiird/elements';
import { ref } from 'vue';
addIcons(faHeart);
const shapeRef = ref('rectangle');
let flag = true;
setInterval(() => {
    shapeRef.value = flag ? 'circle' : 'rectangle';
    flag = !flag;
}, 3000);
</script>

<style scoped>
.wrap :deep(.button) {
    margin: 0.5rem;
}
</style>
