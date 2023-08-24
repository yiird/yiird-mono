<template>
    <y-tree
        :screen-size="15"
        :source="data"
        :multi="true"
        :cascade="false"
        @before-render="onBeforeRender"
        @rendered="onRendered"
        @multi-select="onMultiSelect"
        @select="onSelect"></y-tree>
    <y-textarea
        ref="logContainer"
        :row-span="10"
        readonly
        v-model="logs"></y-textarea>
</template>

<script setup lang="ts">
import type { TextareaType, TreeEventArgs } from '@yiird/elements';
import { ref, watch } from 'vue';

const response = await fetch('/data/simple-tree.json');
const data = await response.json();

const logContainer = ref<TextareaType>();
const logs = ref('');

watch(logs, () => {
    logContainer.value?.scrollToBottom()
});

const onSelect = (arg: TreeEventArgs) => {
    logs.value += `event:select => ${arg.checkedKeys}\n`;
};

const onMultiSelect = (arg: TreeEventArgs) => {
    logs.value += `event:multi-select => ${arg.checkedKeys}\n`;
};

const onBeforeRender = () => {
    logs.value += `event:before-render \n`;
};
const onRendered = (arg: TreeEventArgs) => {
    logs.value += `event:rendered \n`;
};
</script>

<style scoped>
.wrap {
    height: 300px;
}
</style>
