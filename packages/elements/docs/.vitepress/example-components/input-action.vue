<template>
    <div class="wrap">
        <y-input
            ref="reference"
            :right-action="rightAction"
            @right-action="doRightAction"
            v-model="inputValue"></y-input>

        <y-popover
            :display="isOpen"
            max-width="150px"
            defaultPlacement="bottom-end"
            :reference="reference"
            text="这是个气泡这是个气泡这是个气泡这是个气泡这是个气泡这是个气泡"></y-popover>
    </div>
</template>

<script setup lang="ts">
import { faCaretDown, faCaretRight } from '@fortawesome/pro-light-svg-icons';
import type { InputType } from '@yiird/elements';
import { computed, onMounted, ref } from 'vue';

const reference = ref<InputType>();

const isOpen = ref(false);

const rightAction = computed(() => {
    return {
        icon: isOpen.value ? faCaretDown : faCaretRight
    };
});

const doRightAction = () => {
    isOpen.value = !isOpen.value;
};

onMounted(()=>{
    console.log('reference::',reference.value)
})


const inputValue = ref();
</script>

<style scoped>
.wrap{
    position: relative;
}
.wrap :deep(.input),
.result {
    padding: 10px;
}
</style>
