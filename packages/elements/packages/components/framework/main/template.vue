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
import { MainProps, useMainTheme } from './logic';
/**
 * Main使用
 * @name Main
 */
export default defineComponent({
    name: 'Main',
    props: MainProps,
    setup(props) {
        const prefab = usePrefab(props);
        const theme = useMainTheme(props);
        return {
            ...prefab,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$header: v-bind('theme.header');
$footer: v-bind('theme.footer');
$left: v-bind('theme.left');
$right: v-bind('theme.right');
$height: v-bind('theme.height');
@import './style.scss';
</style>
