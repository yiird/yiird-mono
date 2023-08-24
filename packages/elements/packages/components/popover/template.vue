<template>
    <Teleport to="body">
        <div
            v-if="refresh__"
            :id="id__"
            ref="el"
            v-bind="$attrs"
            :style="floatingStyles"
            :class="[cType__, theme.bemModifiers]">
            <div
                ref="arrowRef"
                :class="`${cType__}__arrow`"></div>
            <span :class="`${cType__}__text`">{{ text }}</span>

            <div :class="`${cType__}__content`">
                <!-- 气泡内容 -->
                <!-- @param {Boolean} is-open 打开状态 -->
                <slot :is-open="isOpen"></slot>
            </div>
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
$radius: v-bind('theme.radius');
$shadow: v-bind('theme.shadow');
$padding: v-bind('theme.padding');

$minWidth: v-bind('theme.minWidth');
$maxWidth: v-bind('theme.maxWidth');
$minHeight: v-bind('theme.minHeight');
$maxHeight: v-bind('theme.maxHeight');

@import './style.scss';
</style>
