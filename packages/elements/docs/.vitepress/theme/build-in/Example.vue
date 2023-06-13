<template>
    <ClientOnly>
        <Suspense>
            <ExampleRender :name="name"></ExampleRender>
        </Suspense>
    </ClientOnly>
</template>
<script lang="ts" setup>
import ExampleRender from './ExampleRender.vue';
interface Props {
    //样例
    name: string;
}
const props = defineProps<Props>();
</script>
