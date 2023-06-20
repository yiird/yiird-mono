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
import { usePrefab } from '../../../common/prefab';
import { checkChidrenTypeIn } from '../../../common/vnode-utils';
import { RowProps, useRowTheme } from './logic';
/**
 * Row使用
 * @name Row
 */
export default defineComponent({
    name: 'Row',
    props: RowProps,
    setup(props) {
        if (!checkChidrenTypeIn('col')) {
            throw new Error('Row的子组件只能是Col');
        }
        const commonExposed = usePrefab(props);
        const theme = useRowTheme(props);
        return {
            ...commonExposed,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$align: v-bind('theme.align');
$justify: v-bind('theme.justify');
$gutterMainAxis: v-bind('theme.gutterMainAxis');
$gutterAuxiliaryAxis: v-bind('theme.gutterAuxiliaryAxis');
@import './style.scss';
</style>
