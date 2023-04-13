<template>
    <div class="scroll-wrap">
        <div class="scroll-content">
            <o-button ref="popperReference1"> 鼠标在气泡上不可以关闭气泡 </o-button>
            <o-popper
                v-if="popperReference1"
                mode="click"
                :reference="popperReference1">
                显示气泡
            </o-popper>
        </div>
        <div class="scroll-content">
            <o-button
                ref="popperReference2"
                color="primary">
                鼠标在气泡上可以关闭气泡
            </o-button>
            <o-popper
                v-if="popperReference2"
                mode="click"
                :reference="popperReference2"
                hide-on-popper>
                显示气泡
            </o-popper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const popperReference1 = ref();
const popperReference2 = ref();
</script>

<style scoped lang="scss">
.scroll-wrap {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
