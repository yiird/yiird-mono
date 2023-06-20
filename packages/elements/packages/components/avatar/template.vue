<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <Icon
            v-if="icon"
            :size="iconSize"
            :name="icon"></Icon>
        <img
            v-else-if="src"
            :src="src" />
        <span
            v-else
            :class="`${cType__}__slot`">
            <slot></slot>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { AvatarEmits, AvatarExpose, AvatarProps, setupAvatar } from './logic';
/**
 * Avatar使用
 * @name Avatar
 */
export default defineComponent({
    name: 'Avatar',
    components: { Icon },
    props: AvatarProps,
    expose: AvatarExpose,
    emits: AvatarEmits,
    setup(props, ctx) {
        return setupAvatar(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$radius: v-bind('theme.radius');
$fontSize: v-bind('theme.fontSize');
$size: v-bind('theme.size');
$color: v-bind('theme.color');
$bgColor: v-bind('theme.ye_colorGray[4]');

@import './style.scss';
</style>
