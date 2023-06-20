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
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { TextareaEmits, TextareaExpose, TextareaProps, setupTextarea } from './logic';
/**
 * Textarea 使用
 * @name Textarea
 */
export default defineComponent({
    name: 'Textarea',
    components: { Icon },
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
