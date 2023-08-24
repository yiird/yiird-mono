<template>
    <y-space direction="v">
        <y-text code>设置可视区域数量</y-text>
        <y-button color="primary" @click="changeScreenSize">可视区域显示数量({{ screenSize }})</y-button>
        <y-text code>设置节点尺寸</y-text>
        <y-space>
            <y-button color="warn" @click="changeNodeSize('1x')">1x(默认)</y-button>
            <y-button color="success" @click="changeNodeSize('2x')">2x</y-button>
            <y-button color="success" @click="changeNodeSize('3x')">3x</y-button>
            <y-button color="success" @click="changeNodeSize('4x')">4x</y-button>
        </y-space>
    </y-space>
   
    <y-tree
        :size="nodeSize"
        :screen-size="screenSize"
        :source="data"></y-tree>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const response = await fetch('/data/tree.json');
const data = await response.json();

const screenSize = ref(15);

const changeScreenSize = () => {
    if (screenSize.value === 15) {
        screenSize.value = 20;
    } else {
        screenSize.value = 15;
    }
};


const nodeSize = ref();

const changeNodeSize = (size:string)=>{
    nodeSize.value = size;
}


</script>

<style scoped>

</style>
