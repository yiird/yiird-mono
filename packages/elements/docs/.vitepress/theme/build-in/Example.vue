<template>
    <ClientOnly>
        <Suspense>
            <ExampleRender
                :name="name"
                :inline="inline"
                :width="width">
                <slot></slot>
            </ExampleRender>
        </Suspense>
    </ClientOnly>
</template>
<script lang="ts" setup>
import ExampleRender from './ExampleRender.vue';
interface Props {
    //样例
    name: string;
    width?: string;
    inline?: boolean;
}
const props = defineProps<Props>();
</script>
