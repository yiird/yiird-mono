import type { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import type Color from 'color';
import type { App, EmitsOptions, Ref, SetupContext, Plugin as _Plugin } from 'vue';
export type TshirtSize = `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;
export type Size = TshirtSize | NumberSize;
export type StateColor = `default` | `primary` | `success` | `warn` | `error`;
export type Placement = 'left' | 'right' | 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export interface UserThemeVars extends Record<string, any> {
    /**
     * 默认组件尺寸
     */
    ye_size?: Size;
    /**
     * 默认图标前缀
     */
    ye_iconPrefix?: IconPrefix;
    /** 字体 */
    ye_fontFamily?: string;
    /** 字体标准大小 `13` `14` `16` */
    ye_fontSize?: number;
    /** 基础行高相对于字体大小的百分比 */
    ye_baseHeightPercentOfFontSize?: number;

    /** 主色 */
    ye_colorPrimary?: 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey' | 'gray';
    /** 辅助色-成功 */
    ye_colorSuccess?: 'lime' | 'green';
    /** 辅助色-失败 */
    ye_colorError?: 'red' | 'volcano';
    /** 辅助色-警告 */
    ye_colorWarn?: 'orange' | 'gold';
}

export type BoxShadowLevel = 'high' | 'middle' | 'low';
export type BoxShadowDirection = 'up' | 'down' | 'left' | 'right';

export interface ThemeConfig extends Record<string, any> {
    ye_size: Size;
    ye_iconPrefix: IconPrefix;
    ye_isDark: boolean;
    /** 字体 */
    ye_fontFamily: string;

    ye_fontSize: number;
    ye_fontSizeStr: string;
    ye_baseHeightPercentOfFontSize: number;

    ye_fontWeightLight: number;
    ye_fontWeightRegular: number;
    ye_fontWeightBold: number;

    /** 主色 */
    ye_colorPrimary: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-成功 */
    ye_colorSuccess: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-失败 */
    ye_colorError: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-警告 */
    ye_colorWarn: string[] & {
        primary?: string | undefined;
    };
    /** 辅助色-中性色 */
    ye_colorGray: string[] & {
        primary?: string | undefined;
    };
    /** 标题字体大小 */
    ye_titleTextSize: number;
    ye_titleTextSizeStr: string;
    /** 主要字体大小 */
    ye_primaryTextSize: number;
    ye_primaryTextSizeStr: string;
    /** 次要字体大小 */
    ye_secondaryTextSize: number;
    ye_secondaryTextSizeStr: string;
    //颜色
    ye_colorHover: Color;
    ye_colorActive: Color;
    ye_colorFocus: Color;
    ye_colorBg: Color;
    ye_colorDivider: Color;
    ye_colorBorder: Color;
    ye_colorDisabled: Color;
    ye_colorSecondaryText: Color;
    ye_colorPrimaryText: Color;
    //行高
    ye_lineHeighTitleText: number;
    ye_lineHeighTitleTextStr: string;
    ye_lineHeighPrimaryText: number;
    ye_lineHeighPrimaryTextStr: string;
    ye_lineHeighSecondaryText: number;
    ye_lineHeighSecondaryTextStr: string;
    ye_radius_max: number;
    ye_radius_regular: number;
    ye_radius_min: number;
    //阴影
    ye_boxshadow: (level: BoxShadowLevel, direction: BoxShadowDirection) => string;
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

export type CommonPrefab = {
    uid__: number;
    id__: string;
    cType__: string;
    ELEMENT_OPTIONS__: ElementOptions;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    isMounted: Ref<boolean>;
    setDisplay: (flag: boolean) => void;
    domRefresh: () => void;
};

export type InternalSetupContext<P, E extends EmitsOptions = {}> = SetupContext<E> & { props: P; prefab: CommonPrefab };

export interface StateColorGroup {
    primary: Color;
    primaryHover: Color;
    secondary: Color;
    halfAlpha: Color;
    text: Color;
}
