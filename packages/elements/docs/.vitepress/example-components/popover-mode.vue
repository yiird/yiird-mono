<template>
    <y-space direction="v">
        <y-icon-text
            :icon="faCircleCamera"
            text="点击显示、移出消失"
            id="popover-mode-1"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            text="点击显示、点击其他地方消失"
            id="popover-mode-2"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            text="移入显示，移出消失"
            id="popover-mode-3"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            @click="display = !display"
            text="手动处理"
            id="popover-mode-4"></y-icon-text>
    </y-space>
    <y-popover
        mode="click-leave"
        max-width="100px"
        reference="#popover-mode-1"
        text="这里是提示信息"></y-popover>
    <y-popover
        mode="click-out"
        max-width="100px"
        reference="#popover-mode-2"
        text="这里是提示信息"></y-popover>
    <y-popover
        mode="hover"
        max-width="100px"
        reference="#popover-mode-3"
        hide-think-over-pop
        text="这里是提示信息"></y-popover>
    <y-popover
        :display="display"
        mode="manual"
        max-width="100px"
        reference="#popover-mode-4"
        text="这里是提示信息"></y-popover>
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const display = ref(false);

const reference = ref();
</script>
