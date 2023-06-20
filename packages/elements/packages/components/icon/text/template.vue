<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]"
        @click="$emit('click')">
        <template v-if="revert">
            <span
                v-if="text"
                :class="`${cType__}__text`">
                {{ text }}
            </span>
            <Icon
                v-if="icon"
                :size="size"
                :name="icon"></Icon>
        </template>
        <template v-else>
            <Icon
                v-if="icon"
                :size="size"
                :name="icon"></Icon>
            <span
                v-if="text"
                :class="`${cType__}__text`">
                {{ text }}
            </span>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../../icon';
import { IconTextEmits, IconTextExpose, IconTextProps, setupIconText } from './logic';
/**
 * IconText使用
 * @name IconText
 */
export default defineComponent({
    name: 'IconText',
    components: { Icon },
    props: IconTextProps,
    expose: IconTextExpose,
    emits: IconTextEmits,
    setup(props, ctx) {
        return setupIconText(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');

@import './style.scss';
</style>
