<template>
    <div class="wrap">
        <y-button shape="circle">
            <y-icon name="heart"></y-icon>
        </y-button>
        <y-button shape="square">
            <y-icon name="heart"></y-icon>
        </y-button>
        <y-button shape="ellipse">
            <y-icon name="heart"></y-icon>
            &nbsp;椭圆形
        </y-button>
        <y-button shape="rectangle">
            <y-icon name="heart"></y-icon>
            &nbsp;矩形
        </y-button>
        <y-button :shape="shapeRef">
            <y-icon name="heart"></y-icon>
        </y-button>
        <br />
        <y-button
            shape="circle"
            color="primary">
            <y-icon name="heart"></y-icon>
        </y-button>
        <y-button
            shape="square"
            color="primary"
            mode="link">
            <y-icon name="heart"></y-icon>
        </y-button>
        <y-button
            shape="ellipse"
            color="primary"
            mode="dashed">
            <y-icon name="heart"></y-icon>
            &nbsp;椭圆形
        </y-button>
        <y-button
            shape="rectangle"
            color="primary"
            mode="half">
            <y-icon name="heart"></y-icon>
            &nbsp;矩形
        </y-button>
        <y-button
            :shape="shapeRef"
            color="primary"
            mode="empty">
            <y-icon name="heart"></y-icon>
        </y-button>
    </div>
</template>

<script lang="ts" setup>
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
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
.wrap :deep(.button) {
    margin: 0.5rem;
}
</style>
