<template>
    <y-tabs
        :gutter="15"
        :disabled-keys="disabledKeys"
        :items="items"></y-tabs>
    <br />
    <y-tabs
        mode="card"
        :disabled-keys="disabledKeys"
        :items="items"></y-tabs>
</template>
<script lang="ts" setup>
const items = [
    {
        name: 'TAB1',
        page: 'Page1',
        closeable: true
    },
    {
        name: 'TAB2',
        page: 'Page2',
        closeable: true
    },
    {
        id: 'abc',
        name: 'TAB3',
        page: 'Page3'
    }
];

const disabledKeys = [0, 'abc'];
</script>
