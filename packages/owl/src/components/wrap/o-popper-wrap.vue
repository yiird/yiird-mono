<template>
    <Teleport to="body">
        <div
            v-show="display__"
            v-if="refresh__"
            :id="id__"
            :class="block"
            v-bind="$attrs"
            :role="cType__"
            :data-o-key="key"
            :style="{ ...theme.vars }"></div>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { GlobalPopperWrapKey, usePrefab } from '../../common/prefab';
import { PopperWrapProps } from './definition';

export default defineComponent({
    name: 'OPopperWrap',
    props: PopperWrapProps,
    setup(props) {
        const prefab = usePrefab(props);
        const { bem, id__ } = prefab;
        const block = bem.block;
        const instance = getCurrentInstance();
        const key = `popper-wrap-${id__}`;
        instance?.appContext.app.provide(GlobalPopperWrapKey, key);
        return {
            ...prefab,
            block,
            key
        };
    }
});
</script>

<style scoped></style>
