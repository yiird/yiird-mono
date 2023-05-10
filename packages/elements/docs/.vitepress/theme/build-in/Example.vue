<template>
    <Suspense>
        <ExampleRender :name="name"></ExampleRender>
    </Suspense>
</template>
<script lang="ts" setup>
import ExampleRender from './ExampleRender.vue';
interface Props {
    //样例
    name: string;
}
const props = defineProps<Props>();
</script>
