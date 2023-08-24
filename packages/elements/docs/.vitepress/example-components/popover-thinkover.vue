<template>
    <y-space direction="v">
        <y-button color="error" :icon="faCircleCamera" ref="reference1">反例</y-button>
        <y-button color="success" :icon="faCircleCamera" ref="reference2">正确</y-button>
    </y-space>

    <y-popover
        mode="click-leave"
        color="black"
        max-width="100px"
        :reference="reference1"
        text="当鼠标离开参考元素，立马消失"></y-popover>
        
    <y-popover
        mode="click-leave"
        color="black"
        hide-think-over-pop
        max-width="100px"
        :reference="reference2"
        text="当鼠标离开参考元素，移动到pop上时，不会消失"></y-popover>
    
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const reference1 = ref();
const reference2 = ref();
</script>
