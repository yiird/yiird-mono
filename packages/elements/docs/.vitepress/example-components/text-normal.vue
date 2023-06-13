<template>
    <div class="wrap">
        <y-text
            v-model="inputData"
            placeholder="正常状态"></y-text>
        <y-text
            v-model="inputData"
            placeholder="加载状态"
            loading></y-text>
        <y-text
            status="success"
            v-model="inputData"
            placeholder="成功状态"></y-text>
        <y-text
            status="warn"
            v-model="inputData"
            placeholder="警告状态"></y-text>
        <y-text
            status="error"
            v-model="inputData"
            placeholder="失败状态"></y-text>
        <y-text
            status="error"
            v-model="inputData"
            placeholder="禁用状态"
            disabled></y-text>
        <y-text
            v-model="inputData"
            placeholder="只读状态"
            readonly></y-text>
        <y-text
            v-model="inputData"
            placeholder="最大长度"
            :max-length="5"
            show-counter
            ></y-text>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const inputData = ref('');

watch(inputData, (a) => {
    console.log('数据：', a);
});
</script>

<style scoped>
.wrap :deep(.text) {
    padding: 10px;
}
</style>
