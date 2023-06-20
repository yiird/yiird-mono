<template>
    <div>
        <y-list
            :gap="0"
            :actions="actions"
            actions-position="right"
            hover-color="red"
            :item-style="{ padding: '5px' }"
            :source="data">
            <template #item="{ item }">
                <span>{{ item.title }}</span>
            </template>
        </y-list>
    </div>
</template>

<script setup lang="ts">
import { faHeart, faHome } from '@fortawesome/pro-light-svg-icons';
const response = await fetch('/data/list.json');
const data = await response.json();

const actions = [
    {
        icon: faHome,
        text: '点赞',
        opperator() {
            console.log('aaaa');
        }
    },
    {
        icon: faHeart,
        text: '收藏'
    }
];

const doItemClick = (arg: any) => {
    console.log(arg);
};
</script>

<style scoped></style>
