<template>
    <o-button
        color="info"
        @click="doclick">
        info
    </o-button>
    <o-button color="primary">primary</o-button>
    <o-button color="success">success</o-button>
    <o-button color="warning">warning</o-button>
    <o-button color="danger">danger</o-button>
</template>

<script setup lang="ts">
const doclick = () => {
    console.log('xxxdoclick');
};
</script>
<style scoped>
.o-button {
    margin: 0.5rem;
}
</style>
