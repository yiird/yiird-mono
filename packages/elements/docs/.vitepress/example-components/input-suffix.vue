<template>
    <div class="wrap">
        <y-input
            placeholder="使用【slot】设置前后缀"
            v-model="inputValue"
            v-model:data="fullValue1">
            <template #prefix>http://www.</template>
            <template #suffix>.com</template>
        </y-input>
        <y-input
            prefix-text="http://"
            suffix-text=".com"
            placeholder="使用【props】设置前后缀"
            v-model="inputValue"
            v-model:data="fullValue2"></y-input>
        <y-input
            :prefix-icon="faUser"
            :suffix-icon="faHome"
            placeholder="使用【图标】设置前后缀"
            v-model="inputValue"
            v-model:data="fullValue3"></y-input>

        <div class="result">
            <pre>数据1：{{ fullValue1 }}</pre>
            <pre>数据2：{{ fullValue2 }}</pre>
            <pre>数据3：{{ fullValue3 }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { faHome, faUser } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const inputValue = ref();
const fullValue1 = ref();
const fullValue2 = ref();
const fullValue3 = ref();
</script>

<style scoped>
.wrap :deep(.input) {
    padding: 10px;
}
.result {
    padding: 10px;
}
</style>
