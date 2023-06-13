<template>
    <div>
        <y-list
            size="md"
            :items="items">
            <template #left="slotProps">
                <y-avatar
                    size="lg"
                    shape="square">
                    {{ slotProps.index + 1 }}
                </y-avatar>
            </template>
            <template #right>
                <img
                    :style="{
                        width: '200px',
                        objectFit: 'contain'
                    }"
                    src="https://img2.baidu.com/it/u=355673106,1614830790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
                    alt="" />
            </template>
            <template #operators>
                <y-icon
                    size="lg"
                    :name="faStars"></y-icon>
                <span>12</span>
                &nbsp;&nbsp;
                <y-icon
                    size="lg"
                    :name="faThumbsUp"></y-icon>
                <span>33</span>
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
});

</script>

<style scoped></style>
