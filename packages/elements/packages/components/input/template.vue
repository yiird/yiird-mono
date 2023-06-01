<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <label
            v-if="label"
            :class="`${cType__}__label`"
            :for="`input-${id__}`">
            {{ label }}:&nbsp;&nbsp;
        </label>
        <div :class="`${cType__}__content`">
            <div
                v-if="obtainHasPrefix"
                :class="`${cType__}__prefix`">
                <div
                    ref="prefix"
                    :class="`${cType__}__prefix-slot`">
                    <!-- 前缀 -->
                    <slot name="prefix"></slot>
                </div>
            </div>
            <Btn
                v-if="rightAction"
                :color="theme.actionColor"
                :disabled="disabled"
                :shadow="shadow"
                :size="size"
                :icon="rightAction.icon"
                mode="empty">
                {{ rightAction.text }}
            </Btn>
            <div :class="`${cType__}__input`">
                <input
                    :id="`input-${id__}`"
                    ref="modelValueRef"
                    :class="`${cType__}__input-el`"
                    :disabled="disabled"
                    :readonly="readonly"
                    :value="modelValue"
                    type="text"
                    @blur="doBlur_"
                    @focus="doFoucs_" />
            </div>

            <div :class="`${cType__}__loading`">
                <Icon
                    :name="faLoader"
                    :size="size"
                    animation="spin"></Icon>
            </div>
            <Btn
                v-if="rightAction"
                :color="theme.actionColor"
                :disabled="disabled"
                :shadow="shadow"
                :size="size"
                :icon="rightAction.icon"
                mode="empty">
                {{ rightAction.text }}
            </Btn>

            <div
                v-if="obtainHasSuffix"
                :class="`${cType__}__suffix`">
                <div
                    ref="suffix"
                    :class="`${cType__}__suffix-slot`">
                    <!-- 后缀 -->
                    <slot name="suffix"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Btn } from '../btn';
import { Icon } from '../icon';
import { InputEmits, InputExpose, InputProps, setupInput } from './logic';

/**
 * Input使用
 * @name Input
 */
export default defineComponent({
    name: 'Input',
    components: { Btn, Icon },
    props: InputProps,
    expose: InputExpose,
    emits: InputEmits,
    setup(props, ctx) {
        return setupInput(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$colorTextDefault: v-bind('theme.ye_colorPrimaryText');
$colorText: v-bind('theme.color.text');
$colorPrimary: v-bind('theme.color.primary');
$colorPrimaryHover: v-bind('theme.color.primaryHover');
$colorSecondary: v-bind('theme.color.secondary');
$colorHalfAlpha: v-bind('theme.color.halfAlpha');

$height: v-bind('theme.height');
$lineHeight: v-bind('theme.lineHeight');
$fontSize: v-bind('theme.fontSize');
$shadow: v-bind('theme.shadow');
@import './style.scss';
</style>
