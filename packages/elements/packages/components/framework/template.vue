<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive } from 'vue';
import { usePrefab } from '../../common/prefab';
import { checkChidrenTypeIn } from '../../common/vnode-utils';
import { FRAMEWORK_CONFIG_KEY } from '../../config';
import type { FrameworkConfig } from '../../types/global';
import { FrameworkProps, useFrameworkTheme } from './logic';
/**
 * Framework使用
 * @name Framework
 */
export default defineComponent({
    name: 'Framework',
    props: FrameworkProps,
    setup(props) {
        if (!checkChidrenTypeIn('header', 'footer', 'main', 'sider')) {
            throw new Error('Framework的子组件只能是Header,Footer,Main,Sider');
        }
        const framework = reactive<FrameworkConfig>({});
        provide(FRAMEWORK_CONFIG_KEY, framework);
        const prefab = usePrefab(props);
        const theme = useFrameworkTheme(props, framework);
        return {
            ...prefab,
            theme
        };
    }
});
</script>
<style lang="scss" scoped>
$header: v-bind('theme.header');
$footer: v-bind('theme.footer');
$left: v-bind('theme.left');
$right: v-bind('theme.right');
$height: v-bind('theme.height');
@import './style.scss';
</style>
