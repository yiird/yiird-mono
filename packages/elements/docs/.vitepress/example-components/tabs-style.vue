<template>
    <y-tabs
        mode="card"
        :items="items"></y-tabs>
</template>

<script lang="ts" setup>
import { faCamera, faHome } from '@fortawesome/pro-light-svg-icons';
import type { TabItem } from '@yiird/elements';

const items: Array<TabItem> = [
    {
        name: 'TAB1',
        page: 'Page1',
        icon: faHome
    },
    {
        name: 'TAB2',
        page: 'Page2',
        icon: faCamera
    }
];
</script>
