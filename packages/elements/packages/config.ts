import { green, orange, presetDarkPalettes, presetPalettes, purple, red } from '@ant-design/colors';
import Color from 'color';
import type { ComponentInternalInstance, InjectionKey, UnwrapNestedRefs } from 'vue';
import type { ElementOptions, FrameworkConfig, NumberSize, StateColorGroup, ThemeConfig, TshirtSize, UserThemeVars } from './types/global';
import type { Scroll } from './types/scroll';

export const DEFAULT_PREFIX = 'y';
export const OPTIONS_KEY = Symbol('options-key') as InjectionKey<UnwrapNestedRefs<ElementOptions>>;
export const FRAMEWORK_CONFIG_KEY = Symbol('framework-key') as InjectionKey<FrameworkConfig>;
export const SCROLL_KEY = Symbol('scroll-key') as InjectionKey<Scroll>;

export const CACHE_INSTANCES = new Map<string, Map<string, ComponentInternalInstance>>();

export const generThemeConfig = (isDark: boolean = false, themeVars: UserThemeVars = {}): ThemeConfig => {
    const palettes = isDark ? presetDarkPalettes : presetPalettes;
    const colorPrimary = themeVars.ye_colorPrimary ? palettes[themeVars.ye_colorPrimary] : purple;
    const colorSuccess = themeVars.ye_colorSuccess ? palettes[themeVars.ye_colorSuccess] : green;
    const colorError = themeVars.ye_colorError ? palettes[themeVars.ye_colorError] : red;
    const colorWarn = themeVars.ye_colorWarn ? palettes[themeVars.ye_colorWarn] : orange;

    let neutral: any = {};

    const originalGray: string[] & {
        primary?: string | undefined;
    } = ['#ffffff', '#fafafa', '#f5f5f5', '#f0f0f0', '#d9d9d9', '#bfbfbf', '#8c8c8c', '#595959', '#434343', '#262626', '#1f1f1f', '#141414', '#000000'];
    originalGray.primary = originalGray[6];

    if (!isDark) {
        neutral = {
            colorBg: new Color(originalGray[1]),
            colorDivider: new Color(originalGray[3]),
            colorBorder: new Color(originalGray[3]),
            colorDisabled: new Color(originalGray[4]),
            colorSecondaryText: new Color(originalGray[6]),
            colorPrimaryText: new Color(originalGray[10])
        };
    } else {
        neutral = {
            colorBg: new Color(originalGray[8]),
            colorDivider: new Color(originalGray[3]),
            colorBorder: new Color(originalGray[3]),
            colorDisabled: new Color(originalGray[4]),
            colorSecondaryText: new Color(originalGray[7]),
            colorPrimaryText: new Color(originalGray[6])
        };
    }

    const ye_baseHeightPercentOfFontSize = 2.5;

    return {
        ye_size: themeVars.ye_size || 'md',
        ye_spaceSize: themeVars.ye_spaceSize || [5, 10, 20],
        ye_iconPrefix: themeVars.ye_iconPrefix || 'fas',
        ye_isDark: isDark,
        ye_fontFamily:
            themeVars.ye_fontFamily ||
            '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji',
        ye_gutter: 5,
        ye_fontSize: themeVars.ye_fontSize || 14,
        ye_baseHeightPercentOfFontSize,
        ye_fontSizeStr: (themeVars.ye_fontSize || 14) + 'px',
        ye_fontWeightLight: themeVars.fontWeightLight || 400,
        ye_fontWeightRegular: themeVars.fontWeightRegular || 500,
        ye_fontWeightBold: themeVars.fontWeightBold || 600,
        ye_colorPrimary: colorPrimary,
        ye_colorSuccess: colorSuccess,
        ye_colorError: colorError,
        ye_colorWarn: colorWarn,
        ye_colorGray: originalGray,
        ye_colorHover: new Color(colorPrimary[1]),
        ye_colorActive: new Color(colorPrimary[4]),
        ye_colorFocus: new Color(colorPrimary[5]),
        ye_colorBg: neutral.colorBg,
        ye_colorDivider: neutral.colorDivider,
        ye_colorBorder: neutral.colorBorder,
        ye_colorDisabled: neutral.colorDisabled,
        ye_colorSecondaryText: neutral.colorSecondaryText,
        ye_colorPrimaryText: neutral.colorPrimaryText,
        ye_radius_max: 10,
        ye_radius_regular: 5,
        ye_radius_min: 3,
        ye_boxshadow: (level, direction) => `var(--ye-boxshadow-${level}-${direction})`
    };
};

export const DEFAULT_ELEMENT_OPTIONS: ElementOptions = {
    prefix: DEFAULT_PREFIX,
    themeConfig: generThemeConfig()
};

const SIZE_MAP = {
    //T-shirt
    '2xs': 0.5,
    xs: 0.6,
    sm: 0.8,
    md: 1,
    lg: 1.4,
    xl: 1.8,
    '2xl': 2.2,
    //数字型
    '1x': 1,
    '2x': 1.5,
    '3x': 2,
    '4x': 2.5,
    '5x': 3,
    '6x': 3.5,
    '7x': 4,
    '8x': 4.5,
    '9x': 5,
    '10x': 5.5
};

export const sizeToHeight = (themeConfig: ThemeConfig, size: TshirtSize | NumberSize, borderWidthSum: number = 2) => {
    const fontSize = sizeToFontSize(themeConfig, size);
    return fontSize * themeConfig.ye_baseHeightPercentOfFontSize - borderWidthSum;
};

export const sizeToFontSize = (themeConfig: ThemeConfig, size: TshirtSize | NumberSize) => {
    return themeConfig.ye_fontSize * SIZE_MAP[size];
};

export const STATE_COLOR_NAMES = ['default', 'primary', 'warn', 'success', 'error'];

export const textStateColor = (themeConfig: ThemeConfig, color: any) => {
    let _color = color;
    if (STATE_COLOR_NAMES.includes(color)) {
        _color = stateColor(themeConfig, color);
    }
    return new Color(_color).saturationl() > 60 ? new Color('#ffffff') : themeConfig.ye_colorPrimaryText;
};

export const stateColor = (themeConfig: ThemeConfig, color: string): StateColorGroup => {
    let _color: StateColorGroup;
    if (STATE_COLOR_NAMES.includes(color)) {
        let colors = themeConfig.ye_colorPrimary;
        switch (color) {
            case 'primary':
                colors = themeConfig.ye_colorPrimary;
                break;
            case 'success':
                colors = themeConfig.ye_colorSuccess;
                break;
            case 'warn':
                colors = themeConfig.ye_colorWarn;
                break;
            case 'error':
                colors = themeConfig.ye_colorError;
                break;
            case 'default':
                colors = themeConfig.ye_colorGray;
                break;
        }
        const primary = new Color(colors[6]);
        _color = {
            primary: primary,
            darker: new Color(colors[9]),
            lighter: new Color(colors[5]),
            translucent: primary.alpha(0.3),
            text: primary.lightness() > 60 ? themeConfig.ye_colorPrimaryText : new Color('#ffffff')
        };
    } else {
        const primary = new Color(color);
        _color = {
            primary: primary,
            darker: primary.darken(10),
            lighter: primary.lightness(85),
            translucent: primary.alpha(0.5),
            text: primary.lightness() > 90 ? themeConfig.ye_colorPrimaryText : new Color('#ffffff')
        };
    }

    return _color;
};
