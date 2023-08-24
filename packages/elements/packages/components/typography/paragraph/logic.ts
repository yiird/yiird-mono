import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { baseExpose, usePrefab } from '../../../common/prefab';
import { BaseTextProps, obtainBaseTextTheme, type BaseTextTheme } from '../../../common/prefab-typography';
import { sizeToFontSize, sizeToTextLineHeight } from '../../../config';
import type { MultiLineEllipsis } from '../../../types/global';
import type { Size } from '../../../types/theme';
export const ParagraphProps = {
    ...BaseTextProps,
    indent: {
        type: Number,
        default: 2
    },
    /**
     * 文本溢出配置
     */
    ellipsis: {
        type: Object as PropType<MultiLineEllipsis>
    },
    size: {
        type: String as PropType<Size>,
        default: 'md'
    }
} as const;

export type ParagraphPropsType = Readonly<ExtractPropTypes<typeof ParagraphProps>>;

export interface ParagraphTheme extends BaseTextTheme {
    fontSize: string;
    lineHeight: string;
    indent: number;
}

export const ParagraphEmits = {};

export const setupParagraph = (props: ParagraphPropsType, ctx: SetupContext<typeof ParagraphEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainBaseTextTheme<typeof ParagraphEmits, ParagraphTheme>({ props, commonExposed, ...ctx }, (_theme) => {
        const fontSize = sizeToFontSize(_theme, props.size);
        const lineHeight = sizeToTextLineHeight(_theme, props.size);

        return {
            ..._theme,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            indent: props.indent
        };
    });
    return {
        ...commonExposed,
        theme
    };
};

export const ParagraphExpose = [...baseExpose, ...([] as const)];
export type ParagraphExposeType = (typeof ParagraphExpose)[number];
