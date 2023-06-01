<template>
    <y-tree :items="data"></y-tree>
</template>

<script setup lang="ts">
const data = [
    {
        name: '银行股份有限公司党委',
        id: '1'
    },
    {
        name: '总行机关党委',
        id: '2',
        pid: '1'
    },
    {
        name: '普惠金融部党支部',
        id: '3',
        pid: '2'
    },
    {
        name: '郑州分行党委',
        id: '4',
        pid: '1'
    }
];
</script>

<style scoped></style>
