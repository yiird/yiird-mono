<template>
    <y-button @click="reset">撤销</y-button>
    <y-tree
        ref="tree"
        :screen-size="15"
        :source="data"
        :multi="true"
        :cascade="false"
        draggable></y-tree>
</template>

<script setup lang="ts">
import type { TreeType } from '@yiird/elements';
import { ref } from 'vue';

const response = await fetch('/data/tree.json');
const data = await response.json();

const tree = ref<TreeType>();

const reset = () => {
    tree.value?.revoke();
};
</script>

<style scoped>
.wrap {
    height: 300px;
}
</style>
