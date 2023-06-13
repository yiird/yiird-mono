<template>
    <y-panel
        id="container"
        width="450px"
        height="400px"
        ref="panel">
        <div class="warp">
            <div
                class="popover-reference"
                ref="reference"></div>

            <y-popover
                max-width="150px"
                :reference="reference"
                text="这是个气泡这是个气泡这是个气泡这是个气泡这是个气泡这是个气泡"
                :boundary="boundary"></y-popover>
        </div>
    </y-panel>
</template>

<script setup lang="ts">
import type { PanelType } from '@yiird/elements';
import { onMounted, ref } from 'vue';

const reference = ref();
const boundary = ref();
const panel = ref<PanelType>();

onMounted(() => {
    panel.value?.intoView(reference.value);
});
</script>

<style lang="scss" scoped>
.warp {
    width: 1000px;
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    .popover-reference {
        width: 100px;
        height: 100px;
        border: 2px dotted gray;
    }
}
</style>
