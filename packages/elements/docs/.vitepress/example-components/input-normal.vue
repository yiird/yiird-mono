<template>
    <div class="wrap">
        <y-input
            v-model="inputData"
            placeholder="正常状态"></y-input>
        <y-input
            v-model="inputData"
            placeholder="加载状态"
            loading></y-input>
        <y-input
            status="success"
            v-model="inputData"
            placeholder="成功状态"></y-input>
        <y-input
            status="warn"
            v-model="inputData"
            placeholder="警告状态"></y-input>
        <y-input
            status="error"
            v-model="inputData"
            placeholder="失败状态"></y-input>
        <y-input
            status="error"
            v-model="inputData"
            placeholder="禁用状态"
            disabled></y-input>
        <y-input
            v-model="inputData"
            placeholder="只读状态"
            readonly></y-input>
        <y-input
            v-model="inputData"
            placeholder="最大长度"
            :max-length="5"
            show-counter
            ></y-input>
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
.wrap :deep(.input) {
    padding: 10px;
}
</style>
