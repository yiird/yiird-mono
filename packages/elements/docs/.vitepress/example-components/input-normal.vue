<template>
    <y-input
        class="input"
        v-model="inputData"
        label="标题"></y-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const inputData = ref('电商时代');

watch(inputData, (a) => {
    console.log('数据：', a);
});
</script>

<style scoped>
.input {
    padding: 10px;
}
</style>
