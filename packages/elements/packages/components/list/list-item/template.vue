<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ListItemEmits, ListItemExpose, ListItemProps, setupListItem } from './logic';
/**
 * ListItem使用
 * @name ListItem
 */
export default defineComponent({
    name: 'ListItem',
    props: ListItemProps,
    expose: ListItemExpose,
    emits: ListItemEmits,
    setup(props, ctx) {
        return setupListItem(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
