<template>
    <y-theme>
        <y-tabs
            :gutter="15"
            :items="items"></y-tabs>
    </y-theme>
    <br />
    <y-theme>
        <y-tabs
            mode="card"
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
        name: 'TAB3',
        page: 'Page3',
        closeable: true
    },
    {
        name: 'TAB4',
        page: 'Page4',
        closeable: true
    }
];
</script>
