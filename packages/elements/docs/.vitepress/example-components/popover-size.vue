<template>
    <y-button
        :icon="faCircleCamera"
        color="primary"
        ref="reference">
        点我
    </y-button>

    <y-popover
        mode="click"
        color="black"
        :width="{
            max:'100px',
            min:'100px'
        }" 
        :height="{
            max:'100px',
            min:'100px'
        }"
        :reference="reference"
        text="通过设置参考元素的ref引用来绑定"></y-popover>
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const reference = ref();
</script>
