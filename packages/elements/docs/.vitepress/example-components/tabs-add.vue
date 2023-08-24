<template>
    <y-tabs
        ref="tabs"
        :gutter="15"
        :items="items">
        <template v-slot:extra-left>
            <y-button
                mode="empty"
                size="md"
                @click="go(0)">
                Go First
            </y-button>
        </template>
        <template v-slot:extra-right>
            <y-button
                mode="empty"
                size="md"
                @click="goLast()">
                Go Last
            </y-button>
            <y-button
                mode="empty"
                size="md"
                :icon="faPlus"
                @click="plus()"></y-button>
        </template>
    </y-tabs>
</template>
<script lang="ts" setup>
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const tabs = ref();
const items = ref([
    {
        name: 'TAB1',
        page: 'Page1',
        closeable: true
    },
    {
        name: 'TAB2',
        page: 'Page2',
        closeable: true
    }
]);
const go = (index: number) => {
    tabs.value.active(index, true);
};

const goLast = ()=>{
    tabs.value.active(items.value.length - 1, true);
}

const plus = () => {
    const index = items.value.length + 1;
    items.value.push({
        name: `TAB${index}`,
        page: `Page${index}`,
        closeable: true
    });
};
</script>
