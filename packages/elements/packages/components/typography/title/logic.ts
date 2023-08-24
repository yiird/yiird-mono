import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { baseExpose, usePrefab } from '../../../common/prefab';
import { BaseTextProps, obtainBaseTextTheme, type BaseTextTheme } from '../../../common/prefab-typography';
import { sizeToFontSize, sizeToTextLineHeight } from '../../../config';
import type { Align, SingleLineEllipsis } from '../../../types/global';
import type { NumberSize } from '../../../types/theme';

export type TitleLevel = 1 | 2 | 3 | 4;

export const TitleProps = {
    ...BaseTextProps,
    level: {
        type: Number as PropType<TitleLevel>,
        default: 1
    },
    align: {
        type: String as PropType<Align>,
        default: 'start'
    },
    /**
     * 文本溢出配置
     */
    ellipsis: {
        type: Object as PropType<SingleLineEllipsis>
    }
} as const;
export type TitlePropsType = Readonly<ExtractPropTypes<typeof TitleProps>>;

export interface TitleTheme extends BaseTextTheme {
    fontSize: string;
    lineHeight: string;
    align: string;
}

export const TitleEmits = {};

export const setupTitle = (props: TitlePropsType, ctx: SetupContext<typeof TitleEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainBaseTextTheme<typeof TitleEmits, TitleTheme>({ props, commonExposed, ...ctx }, (_theme) => {
        let size = _theme.ye_fontSize;
        const nsize = `${5 - props.level}x` as NumberSize;
        if (props.level < 5) {
            size = sizeToFontSize(_theme, nsize);
        }

        return {
            ..._theme,
            fontSize: `${size}px`,
            lineHeight: `${sizeToTextLineHeight(_theme, nsize)}px`,
            align: props.align
        };
    });

    return {
        ...commonExposed,
        theme
    };
};

export const TitleExpose = [...baseExpose, ...([] as const)];
export type TitleExposeType = (typeof TitleExpose)[number];
