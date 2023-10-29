<template>
    <y-space
        direction="v"
        cross-axis="space-between">
        <y-space direction="v">
            <y-input
                v-model="inputValue"
                placeholder="定位动作"
                :prefixes="prefixes"></y-input>
            <y-input
                v-model="inputValue"
                loading
                placeholder="清除动作"
                :suffixes="suffixes"></y-input>
        </y-space>
        <pre>数据：{{ data }}</pre>
    </y-space>
</template>

<script setup lang="ts">
import { faEllipsis, faRefresh } from '@fortawesome/pro-light-svg-icons';
import type { Affix } from '@yiird/elements';
import { ref } from 'vue';

const inputValue = ref();
const data = ref();

const prefixes: Affix[] = [
    {
        kind: 'button',
        icon: faEllipsis,
        onClick() {
            console.log('ssss');
        },
        props: {
            color: 'primary'
        }
    },
    {
        kind: 'button',
        icon: faEllipsis,
        style: {
            margin: '0px'
        },
        onClick() {
            console.log('ssss');
        },
        props: {
            color: 'primary'
        }
    },
    {
        kind: 'button',
        icon: faEllipsis,
        onClick() {
            console.log('ssss');
        },
        props: {
            color: 'primary'
        }
    }
];
const suffixes = ref<Affix[]>([
    {
        kind: 'icon',
        icon: faRefresh
    },
    {
        kind: 'icon',
        icon: faRefresh
    }
]);
setTimeout(() => {
    // suffixes2.value[1].text = 'ddd'
}, 2000);
</script>

<style scoped>
.wrap :deep(.input) {
    padding: 10px;
}
.result {
    padding: 10px;
}
</style>
