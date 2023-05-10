<template>
    <component :is="layout"></component>
    <o-popper-wrap></o-popper-wrap>
</template>

<script lang="ts">
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { defineComponent } from 'vue';
import DemoLayout from './DemoLayout.vue';
const { Layout } = DefaultTheme;
export default defineComponent({
    setup() {
        const { frontmatter } = useData();
        return {
            frontmatter,
            layout: frontmatter.value.layout === 'demo' ? DemoLayout : Layout
        };
    }
});
</script>

<style scoped></style>
