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
import { ScrollEmits, ScrollExpose, ScrollProps, setupScroll } from './logic';
/**
 * Scroll使用
 * @name Scroll
 */
export default defineComponent({
    name: 'Scroll',
    props: ScrollProps,
    expose: ScrollExpose,
    emits: ScrollEmits,
    setup(props, ctx) {
        return setupScroll(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$width: v-bind('theme.width');
$height: v-bind('theme.height');

@import './style.scss';
</style>
