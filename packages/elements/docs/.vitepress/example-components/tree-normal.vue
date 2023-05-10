<template>
    <y-tree :items="data"></y-tree>
</template>

<script setup lang="ts">

const response = await fetch('/data/tree.json')
const data = (await response.json()).data

</script>

<style scoped>

</style>