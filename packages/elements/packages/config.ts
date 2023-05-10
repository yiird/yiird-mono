import { gray, green, orange, presetDarkPalettes, presetPalettes, purple, red } from '@ant-design/colors';
import Color from 'color';
import type { ComponentInternalInstance, InjectionKey } from 'vue';
import type { ElementOptions, FrameworkConfig, NumberSize, ThemeConfig, TshirtSize, UserThemeVars } from './types/global';

export const DEFAULT_PREFIX = 'y';
export const OPTIONS_KEY = Symbol('options-key') as InjectionKey<ElementOptions>;
export const FRAMEWORK_CONFIG_KEY = Symbol('framework-key') as InjectionKey<FrameworkConfig>;

export const CACHE_INSTANCES = new Map<string, Map<string, ComponentInternalInstance>>();

export const generThemeConfig = (isDark: boolean = false, themeVars: UserThemeVars = {}): ThemeConfig => {
    const palettes = isDark ? presetDarkPalettes : presetPalettes;
    const colorPrimary = themeVars.ye_colorPrimary ? palettes[themeVars.ye_colorPrimary] : purple;
    const colorSuccess = themeVars.ye_colorSuccess ? palettes[themeVars.ye_colorSuccess] : green;
    const colorError = themeVars.ye_colorError ? palettes[themeVars.ye_colorError] : red;
    const colorWarn = themeVars.ye_colorWarn ? palettes[themeVars.ye_colorWarn] : orange;

    let neutral: any = {};
    const originalBlack = Color('#000000');
    if (!isDark) {
        neutral = {
            colorBg: originalBlack.alpha(0.02),
            colorDivider: originalBlack.alpha(0.06),
            colorBorder: originalBlack.alpha(0.15),
            colorDisabled: originalBlack.alpha(0.25),
            colorSecondaryText: originalBlack.alpha(0.45),
            colorPrimaryText: originalBlack.alpha(0.85)
        };
    } else {
        neutral = {
            colorBg: originalBlack.alpha(0.04),
            colorDivider: originalBlack.alpha(0.12),
            colorBorder: originalBlack.alpha(0.2),
            colorDisabled: originalBlack.alpha(0.3),
            colorSecondaryText: originalBlack.alpha(0.45),
            colorPrimaryText: originalBlack.alpha(0.85)
        };
    }

    const ye_baseHeightPercentOfFontSize = 2;

    return {
        ye_isDark: isDark,
        ye_fontFamily:
            themeVars.ye_fontFamily ||
            '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji',
        ye_fontSize: themeVars.ye_fontSize || 14,
        ye_baseHeightPercentOfFontSize,
        ye_fontSizeStr: (themeVars.ye_fontSize || 14) + 'px',
        fontWeightLight: themeVars.fontWeightLight || 400,
        fontWeightRegular: themeVars.fontWeightRegular || 500,
        fontWeightBold: themeVars.fontWeightBold || 600,
        ye_colorPrimary: colorPrimary,
        ye_colorSuccess: colorSuccess,
        ye_colorError: colorError,
        ye_colorWarn: colorWarn,
        ye_colorGray: gray,
        ye_titleTextSize: (themeVars.ye_fontSize || 14) + 2,
        ye_titleTextSizeStr: (themeVars.ye_fontSize || 14) + 2 + 'px',
        ye_primaryTextSize: themeVars.ye_fontSize || 14,
        ye_primaryTextSizeStr: (themeVars.ye_fontSize || 14) + 'px',
        ye_secondaryTextSize: (themeVars.ye_fontSize || 14) - 1,
        ye_secondaryTextSizeStr: (themeVars.ye_fontSize || 14) - 1 + 'px',
        ye_colorHover: colorPrimary[3],
        ye_colorActive: colorPrimary[5],
        ye_colorFocus: colorPrimary[4],
        ye_colorBg: neutral.colorBg,
        ye_colorDivider: neutral.colorDivider,
        ye_colorBorder: neutral.colorBorder,
        ye_colorDisabled: neutral.colorDisabled,
        ye_colorSecondaryText: neutral.colorSecondaryText,
        ye_colorPrimaryText: neutral.colorPrimaryText,
        ye_lineHeighTitleText: themeVars.titleTextSize + 8,
        ye_lineHeighTitleTextStr: themeVars.titleTextSize + 8 + 'px',
        ye_lineHeighPrimaryText: themeVars.primaryTextSize + 8,
        ye_lineHeighPrimaryTextStr: themeVars.primaryTextSize + 8 + 'px',
        ye_lineHeighSecondaryText: themeVars.secondaryTextSize + 8,
        ye_lineHeighSecondaryTextStr: themeVars.secondaryTextSize + 8 + 'px',
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
    lg: 1.2,
    xl: 1.4,
    '2xl': 1.8,
    //数字型
    '1x': 1.6,
    '2x': 2,
    '3x': 2.4,
    '4x': 2.8,
    '5x': 3.2,
    '6x': 3.6,
    '7x': 4,
    '8x': 4.4,
    '9x': 4.8,
    '10x': 5
};

export const sizeToHeight = (themeConfig: ThemeConfig, size: TshirtSize | NumberSize, borderWidthSum: number = 0) => {
    const fontSize = sizeToFontSize(themeConfig, size);
    return fontSize * themeConfig.ye_baseHeightPercentOfFontSize - borderWidthSum;
};

export const sizeToFontSize = (themeConfig: ThemeConfig, size: TshirtSize | NumberSize) => {
    return themeConfig.ye_fontSize * SIZE_MAP[size];
};
