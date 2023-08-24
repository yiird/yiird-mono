<template>
    <label
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :for="`${id__}-input`"
        :class="[cType__, theme.bemModifiers]"
        @click="false">
        <input
            :id="`${id__}-input`"
            ref="modelValueRef"
            :name="name"
            :class="`${cType__}__input`"
            type="checkbox" />
        <Icon
            v-if="obtainCheckIcon"
            :name="obtainCheckIcon"></Icon>
        <span :class="`${cType__}__text`"></span>
    </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { CheckboxEmits, CheckboxExpose, CheckboxProps, setupCheckbox } from './logic';
/**
 * Checkbox使用
 * @name Checkbox
 */
export default defineComponent({
    name: 'Checkbox',
    components: { Icon },
    props: CheckboxProps,
    expose: CheckboxExpose,
    emits: CheckboxEmits,
    setup(props, ctx) {
        return setupCheckbox(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
