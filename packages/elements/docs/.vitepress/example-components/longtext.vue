<template>
    <div class="wrap">
        <y-longtext
            v-model="inputData"
            placeholder="正常状态"></y-longtext>
        <y-longtext
            v-model="inputData"
            placeholder="加载状态"
            loading></y-longtext>
        <y-longtext
            status="success"
            v-model="inputData"
            placeholder="成功状态"></y-longtext>
        <y-longtext
            status="warn"
            v-model="inputData"
            placeholder="警告状态"></y-longtext>
        <y-longtext
            status="error"
            v-model="inputData"
            placeholder="失败状态"></y-longtext>
        <y-longtext
            status="error"
            v-model="inputData"
            placeholder="禁用状态"
            disabled></y-longtext>
        <y-longtext
            v-model="inputData"
            placeholder="只读状态"
            readonly></y-longtext>
        <y-longtext
            v-model="inputData"
            placeholder="最大长度"
            :max-length="500"
            show-counter></y-longtext>
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
.wrap :deep(.longtext) {
    padding: 10px;
}
</style>
