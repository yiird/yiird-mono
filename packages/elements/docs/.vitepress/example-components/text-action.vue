<template>
    <div class="wrap">
        <y-text
            :right-action="rightAction"
            @right-action="doRightAction"
            v-model="inputValue"></y-text>
    </div>
</template>

<script setup lang="ts">
import { faCaretDown, faCaretRight } from '@fortawesome/pro-light-svg-icons';
import { computed, ref } from 'vue';

const isOpen = ref(false);

const rightAction = computed(() => {
    return {
        icon: isOpen.value ? faCaretDown : faCaretRight
    };
});

const doRightAction = () => {
    isOpen.value = !isOpen.value;
};

const inputValue = ref();
</script>

<style scoped>
.wrap :deep(.text) ,
.result {
    padding: 10px;
}
</style>
