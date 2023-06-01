<template>
    <y-theme >
        <y-panel
            title="这是panel标题"
            :height="200"
            :operators="operators"
            :border="true">
            <div v-html="content"></div>
        </y-panel>
    </y-theme>
</template>

<script setup lang="ts">
import { faClose, faRefresh } from '@fortawesome/pro-regular-svg-icons';

const operators = [
    {
        text: '刷新',
        icon: faRefresh,
        action() {
            console.log('刷新');
        }
    },
    {
        text: '关闭',
        icon: faClose,
        action() {}
    },
    {
        text: '按钮',
        action() {}
    }
];

let content = '';
for (let i = 0; i < 50; i++) {
    content += `内容${i}<br>`;
}
</script>

<style scoped></style>
