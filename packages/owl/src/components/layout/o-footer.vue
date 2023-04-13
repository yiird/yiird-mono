<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="block"
        :style="{ ...theme.vars }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onScopeDispose, watchEffect } from 'vue';
import { usePrefab } from '../../common/prefab';
import { type FooterVariables, HeaderProps, MainPositionKey } from './definition';

export default defineComponent({
    name: 'OFooter',
    props: HeaderProps,
    setup(props) {
        const prefab = usePrefab<FooterVariables>(props);
        const { theme, bem } = prefab;

        const block = bem.block;

        const obtainHeight = computed(() => {
            return props.height;
        });

        const mainPosition = inject(MainPositionKey);

        watchEffect(() => {
            if (mainPosition) {
                mainPosition.bottom = obtainHeight.value;
            }
            theme.originVars.height = obtainHeight.value;
        });

        onScopeDispose(() => {
            if (mainPosition) {
                mainPosition.bottom = undefined;
            }
        });

        return {
            ...prefab,
            theme,
            block
        };
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
