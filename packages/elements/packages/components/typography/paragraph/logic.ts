import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { baseExpose, usePrefab } from '../../../common/prefab';
import { BaseTextProps, obtainBaseTextTheme, type BaseTextTheme } from '../../../common/prefab-typography';
import { fontSizeToTextLineHeight, sizeToFontSize } from '../../../config';
import type { MultiLineEllipsis, Size } from '../../../types/global';
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
    const prefab = usePrefab(props);
    const theme = obtainBaseTextTheme<typeof ParagraphEmits, ParagraphTheme>({ props, commonExposed: prefab, ...ctx }, (_theme) => {
        const fontSize = sizeToFontSize(_theme, props.size);

        return {
            ..._theme,
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSizeToTextLineHeight(_theme, fontSize)}px`,
            indent: props.indent
        };
    });
    return {
        ...prefab,
        theme
    };
};
export const ParagraphExpose = [...baseExpose];
