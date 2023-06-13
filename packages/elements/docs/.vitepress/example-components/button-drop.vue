<template>
    <div class="wrap">
        <y-btn color="primary">
            下拉按钮
            <template #drop>
                <div class="drop-content">sssss</div>
            </template>
        </y-btn>
    </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.wrap :deep(.btn) {
    margin: 0.5rem;
}
</style>
