<template>
    <y-space direction="v">
        <y-icon-text
            :icon="faCircleCamera"
            text="点击显示、移出消失"
            ref="reference1"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            text="点击显示、点击其他地方消失"
            ref="reference2"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            text="移入显示，移出消失"
            ref="reference3"></y-icon-text>
        <y-icon-text
            :icon="faCircleCamera"
            @click="toggle"
            text="手动处理"
            ref="reference4"></y-icon-text>
    </y-space>
    <y-popover
        mode="click-leave"
        max-width="100px"
        :reference="reference1"
        text="这里是提示信息"></y-popover>
    <y-popover
        mode="click-out"
        max-width="100px"
        :reference="reference2"
        text="这里是提示信息"></y-popover>
    <y-popover
        mode="hover"
        max-width="100px"
        :reference="reference3"
        text="这里是提示信息"></y-popover>
    <y-popover
        ref="manualPopover"
        mode="manual"
        max-width="100px"
        :reference="reference4"
        text="这里是提示信息"></y-popover>
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import type { PopoverType } from '@yiird/elements';
import { ref } from 'vue';

const reference1 = ref();
const reference2 = ref();
const reference3 = ref();
const reference4 = ref();

const manualPopover = ref<PopoverType>();

const toggle = ()=>{
    manualPopover.value?.toggle()
}
</script>
