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
import { HeaderProps, type HeaderVariables, MainPositionKey } from './definition';

export default defineComponent({
    name: 'OHeader',
    props: HeaderProps,
    setup(props) {
        const prefab = usePrefab<HeaderVariables>(props);
        const { theme, bem } = prefab;

        const block = bem.block;

        const mainPosition = inject(MainPositionKey);

        const obtainHeight = computed(() => {
            return props.height;
        });

        watchEffect(() => {
            if (mainPosition) {
                mainPosition.top = obtainHeight.value;
            }
            theme.originVars.height = obtainHeight.value;
        });

        onScopeDispose(() => {
            if (mainPosition) {
                mainPosition.top = undefined;
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
