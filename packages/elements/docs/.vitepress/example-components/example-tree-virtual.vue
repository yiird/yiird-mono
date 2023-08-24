<template>
    <y-space direction="v">
        <y-text code>设置触发虚拟化数量，当前需要渲染数量： <y-text mark>{{shouldRenderCount}}</y-text> </y-text>
        <y-space>
            <y-button
                color="warn"
                @click="changeTirggerCount(500)">
                500(默认)
            </y-button>
            <y-button
                color="success"
                @click="changeTirggerCount(3000)">
                3000
            </y-button>
            <y-button
                color="success"
                @click="changeTirggerCount(50)">
                50
            </y-button>
        </y-space>
    </y-space>

    <y-tree
        @rendered="doOnRendered"
        :trigger-count="tirggerCount"
        :source="data"></y-tree>
</template>

<script setup lang="ts">
import type { TreeEventArgs } from '@yiird/elements';
import { ref } from 'vue';

const response = await fetch('/data/tree.json');
const data = await response.json();

const shouldRenderCount = ref(0);
const tirggerCount = ref();

const changeTirggerCount = (count: number) => {
    tirggerCount.value = count;
};

const doOnRendered = (args:TreeEventArgs) => {
    shouldRenderCount.value = args.shouldRenderCount
};
</script>

<style scoped>
/* .wrap {
    height: 300px;
} */
</style>
