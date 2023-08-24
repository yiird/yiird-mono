<template>
    <y-space main-axis="space-between">
        <y-space direction="v">
            <y-text italic>默认选中</y-text>

            <y-tree
                :source="data"
                :default-selected-keys="['1-1-1']"
                show-select-icon
                show-icon></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>默认展开: <y-text code>1-2</y-text></y-text>
        
            <y-tree
                :source="data"
                :default-expand-keys="['1-2']"
                show-select-icon
                show-icon></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>默认展开<y-text code>2</y-text>及以上级别，(级别从0开始)</y-text>

            <y-tree
                :source="data"
                :default-expand-level="2"
                show-select-icon
                show-icon></y-tree>
        </y-space>
    </y-space>
</template>

<script setup lang="ts">
const response = await fetch('/data/simple-tree.json');
const data = await response.json();

</script>
<style scoped>
.wrap {
    height: 300px;
}
</style>
