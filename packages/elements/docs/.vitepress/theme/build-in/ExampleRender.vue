<template>
    <div class="demo">
        <div class="demo__display">
            <component
                ref="component"
                :is="name"></component>
        </div>
        <div class="demo__code">
            <div v-html="prettierCode"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type ComponentPublicInstance } from 'vue';

const prettierCode = ref();

interface Props {
    //样例
    name: String;
}
const props = defineProps<Props>();
const component = ref(null);

onMounted(() => {
    if (component.value) {
        prettierCode.value = ((component.value as ComponentPublicInstance).$.type as any)['PRE_BLOCK'];
    }
});
</script>

<style lang="scss" scoped>
.demo {
    .demo__display {
    }
    .demo__code {
    }
}
</style>
