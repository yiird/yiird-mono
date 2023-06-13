<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ListEmits, ListExpose, ListProps, setupList } from './logic';
/**
 * List使用
 * @name List
 */
export default defineComponent({
    name: 'List',
    // components: { Avatar },
    props: ListProps,
    expose: ListExpose,
    emits: ListEmits,
    setup(props, ctx) {
        return setupList(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$height: v-bind('theme.height');
$fontSize: v-bind('theme.fontSize');
$dividerColor: v-bind('theme.ye_colorDivider');
$color: v-bind('theme.ye_colorPrimaryText');
$colorSecondary: v-bind('theme.ye_colorSecondaryText');

@import './style.scss';
</style>
