<template>
    <h1
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TitleEmits, TitleExpose, TitleProps, setupTitle } from './logic';
/**
 * Title使用
 * @name Title
 */
export default defineComponent({
    name: 'Title',
    props: TitleProps,
    expose: TitleExpose,
    emits: TitleEmits,
    setup(props, ctx) {
        return setupTitle(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
