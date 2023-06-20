<template>
    <div>
        <y-list
            :item-style="{ padding: '25px 0px' }"
            :actions="actions"
            actions-position="bottom"
            actions-align="start"
            :source="data">
            <template #item="{ item }">
                <y-list-meta
                    :avatarSrc="item.avatar"
                    :title="{ text: item.title, level: 4 }"
                    :summary="item.summary"
                    :description="item.description"></y-list-meta>
            </template>
            <template #extra="{ item }">
                <img
                    width="120"
                    :src="item.image" />
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
