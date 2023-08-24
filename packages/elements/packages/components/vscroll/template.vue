<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="container"
        :class="[cType__, theme.bemModifiers]">
        <template v-for="item in obtainSource">
            <slot
                v-if="item.inView"
                :key="item.index"
                :it="item.it"></slot>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { VscrollEmits, VscrollExpose, VscrollProps, setupVscroll } from './logic';
/**
 * Vscroll使用
 * @name Vscroll
 */
export default defineComponent({
    name: 'Vscroll',
    props: VscrollProps,
    expose: VscrollExpose,
    emits: VscrollEmits,
    setup(props, ctx) {
        return setupVscroll(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$height: v-bind('theme.height');

@import './style.scss';
</style>
