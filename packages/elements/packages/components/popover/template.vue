<template>
    <Teleport to="body">
        <div
            v-if="refresh__"
            :id="id__"
            ref="el"
            :style="floatingStyles"
            :class="[cType__, theme.bemModifiers]">
            <div
                ref="arrowRef"
                class="popover__arrow"></div>
            <span class="popover__text">{{ text }}</span>

            <!-- 气泡内容 -->
            <!-- @param {Boolean} is-open 打开状态 -->
            <slot :is-open="isOpen"></slot>
        </div>
    </Teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PopoverEmits, PopoverExpose, PopoverProps, setupPopover } from './logic';
/**
 * Popover使用
 * @name Popover
 */
export default defineComponent({
    name: 'Popover',
    props: PopoverProps,
    expose: PopoverExpose,
    emits: PopoverEmits,
    setup(props, ctx) {
        return setupPopover(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$bgColor: v-bind('theme.color');
$color: v-bind('theme.textColor');
$arrowSize: v-bind('theme.arrowSize');
$maxWidth: v-bind('theme.maxWidth');
$radius: v-bind('theme.radius');
$shadow: v-bind('theme.shadow');
@import './style.scss';
</style>
