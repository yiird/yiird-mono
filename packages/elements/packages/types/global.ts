import type { App, Plugin as _Plugin } from 'vue';
export type TshirtSize = `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;

export interface UserThemeVars extends Record<string, any> {
    /** 字体 */
    fontFamily?: string;
    /** 字体标准大小 `13` `14` `16` */
    fontSize?: number;

    /** 主色 */
    colorPrimary?: 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey' | 'gray';
    /** 辅助色-成功 */
    colorSuccess?: 'lime' | 'green';
    /** 辅助色-失败 */
    colorError?: 'red' | 'volcano';
    /** 辅助色-警告 */
    colorWarn?: 'orange' | 'gold';
}

export type BoxShadowLevel = 'high' | 'middle' | 'low';
export type BoxShadowDirection = 'up' | 'down' | 'left' | 'right';

export interface ThemeConfig extends Record<string, any> {
    isDark: boolean;
    /** 字体 */
    fontFamily: string;

    fontSize?: number;
    /** 主色 */
    colorPrimary: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-成功 */
    colorSuccess: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-失败 */
    colorError: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-警告 */
    colorWarn: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-中性色 */
    colorGray: string[] & {
        primary?: string | undefined;
    };
    /** 标题字体大小 */
    titleTextSize: number;
    /** 主要字体大小 */
    primaryTextSize: number;
    /** 次要字体大小 */
    secondaryTextSize: number;
    //颜色
    colorHover: string;
    colorActive: string;
    colorFocus: string;
    colorBg: string;
    colorDivider: string;
    colorBorder: string;
    colorDisabled: string;
    colorSecondaryText: string;
    colorPrimaryText: string;
    //行高
    lineHeighTitleText: number;
    lineHeighPrimaryText: number;
    lineHeighSecondaryText: number;
    //阴影
    boxshadow: (level: BoxShadowLevel, direction: BoxShadowDirection) => string;
}

// @yiird/elements 插件配置
export type ElementOptions = {
    prefix: string;
    themeConfig: ThemeConfig;
};

export type Plugin = _Plugin & {
    _register: (app: App, optinos?: ElementOptions) => void;
};

export type FrameworkConfig = {
    header?: number;
    footer?: number;
    left?: number;
    right?: number;
    fixed?: boolean;
};
