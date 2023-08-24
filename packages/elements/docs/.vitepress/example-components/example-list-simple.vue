<template>
    <y-space main-axis="space-between">
        <y-space direction="v">
            <y-text italic>整体排列方向</y-text>
            <y-space>
                <y-button
                    color="success"
                    @click="setLayout('v')">
                    纵向
                </y-button>
                <y-button
                    color="success"
                    @click="setLayout('v-reverse')">
                    逆纵向
                </y-button>
                <y-button
                    color="warn"
                    @click="setLayout('h')">
                    横向
                </y-button>
                <y-button
                    color="warn"
                    @click="setLayout('h-reverse')">
                    逆横向
                </y-button>
            </y-space>
            <y-text italic>内容排列方向</y-text>
            <y-space>
                <y-button
                    color="success"
                    @click="setContentLayout('v')">
                    纵向
                </y-button>
                <y-button
                    color="success"
                    @click="setContentLayout('v-reverse')">
                    逆纵向
                </y-button>
                <y-button
                    color="warn"
                    @click="setContentLayout('h')">
                    横向
                </y-button>
                <y-button
                    color="warn"
                    @click="setContentLayout('h-reverse')">
                    逆横向
                </y-button>
            </y-space>
            <y-paragraph
                :indent="0"
                italic>
                <y-text code>actions-align</y-text>
                决定actions垂直于整体排列方向上的对齐方式
            </y-paragraph>
            <y-space>
                <y-button
                    color="primary"
                    @click="setActionsAlign('start')">
                    start
                </y-button>
                <y-button
                    color="primary"
                    @click="setActionsAlign('center')">
                    center
                </y-button>
                <y-button
                    color="primary"
                    @click="setActionsAlign('end')">
                    end
                </y-button>
            </y-space>
            <y-paragraph
                :indent="0"
                italic>
                <y-text code>extra-align</y-text>
                决定extra垂直于内容排列方向上的对齐方式
            </y-paragraph>
            <y-space>
                <y-button
                    color="primary"
                    @click="setExtraAlign('start')">
                    start
                </y-button>
                <y-button
                    color="primary"
                    @click="setExtraAlign('center')">
                    center
                </y-button>
                <y-button
                    color="primary"
                    @click="setExtraAlign('end')">
                    end
                </y-button>
            </y-space>
        </y-space>

        <y-space direction="v">
            <y-list
                :layout="layout"
                :content-layout="contentLayout"
                :extra-align="extraAlign"
                :actions="actions"
                :actions-gap="10"
                :actions-align="actionsAlign"
                :source="data">
                <template #content="{ item }">
                    <y-title
                        :level="3"
                        align="center">
                        {{ item.title }}
                    </y-title>
                    <y-paragraph>{{ item.description }}</y-paragraph>
                </template>

                <template #extra="{ item }">
                    <img
                        width="120"
                        :src="item.image" />
                </template>
            </y-list>
        </y-space>
    </y-space>
</template>

<script setup lang="ts">
import { faHeart, faHome } from '@fortawesome/pro-light-svg-icons';
import type { Align, ListLayout } from '@yiird/elements';
import { ref } from 'vue';

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

const layout = ref<ListLayout>('v');
const contentLayout = ref<ListLayout>('v');

const actionsAlign = ref<Align>('center');
const extraAlign = ref<Align>('center');

const setLayout = (l: ListLayout) => {
    layout.value = l;
};

const setContentLayout = (l: ListLayout) => {
    contentLayout.value = l;
};

const setActionsAlign = (align: Align) => {
    actionsAlign.value = align;
};

const setExtraAlign = (align: Align) => {
    extraAlign.value = align;
};
</script>

<style scoped></style>
