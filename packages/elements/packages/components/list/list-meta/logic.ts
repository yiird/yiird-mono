import { isObject } from 'lodash-es';
import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import { sizeToFontSize } from '../../../config';
import type { InternalSetupContext, MultiLineEllipsis, SingleLineEllipsis, Size, ThemeConfig } from '../../../types/global';
import type { IconNameOrDefinition } from '../../icon';
import type { TitleLevel } from '../../typography/title';

export interface ListTitle {
    text: string;
    level?: TitleLevel;
    ellipsis?: SingleLineEllipsis;
}
export interface ListText {
    text: string;
    indent: number;
    ellipsis?: MultiLineEllipsis;
}

export const ListMetaProps = {
    ...BaseProps,
    title: {
        type: [String, Object] as PropType<string | ListTitle>
    },
    avatarIcon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    avatarSrc: {
        type: String
    },
    summary: {
        type: [String, Object] as PropType<string | ListText>
    },
    description: {
        type: [String, Object] as PropType<string | ListText>
    },
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
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof ListMetaEmits>({ props, commonExposed: prefab, ...ctx });

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

    return {
        ...prefab,
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
export const ListMetaExpose = [...baseExpose];
