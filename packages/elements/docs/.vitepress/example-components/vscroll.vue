<template>
    <div class="wrap">
        <y-vscroll :source="data" :rowHeight="30" :preparePageSize="3" :triggerCount="500">
            <template v-slot="{ item }">
                <div class="item">{{ item.name }}:  {{ item.id }}</div>
            </template>
        </y-vscroll>
    </div>
</template>

<script setup lang="ts">

const response = await fetch('/data/tree.json');
const data = await response.json();

</script>

<style lang="scss" scoped>
.wrap {
    height: 300px;
    overflow: hidden;
    .item {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid red;
    }
}
</style>
