<template>
    <y-row :gutter="0">
        <y-col
            offset="4"
            span="8">
            span-8/offset-4
        </y-col>
        <y-col
            offset="1"
            span="6">
            span-6/offset-1
        </y-col>
    </y-row>
</template>

<script setup lang="ts"></script>

<style scoped>
.col {
    background-color: #1677ff;
    color: white;
    text-align: center;
    padding: 10px 0;
}
</style>
