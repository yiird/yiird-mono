<template>
    <h1
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        v-ellipsis="ellipsis"
        :class="[cType__, theme.bemModifiers]">
        <slot></slot>
    </h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ellipsis } from '../../../directives';
import { TitleEmits, TitleExpose, TitleProps, setupTitle } from './logic';
/**
 * Title使用
 * @name Title
 */
export default defineComponent({
    name: 'Title',
    directives: {
        ellipsis
    },
    props: TitleProps,
    expose: TitleExpose,
    emits: TitleEmits,
    setup(props, ctx) {
        return setupTitle(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$align: v-bind('theme.align');
$lineHeight: v-bind('theme.lineHeight');
$color: v-bind('theme.color');
$colorMark: v-bind('theme.colorMark');
@import './style.scss';
</style>
