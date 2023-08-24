import type { App, Plugin as _Plugin } from 'vue';
import type { ThemeConfig } from './theme';

// @yiird/elements 插件配置
export type PlatformOptions = {
    prefix: string;
    /**
     *
     */
    documentReady?: () => void;
    themeConfig: ThemeConfig;
    ssr: boolean;
};

export type Plugin = _Plugin & {
    _register: (app: App, optinos?: PlatformOptions) => void;
};
