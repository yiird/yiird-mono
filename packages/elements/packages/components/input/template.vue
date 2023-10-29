<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]"
        @keydown.tab="doTabKeyDown_">
        <div
            ref="content"
            :class="`${cType__}__content`">
            <div
                v-if="obtainPrefixies"
                :class="`${cType__}__prefix`">
                <component :is="obtainPrefixies"></component>
            </div>
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

            <div :class="`${cType__}__suffix`">
                <Space
                    v-if="obtainPrefabAffixies"
                    cross-axis="center">
                    <Icon
                        v-if="loading"
                        :class="`${cType__}__loading-icon`"
                        :icon="faLoader"
                        :size="size"
                        animation="spin"
                        fixed-width></Icon>
                    <span
                        v-if="obtainCounter"
                        :class="`${cType__}__counter`">
                        {{ obtainCounter }}
                    </span>
                    <Icon
                        v-if="obtainIsPassword"
                        :icon="obtainPasswordIcon"
                        :size="size"
                        fixed-width
                        @click="toggleCheckPassword_"></Icon>
                </Space>
                <component
                    :is="obtainSuffixies"
                    v-if="obtainSuffixies"></component>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from '../button';
import { Group } from '../group';
import { Icon } from '../icon';
import { Space } from '../space';
import { InputEmits, InputExpose, InputProps, setupInput } from './logic';
/**
 * Input使用
 * @name Input
 */
export default defineComponent({
    name: 'Input',
    components: { Button, Icon, Group, Space },
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
$colorPlaceholder: v-bind('theme.colors.placeholder');
$colorShadow: v-bind('theme.colors.shadow');
$colorDisabled: v-bind('theme.ye_colorDisabled');
$colorFocus: v-bind('theme.colors.primary');

$height: v-bind('theme.size.height');
$lineHeight: v-bind('theme.size.lineHeight');
$borderWidth: v-bind('theme.size.borderWidth');
$fontSize: v-bind('theme.size.fontSize');
$gap: v-bind('theme.size.gap');
@import './style.scss';
</style>
