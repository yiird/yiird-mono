<template>
    <div>{{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Props } from './logic';

export default defineComponent({
    name: 'Icon',
    props: Props,
    setup(props, ctx) {
        return {};
    }
});
</script>

<style lang="scss" scoped></style>
