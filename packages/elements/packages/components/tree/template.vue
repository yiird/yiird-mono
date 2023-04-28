<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { TreeProps, useTreeTheme } from './logic';
/**
 * Tree使用
 * @name Tree
 */
export default defineComponent({
    name: 'Tree',
    props: TreeProps,
    setup(props) {
        const prefab = usePrefab(props);
        const theme = useTreeTheme(props);
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
