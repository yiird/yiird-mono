<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SpaceEmits, SpaceExpose, SpaceProps, setupSpace } from './logic';
/**
 * Space使用
 * @name Space
 */
export default defineComponent({
    name: 'Space',
    props: SpaceProps,
    expose: SpaceExpose,
    emits: SpaceEmits,
    setup(props, ctx) {
        return setupSpace(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$mainAxis: v-bind('theme.mainAxis');
$crossAxis: v-bind('theme.crossAxis');
$gap: v-bind('theme.gap');

@import './style.scss';
</style>
