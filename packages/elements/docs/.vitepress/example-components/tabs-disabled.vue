<template>
    <y-theme>
        <y-tabs
            :gutter="15"
            :disabled-keys="disabledKeys"
            :items="items"></y-tabs>
    </y-theme>
    <br />
    <y-theme>
        <y-tabs
            mode="card"
            :disabled-keys="disabledKeys"
            :items="items"></y-tabs>
    </y-theme>
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
