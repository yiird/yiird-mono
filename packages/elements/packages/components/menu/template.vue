<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MenuEmits, MenuExpose, MenuProps, setupMenu } from './logic';
/**
 * Menu使用
 * @name Menu
 */
export default defineComponent({
    name: 'Menu',
    props: MenuProps,
    expose: MenuExpose,
    emits: MenuEmits,
    setup(props, ctx) {
        return setupMenu(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
