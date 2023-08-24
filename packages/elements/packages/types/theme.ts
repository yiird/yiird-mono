import type { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import type Color from 'color';

export type TshirtSize = `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;
export type Size = TshirtSize | NumberSize | number | (string & { fromT?: any });

export interface UserThemeVars {
    /**
     * 默认组件尺寸
     */
    size?: Size;
    /**
     * 默认图标前缀
     */
    iconPrefix?: IconPrefix;
    /** 字体 */
    fontFamily?: string;
    /** 字体标准大小 `13` `14` `16` */
    fontSize?: number;
    /** 组件高度与字体的比值 */
    componentHeightMultiplesOfFontSize?: number;
    /** 文本行高与字体的比值 */
    textLineHeightMultiplesOfFontSize?: number;
    /** 间距与字体的比值 */
    gapMultiplesOfFontSize?: number;
    /** 字重 */
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightBold?: number;

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

export interface ThemeConfig {
    ye_size: Size;
    ye_iconPrefix: IconPrefix;
    ye_isDark: boolean;
    /** 字体 */
    ye_fontFamily: string;

    ye_fontSize: number;
    /** 组件高度与字体的比值 */
    ye_componentHeightMultiplesOfFontSize: number;
    /** 文本行高与字体的比值 */
    ye_textLineHeightMultiplesOfFontSize: number;
    /** 间距与字体的比值 */
    ye_gapMultiplesOfFontSize: number;

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
    ye_colorPrimaryText: Color;
    ye_colorSecondaryText: Color;
    ye_radius_max: number;
    ye_radius_regular: number;
    ye_radius_min: number;
    //阴影
    ye_boxshadow: (level: BoxShadowLevel, direction: BoxShadowDirection) => string;
}

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
