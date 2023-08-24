<template>
    <div>
        <y-button
            ref="btn"
            color="primary">
            下拉

            <y-drop
                :reference="btn"
                mode="click"
                @select="doClick"
                :source="source">
                <template #item="{ item }">
                    <span>{{ item.label }}</span>
                </template>
            </y-drop>
        </y-button>
        <y-text
            ref="text"
            color="primary"
            :selectable="false">
            谁是谁
            <y-drop
                :reference="text"
                mode="click"
                @select="doClick"
                :source="source"></y-drop>
        </y-text>
    </div>
    <div></div>
</template>

<script setup lang="ts">
import { faHome } from '@fortawesome/pro-light-svg-icons';
import type { EventArgs, LabelValue } from '@yiird/elements';
import { ref } from 'vue';

const btn = ref();
const text = ref();

const source = ref<LabelValue[]>([
    {
        label: '选项一',
        value: 1,
        options: {
            icon: faHome
        }
    },
    {
        label: '选项二',
        value: 2
    }
]);
const doClick = (arg: EventArgs) => {
    console.log(arg);
};
</script>

<style scoped></style>
