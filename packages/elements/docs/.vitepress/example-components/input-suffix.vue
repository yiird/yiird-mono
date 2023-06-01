<template>
    <y-input
        class="input"
        label="标题">
        <template #suffix>.com</template>
    </y-input>
    <y-input
        class="input"
        label="标题"
        :left-action="leftAction"
        :right-action="rightAction"
        v-model="inputValue"
        v-model:data="fullValue">
        <template #prefix>http://www.</template>
        <template #suffix>.com</template>
    </y-input>
    <div>输入：{{ inputValue }}</div>
    <div>数据：{{ fullValue }}</div>
</template>

<script setup lang="ts">
import { faCaretRight } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const leftAction = ref({
    icon: faCaretRight,
    text: '左侧操作'
});
const rightAction = ref({
    icon: faCaretRight,
    text: '右侧操作'
});

const inputValue = ref();
const fullValue = ref();
</script>

<style scoped>
.input {
    padding: 10px;
}
</style>
