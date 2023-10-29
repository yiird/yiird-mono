import type { ExtractPropTypes } from 'vue';
import { computed, type EmitsOptions, type SetupContext } from 'vue';
import { AffixProps, baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import { sizeToFontSize } from '../../../config';
import type { ThemeConfig } from '../../../types/global';
import type { InternalSetupContext } from '../../../types/prefab';

export const IconTextProps = {
    ...BaseProps,
    ...AffixProps,
    revert: {
        type: Boolean
    }
} as const;

export type IconTextPropsType = Readonly<ExtractPropTypes<typeof IconTextProps>>;

export interface IconTextTheme extends ThemeConfig {
    bemModifiers?: string[];
    fontSize: string;
}

export const IconTextEmits = {
    click: null
};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<IconTextPropsType, E>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    return computed<IconTextTheme>(() => {
        const _themeConfig = themeConfig.value;

        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: IconTextTheme = {
            ..._themeConfig,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupIconText = (props: IconTextPropsType, ctx: SetupContext<typeof IconTextEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof IconTextEmits>({ props, commonExposed, ...ctx });

    const { emit } = ctx;

    const doClick = (ev: Event) => {
        emit('click');
    };

    return {
        ...commonExposed,
        theme,
        doClick
    };
};

export const IconTextExpose = [...baseExpose, ...([] as const)];
export type IconTextExposeType = (typeof IconTextExpose)[number];
