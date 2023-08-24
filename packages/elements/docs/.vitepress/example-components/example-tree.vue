<template>
    <y-space>
        <y-space direction="v">
            <y-text italic>简单树</y-text>

            <y-tree :source="data"></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>隐藏复选框</y-text>
            <y-tree
                :source="data"
                hide-select-icon></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>隐藏展开状态图标</y-text>
            <y-tree
                :source="data"
                hide-switch-icon></y-tree>
        </y-space>
    </y-space>
</template>

<script setup lang="ts">
const response = await fetch('/data/simple-tree.json');
const data = await response.json();

// 数据结构
// 1、扁平结构
/* [
    {
        "name": "1",
        "id": "1"
    },
    {
        "name": "1-1",
        "id": "1-1",
        "pid": "1"
    },
    {
        "name": "1-1-1",
        "id": "1-1-1",
        "pid": "1-1"
    }
] */

// 2、嵌套结构
/* [
    {
        "name": "1",
        "id": "1",
        "children":[{
            "pid":"1",
            "id":"1-1",
            "name":"1-1"
        },{
            "pid":"1",
            "id":"1-2",
            "name":"1-2"
        }]
    }
] */
</script>

<style scoped></style>
