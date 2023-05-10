<template>
    <div :class="{ demo: true, 'demo--transparent': transparent }">
        <div class="demo__display">
            <component
                ref="com"
                :is="name"></component>
        </div>
        <div :class="['demo__code', { 'demo__code--open': handleFlag }]">
            <div v-html="prettierCode"></div>
        </div>
        <div class="demo__handle">
            <span @click="toggleHandle">{{ handleFlag ? '收起代码' : '查看代码' }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, type ComponentPublicInstance } from 'vue';
interface Props {
    //样例
    name: string;
    transparent?: boolean;
}
withDefaults(defineProps<Props>(), {
    transparent: false
});

const prettierCode = ref();
const com = ref();
const handleFlag = ref(false);

const toggleHandle = () => {
    handleFlag.value = !handleFlag.value;
};

watchEffect(() => {
    if (com.value) {
        prettierCode.value = (com.value as ComponentPublicInstance).$options.PRE_BLOCK;
    }
});
</script>

<style lang="scss" scoped>
.demo {
    color: initial;
    .demo__display {
        padding: 10px;
        background-color: #fff;
    }
    &.demo--transparent {
        .demo__display {
            background-image: linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%, #e6e6e6),
                linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%, #e6e6e6);
            background-size: 10px 10px;
            background-position: 0 0, 5px 5px;
        }
    }
    .demo__code {
        display: none;
        &.demo__code--open {
            display: block;
        }
    }
    .demo__handle {
        text-align: center;
        span {
            color: var(--vp-c-brand);
            cursor: pointer;
        }
    }
}
</style>
