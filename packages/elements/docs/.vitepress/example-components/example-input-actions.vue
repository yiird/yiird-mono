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
import { ref } from 'vue';

const inputValue = ref();
const data = ref();

const prefixes = [
    {
        icon: faEllipsis,
        fn(){
            console.log('ssss')
        }
    },
    {
        icon: faRefresh
    }
];
const suffixes = ref([
    {
        icon: faRefresh
    },
    {
        icon: faRefresh
    }
]);
const suffixes3 = [
    {
        icon: faRefresh
    }
];


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
