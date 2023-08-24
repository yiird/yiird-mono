<template>
    <y-space>
        <y-space direction="v">
            <y-text italic>自定义节点图标</y-text>
            <y-tree
                :source="data"
                :icons="{
                    default: faHome
                }"
                hide-select-icon
                hide-switch-icon></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>自定义选框图标</y-text>
            <y-tree
                :source="data"
                multi
                :select-icons="{
                    notChecked: faCircle,
                    checked: faCircleCheck,
                    halfChecked: faCircleO
                }"
                hide-switch-icon
                hide-icon></y-tree>
        </y-space>
        <y-space direction="v">
            <y-text italic>自定义展开控制图标</y-text>
            <y-tree
                :source="data"
                :switch-icons="{
                    open: faCaretDown,
                    close: faCaretRight
                }"
                hide-select-icon
                hide-icon></y-tree>
        </y-space>
    </y-space>
</template>

<script setup lang="ts">
import { faCaretDown, faCaretRight, faHome } from '@fortawesome/pro-duotone-svg-icons';
import { faCircle, faCircleCheck, faCircleO } from '@fortawesome/pro-light-svg-icons';

const response = await fetch('/data/simple-tree.json');
const data = await response.json();
</script>

<style scoped></style>
