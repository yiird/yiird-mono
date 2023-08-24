<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <component
            :is="obtainChildren"
            v-if="obtainChildren"></component>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { GroupEmits, GroupExpose, GroupProps, setupGroup } from './logic';
/**
 * Group使用
 * @name Group
 */
export default defineComponent({
    name: 'Group',
    props: GroupProps,
    expose: GroupExpose,
    emits: GroupEmits,
    setup(props, ctx) {
        return setupGroup(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$compact: v-bind('theme.compact');

@import './style.scss';
</style>
