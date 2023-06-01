<template>
    <y-btn color="primary">下拉按钮
        <template #drop>
            <div class="drop-content">sssss</div>
        </template>
    </y-btn>
</template>

<script lang="ts" setup></script>
<style scoped>
.btn{
    margin: 0.5rem;
}
.drop-content{
}
</style>
