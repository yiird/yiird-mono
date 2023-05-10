<template>
    <y-theme>
        <y-tabs
            ref="tabs"
            :gutter="15"
            :items="items">
            <template v-slot:extra-left>
                <y-btn
                    mode="empty"
                    size="md"
                    @click="go(0)">
                    Go First
                </y-btn>
            </template>
            <template v-slot:extra-right>
                <y-btn
                    mode="empty"
                    size="md"
                    @click="go(9)">
                    Go Last
                </y-btn>
                <y-btn
                    mode="empty"
                    size="md"
                    :icon="faPlus"
                    @click="plus()"></y-btn>
            </template>
        </y-tabs>
    </y-theme>
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

const plus = () => {
    const index = items.value.length + 1;
    items.value.push({
        name: `TAB${index}`,
        page: `Page${index}`,
        closeable: true
    });
};

</script>
