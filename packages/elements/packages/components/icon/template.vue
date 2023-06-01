<template>
    <FontAwesomeIcon
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, obtainFaClasses]"
        :icon="obtainIcon"
        :size="obtainSize"
        :fixed-width="obtainFixedWidth"
        :flip="obtainFlip"
        :rotation="obtainRotation"
        :style="{ ...obtainAnimationOptions }"></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { IconEmits, IconExpose, IconProps, setupIcon } from './logic';
/**
 * Button使用
 */
export default defineComponent({
    name: 'Icon',

    components: {
        FontAwesomeIcon
    },
    props: IconProps,
    expose: IconExpose,
    emits: IconEmits,
    setup(props, ctx) {
        return setupIcon(props, ctx);
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
