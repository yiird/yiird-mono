<template>
    <y-space>
        <y-space direction="v">
            <y-text italic>列表模式</y-text>
            <y-select
                placeholder="下拉列表"
                v-model="listSelectValue"
                :pop-options="{
                    fixedWidth: true
                }"
                :mapping="{
                    label: '',
                    value: '22'
                }"
                mode="list"
                :source="listSource"
                @focus="doFoucs"
                @change="doChange"></y-select>
        </y-space>

        <y-space direction="v">
            <y-text italic>树结构模式</y-text>
            <y-select
                placeholder="下拉树"
                v-model="treeSelectValue"
                :pop-options="{
                    fixedWidth: true
                }"
                :mapping="{
                    key: 'id',
                    parentKey: 'pid',
                    text: 'name',
                }"
                searchable
                mode="tree"
                size="md"
                :source="treeSource"
                @change="doChange"></y-select>
        </y-space>
    </y-space>
</template>

<script setup lang="ts">
import { faHome } from '@fortawesome/pro-light-svg-icons';
import { ref, watch } from 'vue';

const response = await fetch('/data/tree.json');
const treeSource = await response.json();
const listSource = [
    {
        label: '选项一',
        value: 1,
        options: {
            icon: faHome
        }
    },
    {
        label: '选项二',
        value: 2
    }
];

const listSelectValue = ref();

watch(listSelectValue, (v) => {
    console.log('list-v::', v);
});

const treeSelectValue = ref();

watch(treeSelectValue, (v) => {
    console.log('tree-v::', v);
});

const doChange = (args: any) => {
    console.log('change::', args);
};

const doFoucs = () => {
    console.log('doFoucs::');
};
</script>

<style scoped></style>
