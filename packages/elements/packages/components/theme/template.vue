<template>
    <slot></slot>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, watchEffect } from 'vue';
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

        const styleContent = computed(() => {
            const theme = options?.themeConfig;
            return `
html,body{
    font-size: ${theme?.ye_fontSizeStr};
    font-family: ${theme?.ye_fontFamily};
}
:root{
    --ye-font-weight-light: 400;
    --ye-font-weight-regular: 500;
    --ye-font-weight-bold: 600;
    --ye-boxshadow-high-up: 0px -6px 16px -8px rgba(0, 0, 0, 0.08), 0px -9px 28px 0px rgba(0, 0, 0, 0.05), 0px -12px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-down: 0px 6px 16px -8px rgba(0, 0, 0, 0.08), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-left: -6px 0px 16px -8px rgba(0, 0, 0, 0.08), -9px 0px 28px 0px rgba(0, 0, 0, 0.05), -12px 0px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-high-right: 6px 0px 16px -8px rgba(0, 0, 0, 0.08), 9px 0px 28px 0px rgba(0, 0, 0, 0.05), 12px 0px 48px 16px rgba(0, 0, 0, 0.03);
    --ye-boxshadow-middle-up: 0px -3px 6px -4px rgba(0, 0, 0, 0.12), 0px -6px 16px 0px rgba(0, 0, 0, 0.08), 0px -9px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-down: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-left: -3px 0px 6px -4px rgba(0, 0, 0, 0.12), -6px 0px 16px 0px rgba(0, 0, 0, 0.08), -9px 0px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-middle-right: 3px 0px 6px -4px rgba(0, 0, 0, 0.12), 6px 0px 16px 0px rgba(0, 0, 0, 0.08), 9px 0px 28px 8px rgba(0, 0, 0, 0.05);
    --ye-boxshadow-low-up: 0px -1px 2px -2px rgb(0 0 0 / 16%), 0px -3px 6px 0px rgb(0 0 0 / 12%), 0px -5px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-down: 0px 1px 2px -2px rgb(0 0 0 / 16%), 0px 3px 6px 0px rgb(0 0 0 / 12%), 0px 5px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-left: -1px 0px 2px -2px rgb(0 0 0 / 16%), -3px 0px 6px 0px rgb(0 0 0 / 12%), -5px 0px 12px 4px rgb(0 0 0 / 9%);
    --ye-boxshadow-low-right: 1px 0px 2px -2px rgb(0 0 0 / 16%), 3px 0px 6px 0px rgb(0 0 0 / 12%), 5px 0px 12px 4px rgb(0 0 0 / 9%);
}
            `;
        });

        const updateGlobalVars = (content: string) => {
            let style = document.querySelector('[data-ye-styles]');
            if (style) {
                style.textContent = content;
            }
        };

        onMounted(async () => {
            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('data-ye-styles', '');
            document.head.append(style);
            updateGlobalVars(styleContent.value);
        });

        watchEffect(() => {
            updateGlobalVars(styleContent.value);
        });
    }
});
</script>
