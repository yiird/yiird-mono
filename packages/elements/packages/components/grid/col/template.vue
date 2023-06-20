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
import { checkParentType } from '../../../common/vnode-utils';
import { ColProps, useColTheme } from './logic';
/**
 * Col使用
 * @name Col
 */
export default defineComponent({
    name: 'Col',
    props: ColProps,
    setup(props) {
        if (!checkParentType('row')) {
            throw new Error('Col的父组件只能是Row');
        }
        const prefab = usePrefab(props);
        const theme = useColTheme(props);
        return {
            ...prefab,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$gutter: v-bind('theme.gutter');
@import './style.scss';
</style>
