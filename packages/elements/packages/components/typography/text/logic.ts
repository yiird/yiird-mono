import type { ExtractPropTypes, SetupContext } from 'vue';
import { baseExpose, usePrefab } from '../../../common/prefab';
import { BaseTextProps, obtainBaseTextTheme, useBaseText, type BaseTextTheme } from '../../../common/prefab-typography';
export const TextProps = {
    ...BaseTextProps,
    code: Boolean
} as const;

export type TextPropsType = Readonly<ExtractPropTypes<typeof TextProps>>;

export interface TextTheme extends BaseTextTheme {}

export const TextEmits = {};

export const setupText = (props: TextPropsType, ctx: SetupContext<typeof TextEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainBaseTextTheme<typeof TextEmits, TextTheme>({ props, commonExposed, ...ctx }, (_theme) => {
        if (props.code) {
            _theme.bemModifiers?.push(`${commonExposed.cType__}--code`);
        }
        return _theme;
    });
    const textPrefab = useBaseText<typeof TextEmits>({ props, commonExposed, ...ctx });
    return {
        ...commonExposed,
        ...textPrefab,
        theme
    };
};

export const TextExpose = [...baseExpose, ...([] as const)];
export type TextExposeType = (typeof TextExpose)[number];
