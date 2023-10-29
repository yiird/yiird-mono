<template>
    <y-space direction="v">
        <y-group divider>
            <y-button
                color="primary"
                @click="changePlacement('top')">
                up
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('top-start')">
                up-start
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('top-end')">
                up-end
            </y-button>
        </y-group>
        <y-group divider>
            <y-button
                color="primary"
                @click="changePlacement('bottom')">
                bottom
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('bottom-start')">
                bottom-start
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('bottom-end')">
                bottom-end
            </y-button>
        </y-group>
        <y-group divider>
            <y-button
                color="primary"
                @click="changePlacement('left')">
                left
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('left-start')">
                left-start
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('left-end')">
                left-end
            </y-button>
        </y-group>
        <y-group divider>
            <y-button
                color="primary"
                @click="changePlacement('right')">
                right
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('right-start')">
                right-start
            </y-button>
            <y-button
                color="primary"
                @click="changePlacement('right-end')">
                right-end
            </y-button>
        </y-group>

        <y-panel
            ref="panel"
            :width="350"
            :height="350">
            <div class="target-wrap">
                <div
                    class="target"
                    ref="target"></div>
            </div>
        </y-panel>
    </y-space>
    <y-popover
        :reference="target"
        :placement="placement"
        :width="{
            max: 100
        }"
        :display="true">
        通过配置
        <y-text code>placement</y-text>
        设置相对参考物的位置
    </y-popover>
</template>

<script setup lang="ts">
import type { PanelType, Placement } from '@yiird/elements';
import { onMounted, ref } from 'vue';

const panel = ref<PanelType>();
const target = ref<HTMLElement>();

const placement = ref<Placement>();

const changePlacement = (p: Placement) => {
    placement.value = p;
};

onMounted(() => {
    if (target.value) {
        panel.value?.scrollIntoView(target.value);
    }
});
</script>

<style lang="scss" scoped>
.target-wrap {
    position: 'relative';
    width: 1500px;
    height: 1500px;
    .target {
        width: 150px;
        height: 150px;
        position: absolute;
        left: calc((1500px - 150px) / 2);
        top: calc((1500px - 150px) / 2);
        background-color: red;
    }
}
</style>
