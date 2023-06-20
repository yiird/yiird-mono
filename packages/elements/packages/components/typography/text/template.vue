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
import { TextEmits, TextExpose, TextProps, setupText } from './logic';
/**
 * Text使用
 * @name Text
 */
export default defineComponent({
    name: 'Text',
    props: TextProps,
    expose: TextExpose,
    emits: TextEmits,
    setup(props, ctx) {
        return setupText(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$color: v-bind('theme.color');
$codeColorBorder: v-bind('theme.ye_colorBorder');
$codeColorBg: v-bind('theme.ye_colorBg');
$colorMark: v-bind('theme.colorMark');

@import './style.scss';
</style>
