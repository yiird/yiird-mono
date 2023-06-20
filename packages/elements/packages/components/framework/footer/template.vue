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
import { FooterProps, useFooterTheme } from './logic';
/**
 * Footer使用
 * @name Footer
 */
export default defineComponent({
    name: 'Footer',
    props: FooterProps,
    setup(props) {
        const commonExposed = usePrefab(props);
        const theme = useFooterTheme(props);
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
