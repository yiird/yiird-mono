<template>
    <article
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <slot></slot>
    </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TypographyEmits, TypographyExpose, TypographyProps, setupTypography } from './logic';
/**
 * Typography使用
 * @name Typography
 */
export default defineComponent({
    name: 'Typography',
    props: TypographyProps,
    expose: TypographyExpose,
    emits: TypographyEmits,
    setup(props, ctx) {
        return setupTypography(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$color: v-bind('theme.color');
$colorSecondaryText: v-bind('theme.ye_colorSecondaryText');
$colorMark: v-bind('theme.colorMark');
@import './style.scss';
</style>
