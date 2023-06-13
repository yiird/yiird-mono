<template>
    <div class="warp">
        <y-avatar :icon="faUser"></y-avatar>
        <y-avatar size="lg">E</y-avatar>
        <y-avatar size="xl" src="https://pic1.zhimg.com/70/v2-ddcbbe071c2d8a198b1bd3ce117cf7d7_1440w.avis?source=172ae18b&biz_tag=Post"></y-avatar>
    </div>
</template>

<script setup lang="ts">
import { faUser } from '@fortawesome/pro-solid-svg-icons';
</script>

<style scoped>
.warp {
    display: flex;
    gap: 5px;
    align-items: center;
}
</style>
