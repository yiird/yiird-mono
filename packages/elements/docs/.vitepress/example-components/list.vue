<template>
    <div>
        <y-list
            size="md"
            :gutter="5"
            @item-click="doItemClick"
            :items="items">
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
const items = [
    {
        label: '选项一',
        value: '1'
    },
    {
        label: '选项二',
        value: '2'
    },
    {
        label: '选项三',
        value: '3'
    },
    {
        label: '选项四',
        value: '4'
    }
];

const doItemClick = (arg:any) => {
    console.log(arg);
};
</script>

<style scoped></style>
