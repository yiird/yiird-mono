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
import { HeaderProps, useHeaderTheme } from './logic';
/**
 * Header使用
 * @name Header
 */
export default defineComponent({
    name: 'Header',
    props: HeaderProps,
    setup(props) {
        const commonExposed = usePrefab(props);
        const theme = useHeaderTheme(props);
        return {
            ...commonExposed,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$size: v-bind('theme.size');
@import './style.scss';
</style>
