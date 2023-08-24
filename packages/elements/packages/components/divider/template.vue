<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div
            v-if="obtainHasTitle"
            :class="`${cType__}__title`">
            <span>
                <slot></slot>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { DividerEmits, DividerExpose, DividerProps, setupDivider } from './logic';
/**
 * Divider使用
 * @name Divider
 */
export default defineComponent({
    name: 'Divider',
    props: DividerProps,
    expose: DividerExpose,
    emits: DividerEmits,
    setup(props, ctx) {
        return setupDivider(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$divider: v-bind('theme.ye_colorDivider');
$margin: v-bind('theme.margin');
$textColor: v-bind('theme.ye_colorSecondaryText');
@import './style.scss';
</style>
