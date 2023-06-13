<template>
    <div>
        <y-list
            size="md"
            :operators="operators"
            :items="items">
            <template #left="slotProps">
                <y-avatar
                    size="lg"
                    shape="square">
                    {{ slotProps.index + 1 }}
                </y-avatar>
            </template>
        </y-list>
    </div>
</template>

<script setup lang="ts">
import { faStars, faThumbsUp } from '@fortawesome/pro-light-svg-icons';
const response = await fetch('/data/list.json');
const items = await response.json();

items.forEach((item: any) => {
    item.head = 'https://pic1.zhimg.com/70/v2-ddcbbe071c2d8a198b1bd3ce117cf7d7_1440w.avis?source=172ae18b&biz_tag=Post';
    item.title = '';
    item.summary = '';
});

const operators = [
    {
        icon: faStars,
        text: '12'
    },
    {
        icon: faThumbsUp,
        text: 'aaa'
    }
];
</script>

<style scoped></style>
