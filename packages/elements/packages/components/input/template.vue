<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div :class="`${cType__}__content`">
            <div
                v-if="obtainPrefixies"
                :class="`${cType__}__prefix`">
                <component :is="obtainPrefixies"></component>
            </div>
            <div :class="`${cType__}__input`">
                <input
                    :id="`input-${id__}`"
                    v-model="value"
                    :disabled="disabled"
                    :maxlength="maxLength"
                    :class="`${cType__}__input-el`"
                    :readonly="readonly"
                    :type="type_"
                    :placeholder="placeholder"
                    autocomplete="off"
                    @input="doEvent_($event)"
                    @change="doEvent_($event)"
                    @blur="doEvent_($event)"
                    @focus="doEvent_($event)"
                    @mouseout="doEvent_($event)"
                    @mouseover="doEvent_($event)" />
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
                        v-if="obtainTextCounter"
                        :class="`${cType__}__counter`">
                        {{ obtainTextCounter }}
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
$colorText: v-bind('themex.color_text');
$colorBorder: v-bind('theme.colors.border');
$colorPlaceholder: v-bind('theme.colors.placeholder');
$colorShadow: v-bind('theme.colors.shadow');
$colorDisabled: v-bind('theme.ye_colorDisabled');
$colorFocus: v-bind('theme.colors.primary');

$height: v-bind('theme.size.height');
$lineHeight: v-bind('theme.size.lineHeight');
$borderWidth: v-bind('themex.size_border_width');
$fontSize: v-bind('theme.size.fontSize');
$gap: v-bind('theme.size.gap');
@import './style.scss';
</style>
