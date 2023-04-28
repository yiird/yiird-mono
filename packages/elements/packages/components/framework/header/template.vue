<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
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
        const prefab = usePrefab(props);
        const theme = useHeaderTheme(props);
        return {
            ...prefab,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$size: v-bind('theme.size');
@import './style.scss';
</style>
