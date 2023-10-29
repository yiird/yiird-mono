<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div :class="`${cType__}__content`">
            <div :class="`${cType__}__input`">
                <textarea
                    :id="`input-${id__}`"
                    ref="modelValueRef"
                    :class="`${cType__}__input-el`"
                    :disabled="disabled"
                    :readonly="readonly"
                    :value="modelValue"
                    :placeholder="placeholder"
                    :maxlength="maxLength"
                    autocomplete="off"
                    @input="doInput_($event)"
                    @change="doChange_($event)"
                    @blur="doBlur_($event)"
                    @focus="doFoucs_($event)"></textarea>
            </div>

            <div :class="`${cType__}__suffix`">
                <Space
                    v-if="obtainPrefabAffixies"
                    :style="{
                        margin: '0px 5px'
                    }"
                    cross-axis="center">
                    <Icon
                        v-if="loading"
                        :class="`${cType__}__loading-icon`"
                        :icon="faLoader"
                        :size="size"
                        animation="spin"></Icon>
                    <span
                        v-if="obtainCounter"
                        :class="`${cType__}__counter`">
                        {{ obtainCounter }}
                    </span>
                </Space>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { Space } from '../space';
import { TextareaEmits, TextareaExpose, TextareaProps, setupTextarea } from './logic';
/**
 * Textarea 使用
 * @name Textarea
 */
export default defineComponent({
    name: 'Textarea',
    components: { Icon, Space },
    props: TextareaProps,
    expose: TextareaExpose,
    emits: TextareaEmits,
    setup(props, ctx) {
        return setupTextarea(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$colorText: v-bind('theme.colors.text');
$colorBorder: v-bind('theme.colors.border');
$colorPlaceholder: v-bind('theme.colors.placeholder');
$colorShadow: v-bind('theme.colors.shadow');
$colorDisabled: v-bind('theme.ye_colorDisabled');
$colorFocus: v-bind('theme.colors.primary');

$height: v-bind('theme.size.height');
$lineHeight: v-bind('theme.size.lineHeight');
$borderWidth: v-bind('theme.size.borderWidth');
$fontSize: v-bind('theme.size.fontSize');
@import './style.scss';
</style>
