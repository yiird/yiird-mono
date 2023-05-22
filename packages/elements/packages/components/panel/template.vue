<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <div
            class="panel__container"
            ref="container">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PanelProps, panelExpose, setupPanel } from './logic';
/**
 * Panel使用
 * @name Panel
 */
export default defineComponent({
    name: 'Panel',
    props: PanelProps,
    expose: panelExpose,
    setup(props) {
        return setupPanel(props);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
