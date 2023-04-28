<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <div class="tabs__bar-wrap"></div>
        <div class="tabs__panel-wrap"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { TabsProps, useTabsTheme } from './logic';
/**
 * Tabs使用
 * @name Tabs
 */
export default defineComponent({
    name: 'Tab',
    props: TabsProps,
    setup(props) {
        const prefab = usePrefab(props);
        const theme = useTabsTheme(props);
        return {
            ...prefab,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
