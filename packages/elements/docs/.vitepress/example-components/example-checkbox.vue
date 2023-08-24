<template>
    <form>
        {{ checkboxValue }}
        <y-space direction="v">
            <y-text italic>绑定</y-text>
            <y-checkbox
                name="abc"
                text="复选框1"
                v-model="checkboxValue"
                :source="listSource"></y-checkbox>
        </y-space>
        <input type="submit">
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const listSource = [
    {
        label: '选项一',
        value: 1,
    },
    {
        label: '选项二',
        value: 2
    }
];

const aa = ref<number[]>([]);

aa.value = [1,2];

const checkboxValue = ref(false);
</script>

<style scoped></style>
