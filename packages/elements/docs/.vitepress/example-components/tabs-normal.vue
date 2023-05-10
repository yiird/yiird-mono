<template>
    <y-theme>
        <y-tabs
            :gutter="15"
            :active-key="1"
            :items="items"></y-tabs>
    </y-theme>
</template>
<script lang="ts" setup>
const items = [
    {
        name: 'TAB1',
        page: 'Page1'
    },
    {
        name: 'TAB2',
        page: 'Page2'
    },
    {
        name: 'TAB2',
        page: 'Page2'
    }
];
</script>
