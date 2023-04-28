<template>
    <FontAwesomeIcon
        v-show="display__"
        v-if="refresh__"
        :class="[cType__, obtainFaClasses]"
        :id="id__"
        :icon="obtainIcon"
        :size="obtainSize"
        :fixed-width="obtainFixedWidth"
        :flip="obtainFlip"
        :rotation="obtainRotation"
        :style="{ ...obtainAnimationOptions }"></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { forEach, isObject, kebabCase } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { IconProps } from './logic';

/**
 * Button使用
 */
export default defineComponent({
    name: 'Icon',
    props: IconProps,
    components: {
        FontAwesomeIcon
    },
    setup(props) {
        const obtainIcon = computed(() => {
            if (isObject(props.icon)) {
                return props.icon;
            } else {
                return `fa-${props.prefix} fa-${props.icon}`;
            }
        });

        const obtainSize = computed(() => {
            return props.size;
        });

        const obtainFixedWidth = computed(() => {
            return props.fixedWidth;
        });

        const obtainRotation = computed(() => {
            return props.rotation;
        });

        const obtainFlip = computed(() => {
            return props.flip;
        });

        const obtainFaClasses = computed(() => {
            let animation;
            if (props.animation === 'spin-reverse') {
                animation = ['fa-spin', 'fa-spin-reverse'];
            } else if (props.animation === 'spin-pulse-reverse') {
                animation = ['fa-spin-pulse', 'fa-spin-reverse'];
            } else {
                animation = [`fa-${props.animation}`];
            }
            return animation;
        });

        const obtainAnimationOptions = computed(() => {
            const options: Record<string, string> = {};
            const animation = props.animation;
            if (animation && props.animationOptions) {
                forEach(props.animationOptions, (value, name) => {
                    if (value) {
                        options[`--fa-` + kebabCase(name)] = value;
                    }
                });
            }
            return options;
        });

        const prefab = usePrefab(props);
        return {
            ...prefab,
            obtainIcon,
            obtainSize,
            obtainFixedWidth,
            obtainRotation,
            obtainFlip,
            obtainFaClasses,
            obtainAnimationOptions
        };
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
