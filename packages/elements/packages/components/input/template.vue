<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div :class="`${cType__}__content`">
            <div
                v-if="obtainHasPrefix"
                ref="prefix"
                :class="`${cType__}__prefix`">
                <Icon
                    v-if="prefixIcon"
                    :name="prefixIcon"
                    :size="size"></Icon>
                <span v-else-if="prefixText">{{ prefixText }}</span>
                <div
                    v-else
                    :class="`${cType__}__prefix-slot`">
                    <!-- 前缀 -->
                    <slot name="prefix"></slot>
                </div>
            </div>
            <Btn
                v-if="leftAction"
                :disabled="disabled"
                :shadow="shadow"
                :size="size"
                :icon="leftAction.icon"
                mode="empty"
                @click="doAction_('left')">
                {{ leftAction.text }}
            </Btn>
            <div :class="`${cType__}__input`">
                <input
                    :id="`input-${id__}`"
                    ref="modelValueRef"
                    :disabled="disabled"
                    :maxlength="maxLength"
                    :class="`${cType__}__input-el`"
                    :readonly="readonly"
                    :value="modelValue"
                    :type="type_"
                    :placeholder="placeholder"
                    autocomplete="off"
                    @input="doInput_($event)"
                    @change="doChange_($event)"
                    @blur="doBlur_($event)"
                    @focus="doFoucs_($event)" />
            </div>

            <div
                v-if="loading"
                :class="`${cType__}__loading-icon`">
                <Icon
                    :name="faLoader"
                    :size="size"
                    animation="spin"></Icon>
            </div>
            <div
                v-if="obtainCounter"
                :class="`${cType__}__counter`">
                <span>{{ obtainCounter }}</span>
            </div>
            <div
                v-if="obtainIsPassword"
                :class="`${cType__}__password-icon`">
                <Icon
                    :name="obtainPasswordIcon"
                    :size="size"
                    @click="toggleCheckPassword_"></Icon>
            </div>
            <Btn
                v-if="rightAction"
                :disabled="disabled"
                :size="size"
                :icon="rightAction.icon"
                icon-position="right"
                mode="empty"
                @click="doAction_('right')">
                {{ rightAction.text }}
            </Btn>

            <div
                v-if="obtainHasSuffix"
                ref="suffix"
                :class="`${cType__}__suffix`">
                <Icon
                    v-if="suffixIcon"
                    :name="suffixIcon"
                    :size="size"></Icon>
                <span v-else-if="suffixText">{{ suffixText }}</span>
                <div
                    v-else
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
$colorText: v-bind('theme.colors.text');
$colorBorder: v-bind('theme.colors.border');
$colorBorderLigher: v-bind('theme.colors.borderLigher');
$colorBorderDefault: v-bind('theme.colors.defaultBorder');

$colorPrefixSuffix: v-bind('theme.ye_colorBg');
$colorPlaceholder: v-bind('theme.colors.defaultBorder');
$colorActive: v-bind('theme.colors.active');

$height: v-bind('theme.size.height');
$perHeight: v-bind('theme.size.perHeight');
$lineHeight: v-bind('theme.size.lineHeight');
$fontSize: v-bind('theme.size.fontSize');
$shadow: v-bind('theme.shadow');
@import './style.scss';
</style>
