import type { App, Plugin as _Plugin } from 'vue';

import type { IconPrefix } from '@fortawesome/fontawesome-svg-core';
import type Color from 'color';

export type TshirtSize = `2xs` | `xs` | `sm` | `md` | `lg` | `xl` | `2xl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;
export type Size = TshirtSize | NumberSize | number | (string & { fromT?: any });

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

export type StringOther = string & { fromT?: any };

export type StateColor = `default` | `primary` | `success` | `warn` | `error`;

export type Offset = { main?: number; cross?: number } | number;

export type Placement =
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
    | StringOther;

export type FrameworkConfig = {
    header?: number;
    footer?: number;
    left?: number;
    right?: number;
    fixed?: boolean;
};

export type DataStatus = 'default' | 'success' | 'error' | 'warn';

export type NoramlDimensions = StringOther | number;

export type LimitDimensions = { max?: Dimensions; min?: Dimensions };
export type Dimensions = NoramlDimensions | LimitDimensions;

/**
 * 方向
 * `v` : 垂直方向
 * `h` : 水平方向
 */
export type Direction = 'h' | 'v' | StringOther;

/**
 * 方向+逆反方向
 * `v` : 垂直方向
 * `h` : 水平方向
 * `v-reverse` : 垂直逆反方向
 * `h-reverse` : 水平逆反方向
 */
export type DirectionReverse = Direction | 'h-reverse' | 'v-reverse';

/**
 * 相对于参考元素的位置
 */
export type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * 对齐方式
 * `start` : 开始位置
 * `center` : 中间位置
 * `end` : 结束位置
 */
export type Align = 'start' | 'center' | 'end';

/**
 * flex对齐方式
 */
export type FlexAlgin = Align | 'space-between' | 'space-around';

/**
 * 排序方式
 */
export type SortType = 'asc' | 'desc';

/**
 * 单行文本溢出配置
 */
export interface SingleLineEllipsis {
    length?: number;
    suffix?: string;
}

export const isSingleLineEllipsis = (object: any): object is SingleLineEllipsis => {
    return !('rows' in object);
};

/**
 * 多行文本溢出配置
 */
export interface MultiLineEllipsis {
    rows: number;
    suffix?: string;
    expandText?: string;
    collapseText?: string;
}

export const isMultiLineEllipsis = (object: any): object is MultiLineEllipsis => {
    return 'rows' in object;
};

export type Writeable<T> = {
    -readonly [K in keyof T]: T[K];
};

export type ActionCallback = (args: any) => void;

export type RenderedReturn = {
    el: Element;
};

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
