<template>
    <Teleport :to="popperTo">
        <div
            v-if="refresh__"
            :id="id__"
            v-bind="$attrs"
            ref="popper"
            :class="block"
            :style="{ ...theme.vars }"
            @click="onClickPopper">
            <slot></slot>
            <div
                ref="arrow"
                :class="el_arrow"></div>
        </div>
    </Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { usePrefab } from '../../common/prefab';
import { extractDom, PopperBemKeys, PopperPlacement, PopperProps, PopperVariables, usePopper } from './definition';

export default defineComponent({
    name: 'OPopper',
    props: PopperProps,
    emits: ['open', 'close', 'click-popper'],
    setup(props, { emit }) {
        const prefab = usePrefab<PopperVariables, PopperBemKeys>(props);

        const { display__, theme, bem } = prefab;

        const popper = ref<HTMLElement>();

        const obtainPlacement = computed<PopperPlacement>(() => props.placement);

        const obtainArrowPlacement = computed(() => props.arrowPlacement);

        const obtainOffset = computed(() => props.offset);

        const obtainHideOnPopper = computed(() => props.hideOnPopper);
        const obtainHideOnOut = computed(() => props.hideOnOut);

        const obtainShadow = computed(() => (props.shadow ? 'shadow' : ''));

        const arrow = ref<HTMLElement>();

        const { popperTo } = usePopper(extractDom(props.reference), popper, arrow, {
            placement: obtainPlacement,
            offset: obtainOffset,
            mode: props.mode,
            display: display__,
            arrowPlacement: obtainArrowPlacement,
            hideOnPopper: obtainHideOnPopper,
            hideOnOut: obtainHideOnOut,
            updateEveryFrame: props.updateEveryFrame,
            onPopperOpen() {
                emit('open');
            },
            onPopperClose() {
                emit('close');
            }
        });

        watchEffect(() => {
            theme.originVars.bgColor = props.bgColor || '';
        });
        watchEffect(() => {
            theme.originVars.borderColor = props.borderColor || '';
        });

        /**
         * @private
         */
        const onClickPopper = () => {
            emit('click-popper');
        };

        bem.addModifier(obtainShadow);

        const getEl = () => {
            return popper;
        };

        return {
            ...prefab,
            el_arrow: bem.elements.arrow,
            popperTo,
            popper,
            arrow,
            onClickPopper,
            getEl
        };
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
