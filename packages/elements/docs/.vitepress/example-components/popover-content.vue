<template>
    <y-space direction="v">
        <y-icon-text
            :icon="faCircleCamera"
            text="放到 text 属性中"
            ref="reference1"></y-icon-text>

        <y-icon-text
            :icon="faCircleCamera"
            text="放到 默认插槽 属性中"
            ref="reference2"></y-icon-text>
    </y-space>

    <y-popover
        mode="click-leave"
        color="black"
        max-width="100px"
        :reference="reference1"
        text="内容在text中"></y-popover>
    <y-popover
        mode="click-leave"
        color="black"
        max-width="100px"
        :reference="reference2">
        <div style="color: white">内容在插槽中</div>
    </y-popover>
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const reference1 = ref();
const reference2 = ref();
</script>
