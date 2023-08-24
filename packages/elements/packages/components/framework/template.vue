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
import { FrameworkEmits, FrameworkExpose, FrameworkProps, setupFramework } from './logic';
/**
 * Framework使用
 * @name Framework
 */
export default defineComponent({
    name: 'Framework',
    props: FrameworkProps,
    expose: FrameworkExpose,
    emits: FrameworkEmits,
    setup(props, ctx) {
        return setupFramework(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$header: v-bind('theme.header');
$footer: v-bind('theme.footer');
$left: v-bind('theme.left');
$right: v-bind('theme.right');
$height: v-bind('theme.height');
@import './style.scss';
</style>
