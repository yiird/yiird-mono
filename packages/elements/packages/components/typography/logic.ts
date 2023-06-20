import type { ExtractPropTypes, SetupContext } from 'vue';
import { baseExpose, usePrefab } from '../../common/prefab';
import { BaseTextProps, obtainBaseTextTheme, type BaseTextTheme } from '../../common/prefab-typography';
import { sizeToFontSize } from '../../config';
export const TypographyProps = {
    ...BaseTextProps
} as const;
export type TypographyPropsType = Readonly<ExtractPropTypes<typeof TypographyProps>>;

export interface TypographyTheme extends BaseTextTheme {
    fontSize: string;
}

export const TypographyEmits = {};

export const setupTypography = (props: TypographyPropsType, ctx: SetupContext<typeof TypographyEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainBaseTextTheme<typeof TypographyEmits, TypographyTheme>({ props, commonExposed, ...ctx }, (_theme) => {
        const fontSize = sizeToFontSize(_theme, 'md');
        return { ..._theme, fontSize: `${fontSize}px` };
    });
    return {
        ...commonExposed,
        theme
    };
};

export const TypographyExpose = [...baseExpose, ...([] as const)];
export type TypographyExposeType = (typeof TypographyExpose)[number];
