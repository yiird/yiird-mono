<template>
    <div>{{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Props } from './logic';

export default defineComponent({
    props: Props,
    setup(props, ctx) {}
});
</script>

<style lang="scss" scoped></style>
