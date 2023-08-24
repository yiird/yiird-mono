<template>
    <button
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]"
        :disabled="disabled">
        <!-- 默认插槽 -->
        <Icon
            v-if="loading"
            :name="faLoader"
            :class="`${cType__}__loading`"
            animation="spin"
            fixed-width />
        <Icon
            v-if="icon && iconPosition === 'left'"
            :name="icon"></Icon>
        <span :class="`${cType__}__text`"><slot></slot></span>

        <Icon
            v-if="icon && iconPosition === 'right'"
            :name="icon"
            fixed-width></Icon>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { ButtonEmits, ButtonExpose, ButtonProps, setupButton } from './logic';
/**
 * Button使用
 * @name Button
 */
export default defineComponent({
    name: 'Button',
    components: { Icon },
    props: ButtonProps,
    emits: ButtonEmits,
    expose: ButtonExpose,
    setup(props, ctx) {
        return setupButton(props, ctx);
    }
});
</script>

<style lang="scss" scoped>
//字体颜色
$colorText: v-bind('theme.color.text');
$colorPrimary: v-bind('theme.color.primary');
$colorPrimaryHover: v-bind('theme.color.darker');
$colorSecondary: v-bind('theme.color.lighter');
$colorHalfAlpha: v-bind('theme.color.translucent');

$height: v-bind('theme.height');
$lineHeight: v-bind('theme.lineHeight');
$fontSize: v-bind('theme.fontSize');
$shadow: v-bind('theme.shadow');
@import './style.scss';
</style>
