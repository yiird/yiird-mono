import type { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import type Color from 'color';
import type { App, EmitsOptions, Ref, SetupContext, Plugin as _Plugin } from 'vue';
export type TshirtSize = `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;
export type Size = TshirtSize | NumberSize;
export type StateColor = `default` | `primary` | `success` | `warn` | `error`;
export type Placement = 'left' | 'right' | 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export interface UserThemeVars {
    /**
     * 默认组件尺寸
     */
    ye_size?: Size;
    ye_spaceSize?: number[];
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
    /** 字重 */
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightBold?: number;

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

export interface ThemeConfig {
    ye_size: Size;
    ye_spaceSize: number[];
    ye_iconPrefix: IconPrefix;
    ye_isDark: boolean;
    /** 字体 */
    ye_fontFamily: string;

    /** 默认间距 */
    ye_gutter: number;

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
    /**
     * 主色
     */
    primary: Color;
    /**
     * 以主色为基础，深一点
     */
    darker: Color;
    /**
     * 以主色为基础，淡一点
     */
    lighter: Color;
    /**
     * 以主色为基础，半透明
     */
    translucent: Color;
    /**
     * 对应的文本颜色
     */
    text: Color;
}

export type DataStatus = 'default' | 'success' | 'error' | 'warn';

export interface LabelValue {
    label: string;
    value: string;
}

export type Direction = 'h' | 'v';
