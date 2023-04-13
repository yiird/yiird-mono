<template>
    <div class="wrap">
        <o-layout>
            <o-header>header</o-header>
            <o-sider-right :width="obtainWidth">right</o-sider-right>
            <o-sider-left>left</o-sider-left>
            <o-main>main</o-main>
            <o-footer>footer</o-footer>
        </o-layout>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const widthCount = ref(50);
        const obtainWidth = computed(() => {
            return widthCount.value + 'px';
        });

        const timer = setInterval(() => {
            widthCount.value += 10;
            if (widthCount.value > 300) {
                clearInterval(timer);
            }
        }, 2000);
        return {
            obtainWidth
        };
    }
});
</script>

<style lang="scss" scoped>
.wrap {
    height: 350px;
}

.o-layout {
    color: white;
    text-align: center;
    line-height: 5rem;
}

.o-header,
.o-footer {
    background-color: #42b884;
}

.o-sider-right,
.o-sider-left {
    background-color: #a5d6a7;
}

.o-main {
    background-color: #009688;
}
</style>
