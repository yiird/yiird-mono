<template>
    <y-theme>
        <y-tabs
            :gutter="15"
            :items="items"></y-tabs>
    </y-theme>
</template>

<script lang="ts" setup>
import { faCamera, faHome } from '@fortawesome/pro-light-svg-icons';

const items = [
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
