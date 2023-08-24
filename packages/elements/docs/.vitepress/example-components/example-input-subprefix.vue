<template>
    <div class="wrap">
        <y-space
            direction="v"
            cross-axis="space-between">
            <y-space direction="v">
                <y-input
                    v-model="inputValue"
                    placeholder="定位动作"
                    :prefixes="prefixes"
                    :suffixes="suffixes"></y-input>
            </y-space>
        </y-space>
    </div>
</template>

<script setup lang="ts">
import { faLocation, faRefresh } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const inputValue = ref();

const prefixes = [
    {
        text: '中华人民共和国'
    },
    {
        icon: faLocation,
        fn() {
            console.log('sss')
            inputValue.value = '山东省烟台市'
        }
    }
];
const suffixes = ref([
    {
        icon: faRefresh,
        fn() {
            inputValue.value = ''
        }
    }, {
        icon: faRefresh,
        fn() {
            inputValue.value = ''
        }
    }
]);
</script>

<style scoped>
.wrap :deep(.input) {
    padding: 10px;
}
.result {
    padding: 10px;
}
</style>
