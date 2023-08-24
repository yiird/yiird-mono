import { isObject } from 'lodash-es';
import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import { sizeToFontSize } from '../../../config';
import type { MultiLineEllipsis, SingleLineEllipsis } from '../../../types/global';
import type { IconNameOrDefinition } from '../../../types/icon';
import type { InternalSetupContext } from '../../../types/prefab';
import type { Size, ThemeConfig } from '../../../types/theme';
import type { TitleLevel } from '../../typography/title';

/**
 * 标题配置
 */
export interface ListTitle {
    /**
     * 文本内容
     */
    text: string;
    /**
     * 级别
     */
    level?: TitleLevel;
    /**
     * 省略配置
     */
    ellipsis?: SingleLineEllipsis;
}

/**
 * 文本内容配置
 */
export interface ListText {
    /**
     * 文本内容
     */
    text: string;
    /**
     * 缩进
     */
    indent: number;
    /**
     * 省略配置
     */
    ellipsis?: MultiLineEllipsis;
}

export const ListMetaProps = {
    ...BaseProps,
    /**
     * 标题
     */
    title: {
        type: [String, Object] as PropType<string | ListTitle>
    },
    /**
     * 图标头像
     */
    avatarIcon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    /**
     * 头像访问链接
     */
    avatarSrc: {
        type: String
    },
    /**
     * 头像尺寸
     */
    avatarSize: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 摘要配置
     */
    summary: {
        type: [String, Object] as PropType<string | ListText>
    },
    /**
     * 描述配置
     */
    description: {
        type: [String, Object] as PropType<string | ListText>
    },
    /**
     * 主要内容文本尺寸（除了标题外其他文本）
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    }
} as const;
export type ListMetaPropsType = Readonly<ExtractPropTypes<typeof ListMetaProps>>;

export interface ListMetaTheme extends ThemeConfig {
    bemModifiers?: string[];
    gap: string;
    fontSize: string;
}

export const ListMetaEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<ListMetaPropsType, E>) => {
    const themeConfig = useTheme();
    const { props } = ctx;

    return computed<ListMetaTheme>(() => {
        const _themeConfig = themeConfig.value;

        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: ListMetaTheme = {
            ..._themeConfig,
            gap: `${fontSize * 0.6}px`,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupListMeta = (props: ListMetaPropsType, ctx: SetupContext<typeof ListMetaEmits>) => {
    const commonExposed = usePrefab(props);
    const theme = obtainTheme<typeof ListMetaEmits>({ props, commonExposed, ...ctx });

    const obtainTitle = computed(() => {
        if (isObject(props.title)) {
            return props.title.text;
        } else {
            return props.title;
        }
    });

    const obtainTitleLevel = computed(() => {
        if (isObject(props.title)) {
            return props.title.level || 4;
        }
        return 4;
    });

    const obtainTitleEllipsis = computed(() => {
        if (isObject(props.title)) {
            return props.title.ellipsis;
        }
        return undefined;
    });

    const obtainSummary = computed(() => {
        if (isObject(props.summary)) {
            return props.summary.text;
        } else {
            return props.summary;
        }
    });

    const obtainSummaryIndent = computed(() => {
        if (isObject(props.summary)) {
            return props.summary.indent || 0;
        } else {
            return 0;
        }
    });

    const obtainSummaryEllipsis = computed(() => {
        if (isObject(props.summary)) {
            return props.summary.ellipsis || { rows: 0 };
        } else {
            return { rows: 0 };
        }
    });

    const obtainDescription = computed(() => {
        if (isObject(props.description)) {
            return props.description.text;
        } else {
            return props.summary;
        }
    });

    const obtainDescriptionIndent = computed(() => {
        if (isObject(props.description)) {
            return props.description.indent || 0;
        } else {
            return 0;
        }
    });

    const obtainDescriptionEllipsis = computed(() => {
        if (isObject(props.description)) {
            return props.description.ellipsis || { rows: 0 };
        } else {
            return { rows: 0 };
        }
    });
    console.log(obtainTitleLevel);
    return {
        ...commonExposed,
        theme,
        obtainTitle,
        obtainTitleEllipsis,
        obtainTitleLevel,
        obtainSummary,
        obtainSummaryIndent,
        obtainSummaryEllipsis,
        obtainDescription,
        obtainDescriptionIndent,
        obtainDescriptionEllipsis
    };
};

export const ListMetaExpose = [...baseExpose, ...([] as const)];
export type ListMetaExposeType = (typeof ListMetaExpose)[number];
