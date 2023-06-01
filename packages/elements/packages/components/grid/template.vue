<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { GridEmits, GridExpose, GridProps, setupGrid } from './logic';
/**
 * Grid使用
 * @name Grid
 */
export default defineComponent({
    name: 'Grid',
    props: GridProps,
    expose: GridExpose,
    emits: GridEmits,
    setup(props, ctx) {
        return setupGrid(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
