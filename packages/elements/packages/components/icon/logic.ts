import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/pro-light-svg-icons';
import { forEach, isString, kebabCase } from 'lodash-es';
import type { ExtractPropTypes, PropType } from 'vue';
import { computed, type SetupContext } from 'vue';
import { AffixProps, BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize } from '../../config';
import type { IconAnimation, IconAnimationOptions, IconDefinitionOrPack, IconFlip, IconRotation } from '../../types/components';
import type { ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';

export const addIcons = (...icons: IconDefinitionOrPack[]) => {
    library.add(...icons);
};

export const IconProps = {
    ...BaseProps,
    ...AffixProps,
    /**
     * 修复图标宽度
     */
    fixedWidth: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 旋转
     */
    rotation: {
        type: [String, Number] as PropType<IconRotation>,
        default: null,
        required: false
    },
    /**
     * 翻转
     */
    flip: {
        type: String as PropType<IconFlip>
    },
    /**
     * 动画
     * `beat`: 有节奏的放大缩小。
     * `fade`: 淡入和淡出图标。
     * `beat-fade`: beat与fade合并动画。
     * `bounce`: 上下弹跳。
     * `flip`: 在 3D 空间中旋转图标（打开新窗口）。 默认情况下，翻转将图标围绕 Y 轴旋转 180 度。 翻转有助于转换、处理状态或使用在现实世界中翻转的物理对象。
     * `shake`: 来回摇动。
     * `spin`: 旋转。
     * `spin-pulse`: 八步旋转。
     * `spin-reverse`: 逆时针旋转
     * `spin-pulse-reverse`: 逆时针八步旋转。
     */
    animation: {
        type: String as PropType<IconAnimation>
    },
    /**
     * 动画配置选项
     */
    animationOptions: {
        type: Object as PropType<IconAnimationOptions>
    }
} as const;

export type IconPropsType = Readonly<ExtractPropTypes<typeof IconProps>>;

export interface IconTheme extends ThemeConfig {
    bemModifiers?: string[];
    fontSize: string;
}

export const IconEmits = {} as const;

const obtainTheme = (ctx: InternalSetupContext<IconPropsType, typeof IconEmits>) => {
    const { props } = ctx;

    const themeConfig = useTheme();
    return computed<IconTheme>(() => {
        const _themeConfig = themeConfig.value;

        const fontSize = sizeToFontSize(_themeConfig, props.size);

        const theme: IconTheme = {
            ..._themeConfig,
            fontSize: `${fontSize}px`
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupIcon = (props: IconPropsType, ctx: SetupContext<typeof IconEmits>) => {
    const commonExposed = usePrefab(props);

    const theme = obtainTheme({ props, commonExposed, ...ctx });

    const obtainIcon = computed(() => {
        const { ye_iconPrefix: prefix } = theme.value;
        const { icon } = props;
        if (isString(icon)) {
            return [prefix, icon];
        } else {
            return icon || faQuestion;
        }
    });

    const obtainFixedWidth = computed(() => {
        return props.fixedWidth;
    });

    const obtainRotation = computed(() => {
        return props.rotation;
    });

    const obtainFlip = computed(() => {
        return props.flip;
    });

    const obtainFaClasses = computed(() => {
        let animation;
        if (props.animation === 'spin-reverse') {
            animation = ['fa-spin', 'fa-spin-reverse'];
        } else if (props.animation === 'spin-pulse-reverse') {
            animation = ['fa-spin-pulse', 'fa-spin-reverse'];
        } else {
            animation = [`fa-${props.animation}`];
        }
        return animation;
    });

    const obtainAnimationOptions = computed(() => {
        const options: Record<string, string> = {};
        const animation = props.animation;
        if (animation && props.animationOptions) {
            forEach(props.animationOptions, (value, name) => {
                if (value) {
                    options[`--fa-` + kebabCase(name)] = value;
                }
            });
        }
        return options;
    });

    return {
        ...commonExposed,
        theme,
        obtainIcon,
        obtainFixedWidth,
        obtainRotation,
        obtainFlip,
        obtainFaClasses,
        obtainAnimationOptions
    };
};

export const IconExpose = [...baseExpose, ...([] as const)];
export type IconExposeType = (typeof IconExpose)[number];
