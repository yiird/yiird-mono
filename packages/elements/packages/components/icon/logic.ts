import { library } from '@fortawesome/fontawesome-svg-core';
import { forEach, isString, kebabCase } from 'lodash-es';
import { computed, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { sizeToFontSize } from '../../config';
import type { IconAnimation, IconDefinitionOrPack, IconFlip, IconNameOrDefinition, IconRotation } from '../../types/icon';
import type { InternalSetupContext } from '../../types/prefab';
import type { Size, ThemeConfig } from '../../types/theme';

export const addIcons = (...icons: IconDefinitionOrPack[]) => {
    library.add(...icons);
};

/**
 * 动画配置选项
 */
export interface IconAnimationOptions {
    /**
     *
     * 说明：持续时间，以秒(s)计算，animationDuration='1s'
     * 适用动画： `所有`
     */
    animationDuration?: string;
    /**
     *
     * 说明：动画播放方向。`normal` 默认方向，`reverse` 反向播放，`alternate` 循环，`alternate-reverse` 反向循环。	请查看 css [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)
     * 适用动画： `所有`
     */
    animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    /**
     *
     * 说明：设置动画初始化延迟。请查看 css [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)
     * 适用动画：`所有`
     */
    animationDelay?: string;
    /**
     *
     * 说明：设置动画重复次数。请查看 css [`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
     * 适用动画：`所有`
     */
    animationIterationCount?: string;
    /**
     *
     * 说明：设置动画在每个周期的持续时间内如何进行。请查看 css [`animation-timing`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
     * 适用动画：`所有`
     */
    animationTiming?: string;
    /**
     *
     * 说明：图标缩放最大值
     * 适用动画： `beat` `beat-fade`
     */
    beatScale?: string;
    /**
     *
     * 说明：淡入淡出时最低透明度
     * 适用动画： `fade` `beat-fade`
     */
    fadeOpacity?: string;
    /**
     *
     * 说明：设置图标在跳跃后着陆时的反弹量
     * 适用动画： `bounce`
     */
    bounceRebound?: string;
    /**
     *
     * 说明：设置图标在弹跳时跳到的最大高度
     * 适用动画： `bounce`
     */
    bounceHeight?: string;
    /**
     *
     * 说明：设置开始反弹时图标的水平扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceStartScaleX?: string;
    /**
     *
     * 说明：设置开始反弹时图标的垂直扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceStartScaleY?: string;
    /**
     *
     * 说明：设置跳跃到顶部时图标的水平扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceJumpScaleX?: string;
    /**
     *
     * 说明：设置跳跃到顶部时图标的垂直扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceJumpScaleY?: string;
    /**
     *
     * 说明：设置跳跃后着陆时图标的水平扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceLandScaleX?: string;
    /**
     *
     * 说明：设置跳跃后着陆时图标的垂直扭曲（“挤压”）
     * 适用动画： `bounce`
     */
    bounceLandScaleY?: string;
    /**
     *
     * 说明：设置表示旋转轴的向量的 x 坐标（介于 0 和 1 之间
     * 适用动画： `flip`
     */
    flipX?: string;
    /**
     *
     * 说明：设置表示旋转轴的向量的 y 坐标（介于 0 和 1 之间）
     * 适用动画： `flip`
     */
    flipY?: string;
    /**
     *
     * 说明：设置表示旋转轴的向量的 z 坐标（介于 0 和 1 之间）
     * 适用动画： `flip`
     */
    flipZ?: string;
    /**
     *
     * 说明：设置翻转的旋转角度。 正角表示顺时针旋转，负角表示逆时针旋转。
     * 适用动画： `flip`
     */
    flipAngle?: string;
}

export const IconProps = {
    ...BaseProps,
    /**
     * 图标名称
     *
     * 例如：
     * <i class="fa-solid fa-address-book"></i>
     * 描述的是 `fas` 风格的 `address-book`。
     *
     * 组件配置如下：
     * `prefix`="fas"
     * `icon`="address-book"
     * 或
     * 不设置 `prefix`
     * 设置`icon` 为 `IconDefinition`类型
     *
     * `import { faCamera } from '@fortawesome/pro-solid-svg-icons';`
     *
     * [查询图标](https://fontawesome.com/search?m=free)
     */
    name: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        required: true
    },
    /**
     * 图标尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    },
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
        const { name } = props;
        if (isString(name)) {
            return [prefix, name];
        } else {
            return name;
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
