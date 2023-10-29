<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el">
        <template
            v-for="(item, index) in obtainSource"
            :key="index">
            <label
                :for="`${id__}-input`"
                :class="[cType__, theme.bemModifiers]"
                @click="false">
                <input
                    :id="`${id__}-input`"
                    ref="modelValueRef"
                    :name="name"
                    :checked="item.checked"
                    :class="`${cType__}__input`"
                    type="checkbox" />
                <Icon
                    v-if="obtainCheckIcon"
                    :icon="obtainCheckIcon"></Icon>
                <span :class="`${cType__}__text`">{{ item.label }}</span>
            </label>
        </template>
    </div>
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
