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
import { reactive, watchEffect } from 'vue';

const response = await fetch('/data/simple-tree.json');
const data = await response.json();

class TreeNode {
    private _name: string;
    private _tt: string;

    constructor(name: string) {
        this._name = name;
        this._tt = '00';
    }

    set tt(str: string) {
        this._tt = str;
    }

    get tt() {
        return this._tt;
    }

    set name(str: string) {
        this._name = str;
    }

    get name() {
        return this._name;
    }
}

const node = new TreeNode('abc');
const node2 = new TreeNode('abc');
const rnode = reactive([node, node2]);

setTimeout(() => {
    rnode[0].name = '222';

    rnode[1].tt = '222';
}, 2000);

watchEffect(() => {
    console.log('change');
    console.log(rnode[0].name);
    console.log(rnode[1].tt);
});

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
