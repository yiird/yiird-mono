<template>
    <button
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="buttonRef"
        :class="[cType__, theme.bemModifiers]"
        :disabled="disabled">
        <!-- 默认插槽 -->
        <Icon
            v-if="loading"
            :name="faLoader"
            class="btn__loading"
            animation="spin" />
        <Icon
            v-if="icon && iconPosition === 'left'"
            :name="icon"></Icon>
        <span class="btn__text"><slot></slot></span>

        <Icon
            v-if="icon && iconPosition === 'right'"
            :name="icon"></Icon>

        <Popover
            v-if="obtainHasPopover"
            :allow-placement="['bottom']"
            :offset="10"
            :reference="buttonRef"
            default-placement="bottom"
            shadow-direction="down"
            mode="empty">
            <template #default="slotProps">
                <slot
                    :is-open="slotProps.isOpen"
                    name="drop"></slot>
            </template>
        </Popover>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { Popover } from '../popover';
import { BtnProps, setupBtn } from './logic';
/**
 * Button使用
 * @name Btn
 */
export default defineComponent({
    name: 'Btn',
    components: { Icon, Popover },
    props: BtnProps,
    setup(props, ctx) {
        return setupBtn(props, ctx);
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
