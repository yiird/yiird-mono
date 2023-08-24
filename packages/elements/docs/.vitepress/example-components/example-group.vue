<template>
    <y-space direction="v">
        <y-button
            @click="changeDirection"
            color="warn">
            切换方向
        </y-button>

        <y-text italic>图标组</y-text>
        <y-group :direction="direction">
            <y-icon :name="faLocation"></y-icon>
            <y-icon :name="faLocation"></y-icon>
            <y-icon :name="faLocation"></y-icon>
        </y-group>

        <y-text italic>图标文本组</y-text>
        <y-group :direction="direction">
            <y-icon-text
                :icon="faLocation"
                text="位置"></y-icon-text>
            <y-icon-text
                :icon="faLocation"
                text="位置"></y-icon-text>
            <y-icon-text
                :icon="faLocation"
                text="位置"></y-icon-text>
        </y-group>

        <y-text italic>按钮组</y-text>
        <y-group
            :direction="direction"
            :compact="10">
            <y-button
                color="primary"
                shape="circle"
                :icon="faLocation"></y-button>
            <y-button
                color="primary"
                shape="circle"
                :icon="faLocation"></y-button>
            <y-button
                color="primary"
                shape="circle"
                :icon="faLocation"></y-button>
            <y-button
                color="primary"
                shape="circle"
                :icon="faLocation"></y-button>
        </y-group>

        <y-text italic>头像组</y-text>
        <y-group
            :compact="10"
            :direction="direction">
            <y-avatar :icon="faUser"></y-avatar>
            <y-avatar>E</y-avatar>
            <y-avatar src="https://pic1.zhimg.com/70/v2-ddcbbe071c2d8a198b1bd3ce117cf7d7_1440w.avis?source=172ae18b&biz_tag=Post"></y-avatar>
        </y-group>
    </y-space>
</template>

<script setup lang="ts">
import { faLocation, faUser } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const direction = ref('h');

const changeDirection = () => {
    direction.value = direction.value === 'v' ? 'h' : 'v';
};
</script>

<style scoped></style>
