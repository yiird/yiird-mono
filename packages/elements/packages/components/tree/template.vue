<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <div
            v-for="node in flatStructure"
            :key="node[keyConfig.key]"
            :data-level="node.level"
            :class="node.classes">
            {{ node[keyConfig.tkey] }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { TreeProps, useTree } from './logic';
/**
 * Tree使用
 * @name Tree
 */
export default defineComponent({
    name: 'Tree',
    props: TreeProps,
    setup(props) {
        const logic = useTree(props);
        return {
            ...logic
        };
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind(theme);
@import './style.scss';
</style>
