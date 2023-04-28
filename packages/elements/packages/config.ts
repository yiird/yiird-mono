import { blue, gray, green, orange, presetDarkPalettes, presetPalettes, red } from '@ant-design/colors';
import type { InjectionKey } from 'vue';
import type { ElementOptions, FrameworkConfig, ThemeConfig, UserThemeVars } from './types/global';

export const DEFAULT_PREFIX = 'y';
export const OPTIONS_KEY = Symbol('options-key') as InjectionKey<ElementOptions>;
export const FRAMEWORK_CONFIG_KEY = Symbol('options-key') as InjectionKey<FrameworkConfig>;

export const generThemeConfig = (isDark: boolean = false, themeVars: UserThemeVars = {}): ThemeConfig => {
    const palettes = isDark ? presetDarkPalettes : presetPalettes;
    const colorPrimary = themeVars.colorPrimary ? palettes[themeVars.colorPrimary] : blue;
    const colorSuccess = themeVars.colorSuccess ? palettes[themeVars.colorSuccess] : green;
    const colorError = themeVars.colorError ? palettes[themeVars.colorError] : red;
    const colorWarn = themeVars.colorWarn ? palettes[themeVars.colorWarn] : orange;

    return {
        isDark,
        fontFamily:
            themeVars.fontFamily ||
            '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji',
        fontSize: themeVars.fontSize || 14,
        fontWeightLight: themeVars.fontWeightLight || 400,
        fontWeightRegular: themeVars.fontWeightRegular || 500,
        fontWeightBold: themeVars.fontWeightBold || 600,
        colorPrimary: colorPrimary,
        colorSuccess: colorSuccess,
        colorError: colorError,
        colorWarn: colorWarn,
        colorGray: gray,
        titleTextSize: (themeVars.fontSize || 14) + 2,
        primaryTextSize: themeVars.fontSize || 14,
        secondaryTextSize: (themeVars.fontSize || 14) - 1,
        colorHover: colorPrimary[5],
        colorActive: colorPrimary[9],
        colorFocus: colorPrimary[3],
        colorBg: gray[1],
        colorDivider: gray[2],
        colorBorder: gray[3],
        colorDisabled: gray[5],
        colorSecondaryText: gray[7],
        colorPrimaryText: gray[9],
        lineHeighTitleText: themeVars.titleTextSize + 8,
        lineHeighPrimaryText: themeVars.primaryTextSize + 8,
        lineHeighSecondaryText: themeVars.secondaryTextSize + 8,
        boxshadow: (level, direction) => `var(--ye-boxshadow-${level}-${direction})`
    };
};

export const DEFAULT_ELEMENT_OPTIONS: ElementOptions = {
    prefix: DEFAULT_PREFIX,
    themeConfig: generThemeConfig()
};

/**
 * 尺寸描述与fontSize换算关系
 */
export const SIZE_MAP = {
    //T-shirt
    '2xs': 1.4,
    xs: 1.6,
    sm: 1.8,
    md: 2,
    lg: 2.2,
    xl: 2.5,
    '2xl': 2.8,
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
