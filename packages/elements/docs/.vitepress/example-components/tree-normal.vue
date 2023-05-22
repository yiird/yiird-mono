<template>
    <y-panel>
        <y-tree
            v-if="flag"
            :items="data"
            :show-icon="false"
            :expand-keys="expands"
            :always-focus="true"
            @select="onSelect"
            :cascade="true"
            :show-line="false"
            :default-selected-keys="defaultSelectedKeys"></y-tree>
    </y-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const response = await fetch('/data/tree.json');
const data = (await response.json()).data;

const expands = ref<string[]>();

const flag = ref(true);
// 倒数第三个 20171208094050110-065D-11EF7C5FE
// 正数第三个 20171208094103568-8DD1-5A69FB22B

//20171208094007043-8540-AF04BA4EB
//20171208094005663-F2F7-97E465157


//20171208094102583-40D9-55C40EC07
const defaultSelectedKeys = ref<Array<string>>([]);
expands.value = ['20171208094327516-46A7-05B886429','20171208094101635-99F5-D25AA3FB2','20171208093914227-7106-DE254BA5F'];
 defaultSelectedKeys.value = ['20171208094327516-46A7-05B886429'];

const onSelect = (arg: any) => {
    const data = arg.node.data;
    console.log('event', data.name, data.id);
};
</script>

<style scoped></style>
