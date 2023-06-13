import Color from 'color';
import { computed, getCurrentInstance, onMounted, ref, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { toStyleValue } from '../../common/dom-utils';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize, sizeToHeight } from '../../config';
import type { InternalSetupContext, Size, ThemeConfig } from '../../types/global';
import type { IconNameOrDefinition } from '../icon';
export const AvatarProps = {
    ...BaseProps,
    /**
     * 形状
     */
    shape: {
        type: String as PropType<`circle` | `square`>,
        default: 'circle'
    },
    /**
     * 尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 图标尺寸
     */
    iconSize: {
        type: String as PropType<Size>,
        default: 'md'
    },
    /**
     * 图标
     */
    icon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    /**
     * 资源地址
     */
    src: {
        type: String as PropType<string>
    }
} as const;
export type AvatarPropsType = Readonly<ExtractPropTypes<typeof AvatarProps>>;

export interface AvatarTheme extends ThemeConfig {
    bemModifiers?: string[];
    color: Color;
    size: string;
    fontSize: string;
    radius: string;
}

export const AvatarEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<AvatarPropsType, E>) => {
    const { props, prefab } = ctx;
    const themeConfig = useTheme();

    const isBgLighter = ref(false);

    onMounted(() => {
        const bgColor = getComputedStyle(getCurrentInstance()?.proxy?.$el).backgroundColor;
        isBgLighter.value = new Color(bgColor).lightness() < 90;
    });

    return computed<AvatarTheme>(() => {
        const _themeConfig = themeConfig.value;

        const size = sizeToHeight(_themeConfig, props.size);
        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: AvatarTheme = {
            ..._themeConfig,
            color: !isBgLighter.value ? _themeConfig.ye_colorSecondaryText : _themeConfig.ye_colorSecondaryText.lighten(3),
            size: `${size}px`,
            fontSize: `${fontSize}px`,
            radius: toStyleValue(_themeConfig.ye_radius_regular)
        };

        theme.bemModifiers = [];

        if (props.shape) {
            theme.bemModifiers.push(`${prefab.cType__}--${props.shape}`);
        }

        return theme;
    });
};

export const setupAvatar = (props: AvatarPropsType, ctx: SetupContext<typeof AvatarEmits>) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme<typeof AvatarEmits>({ props, prefab, ...ctx });
    return {
        ...prefab,
        theme
    };
};
export const AvatarExpose = [...baseExpose];
