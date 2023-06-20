<template>
    <slot></slot>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { usePrefab } from '../../common/prefab';
import { CACHE_INSTANCES, OPTIONS_KEY, generThemeConfig } from '../../config';
import { ThemeProps } from './logic';

/**
 * Theme 用于配置主题
 */
export default defineComponent({
    name: 'Theme',
    props: ThemeProps,
    setup(props) {
        const { cType__ } = usePrefab(props);
        const options = inject(OPTIONS_KEY);
        const INSTANCES = CACHE_INSTANCES.get(cType__);
        if (INSTANCES && INSTANCES?.size > 1) {
            return;
        }
        if (options) {
            const themeConfig = generThemeConfig(props.dark, props.themeVars);
            options.themeConfig = Object.assign(options.themeConfig, themeConfig);
        }

        /* watchEffect(() => {
            const theme = options?.themeConfig;
            if (theme) {
                updateRootStyle('ye-root-variables', rootStyleVariables(theme));
            }
        }); */
    }
});
</script>
