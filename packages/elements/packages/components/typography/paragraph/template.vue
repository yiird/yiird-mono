<template>
    <p
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        v-ellipsis="ellipsis"
        :class="[cType__, theme.bemModifiers]">
        <slot></slot>
    </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Ellipsis } from '../../../directives';
import { ParagraphEmits, ParagraphExpose, ParagraphProps, setupParagraph } from './logic';
/**
 * Paragraph使用
 * @name Paragraph
 */
export default defineComponent({
    name: 'Paragraph',
    directives: {
        ellipsis: Ellipsis
    },
    props: ParagraphProps,
    expose: ParagraphExpose,
    emits: ParagraphEmits,
    setup(props, ctx) {
        return setupParagraph(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$lineHeight: v-bind('theme.lineHeight');
$color: v-bind('theme.color');
$colorBorder: v-bind('theme.ye_colorBorder');
$colorBg: v-bind('theme.ye_colorBg');
$indent: v-bind('theme.indent');
$colorMark: v-bind('theme.colorMark');
@import './style.scss';
</style>
