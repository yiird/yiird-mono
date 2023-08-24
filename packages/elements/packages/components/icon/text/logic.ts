import { computed, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { baseExpose, BaseProps, usePrefab, useTheme } from '../../../common/prefab';
import { sizeToFontSize } from '../../../config';
import type { IconNameOrDefinition } from '../../../types/icon';
import type { InternalSetupContext } from '../../../types/prefab';
import type { Size, ThemeConfig } from '../../../types/theme';
export const IconTextProps = {
    ...BaseProps,
    icon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        required: false,
        default: ''
    },
    revert: {
        type: Boolean
    },
    text: {
        type: String
    },
    size: {
        type: String as PropType<Size>,
        default: 'md'
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
