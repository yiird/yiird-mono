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
import { SiderProps, useSiderTheme } from './logic';
/**
 * Sider使用
 * @name Sider
 */
export default defineComponent({
    name: 'Sider',
    props: SiderProps,
    setup(props) {
        const commonExposed = usePrefab(props);
        const theme = useSiderTheme(props);
        return {
            ...commonExposed,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$size: v-bind('theme.size');
$header: v-bind('theme.header');
$footer: v-bind('theme.footer');
$height: v-bind('theme.height');
@import './style.scss';
</style>
