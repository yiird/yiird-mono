import type { EventArgs } from './event';
import type { ActionCallback, NumberSize, StringOther } from './global';
import type { CommonExposed } from './prefab';

import type { IconDefinition, IconName, IconPack } from '@fortawesome/fontawesome-svg-core';
import type { Data2d, ScrollbarOptions } from 'smooth-scrollbar/interfaces';
import type { OverscrollOptions } from 'smooth-scrollbar/plugins/overscroll';
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';
import type { CSSProperties, Ref, UnwrapNestedRefs } from 'vue';
import type { TreeNode } from '../common/common-source';
import type { ButtonPropsType } from '../components/button';
import type { IconPropsType } from '../components/icon';
import type { IconTextPropsType } from '../components/icon/text';

/**
 *  Icon
 */

export type IconRotation = 90 | 180 | 270 | '90' | '180' | '270';
export type IconFlip = 'horizontal' | 'vertical' | 'both';
export type IconDefinitionOrPack = IconDefinition | IconPack;
export type IconNameOrDefinition = IconDefinition | IconPack | IconName | StringOther;
export type IconSize = `2xs` | `xs` | `sm` | `lg` | `xl` | `2xl` | NumberSize;
export type IconAnimation = 'beat' | 'fade' | 'beat-fade' | 'bounce' | 'flip' | 'shake' | 'spin' | 'spin-pulse' | 'spin-reverse' | 'spin-pulse-reverse';

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

export interface SelectIcons {
    /**
     * 选中状态图标
     */
    checked?: IconNameOrDefinition;
    /**
     * 为选中状态图标
     */
    notChecked?: IconNameOrDefinition;
}

/**
 * Popover
 */
export type PopoverReference = Element | CommonExposed;

export type PoppoverMode = 'manual' | 'click' | 'hover' | 'click-out' | 'click-leave' | StringOther;

export interface PopoverEventArgs extends EventArgs {
    flag: boolean;
}

/**
 * Scroll
 */
export interface ScrollOptions extends Partial<ScrollbarOptions> {
    maxHeight?: number;
    plugins?: {
        lifecircle?: ScrollLifecirclePluginOptions | false;
        virtual?: VScrollPluginOptions | false;
        trackAux?: ScrollTrackAuxPluginOptions | false;
        hideTrack?: ScrollHideTrackPluginOptions | false;
        disableTrack?: ScrollDisableTrackPluginOptions | false;
        overscroll?: Partial<OverscrollOptions> | false;
    };
}

export interface ScrollOverflowState {
    x: 'none' | 'left' | 'right' | 'both';
    y: 'none' | 'top' | 'bottom' | 'both';
}

export type ScrollHideTrackPluginOptions = {
    x: boolean;
    y: boolean;
};

export type ScrollTrackAuxPluginOptions = {
    scopeId?: string;
    elClasses?: string[];
};

/**
 * 禁用滚动条
 */
export type ScrollDisableTrackPluginOptions = {
    /**
     * 是否禁用x轴
     */
    x?: boolean;
    /**
     * 是否禁用y轴
     */
    y?: boolean;
};

/**
 * 滚动条声明周期
 */
export type ScrollLifecirclePluginOptions = {
    /**
     * 初始化
     */
    onInit?: (scrollbar: Scrollbar) => void;
    /**
     * 销毁
     */
    onDestroy?: (scrollbar: Scrollbar) => void;
    /**
     * 更新
     */
    onUpdate?: (scrollbar: Scrollbar) => void;
    /**
     * 渲染
     */
    onRender?: (_remainMomentum: Data2d, scrollbar: Scrollbar) => void;
};

export type ScrollVirtualPluginOptions = {
    itemClass: string;
    rowHeight: number;
    pageSize: number;
    triggerCount?: number;
};

export type VScrollBoundary = {
    start: number;
    end: number;
};

export type ScrollState = 'init' | 'reset' | 'prev-page' | 'next-page' | 'none';

export type VScrollPluginOptions = {
    rowHeight: Ref<number>;
    boundary: Ref<VScrollBoundary>;
    total: Ref<number>;
    prepareScreenCount: number;
    triggerCount: Ref<number>;
    callback?: (state: ScrollState) => void;
};

export type ScrollVirtualPage = {
    page: number;
    pageSize: number;
    pageCount: number;
    remainderCount: number;
};

/**
 * Tree
 */

export interface InternalTreeNode extends TreeNode<InternalTreeNode> {
    /**
     * 父级节点
     *
     * @ignore
     */
    parent?: InternalTreeNode;
    /**
     * 选择状态图标
     */
    selectIcon?: IconNameOrDefinition;
    /**
     * 选择状态图标
     */
    switchIcon?: IconNameOrDefinition;
    /**
     * 图标
     */
    icon?: IconNameOrDefinition;
    /**
     * 是否是folder节点
     */
    isFolder: boolean;
    /**
     * 路径标识
     */
    path: Array<TreeNodeKey>;
    /**
     * 路径节点
     *
     * @ignore
     */
    pathNodes: Array<InternalTreeNode>;
    /**
     * 级别
     */
    level: number;
    /**
     * 在整个扁平数据中的序号
     */
    index: number;
    /**
     * 在兄弟中的排行
     */
    brotherIndex: number;
    /**
     * 兄弟节点数量
     */
    brotherCount: number;
    /**
     * 是否只有一个子节点
     */
    hasOnlyChild: boolean;
    /**
     * 是否打开状态
     */
    isOpen?: boolean;
    /**
     * 是否显示
     */
    isShow: boolean;
    /**
     * 是否半选中
     */
    isHalfCheck: boolean;
    /**
     * 是否选中
     */
    isChecked: boolean;
    /**
     * 是否是焦点
     */
    isFocus: boolean;
    /**
     * 是否是兄弟中的最后一个节点
     */
    isLastInBrother: boolean;
    /**
     * 源节点数据
     */
    original: any;
}

/**
 * 根据状态确认图标类型
 */
export type TreeNodeStateIcons = {
    /**
     * 正常状态
     */
    default?: IconNameOrDefinition;
    /**
     * 选中状态
     */
    selected?: IconNameOrDefinition;
};

/**
 * 通过节点类型（folder｜leaf）确定图标类型，每种节点类型可配置不同状态显示不同图标，如果直接使用`IconNameOrDefinition`赋给`folder`或`leaf`择不管选中还是未选中只显示一种图标
 */
export type TreeNodeTypeIcons = {
    /**
     * 组节点
     */
    folder?: IconNameOrDefinition | TreeNodeStateIcons;
    /**
     * 叶子结点
     */
    leaf?: IconNameOrDefinition | TreeNodeStateIcons;
};

/**
 * 节点图标类型
 * 1、根据节点类型和选中状态来配置不同图标，使用 `TreeNodeTypeIcons`
 * 2、根据节点类型配置，使用 `TreeNodeTypeIcons`
 * 3、根据节点状态配置，使用 `TreeNodeStateIcons`
 * 4、不管节点类型和状态，使用 `IconNameOrDefinition`
 *
 */
export type TreeNodeFinalIcons = TreeNodeStateIcons | TreeNodeTypeIcons | IconNameOrDefinition;

/**
 * 根据不同的节点数据返回不同的图标配置
 */
export type TreeNodeIconFunction = (node: InternalTreeNode) => TreeNodeFinalIcons;

export type TreeNodeIcons = TreeNodeFinalIcons | TreeNodeIconFunction;

export interface TreeNodeSelectIcons extends SelectIcons {
    /**
     * 半选中状态图标
     */
    halfChecked?: IconNameOrDefinition;
}

export type TreeNodeSwitchIcons = {
    /**
     * 展开状态的图标
     */
    open?: IconNameOrDefinition;
    /**
     * 关闭状态的图标
     */
    close?: IconNameOrDefinition;
};
export type FlatTreeSourceState = {
    map: UnwrapNestedRefs<Map<string | number, InternalTreeNode>>;
    tree: Array<InternalTreeNode>;
    flat: Array<InternalTreeNode>;
};

export type TreeNodeKey = number | string;
export type CheckState = {
    checkedKeys: Set<TreeNodeKey>;
    halfCheckKeys: Set<TreeNodeKey>;
};
export type ExpandState = {
    openedKeys: Set<TreeNodeKey>;
};

export type CheckOptions = {
    orignalState?: CheckState;
    target: InternalTreeNode | Array<InternalTreeNode>;
    flag: boolean;
    cascade: boolean;
    multi: boolean;
};

export type ExpandOptions = {
    orignalState?: ExpandState;
    target: InternalTreeNode | Array<InternalTreeNode>;
    flag: boolean;
};

export type FlatTreeOperatorState = {
    expandState?: ExpandState;
    checkState?: CheckState;
};

export type FlatTreeSourceOptions = {
    icons?: TreeNodeIcons;
    selectIcons?: TreeNodeSelectIcons;
    switchIcons?: TreeNodeSwitchIcons;
    defaultExpandFlag: boolean;
    defaultExpandKeys?: TreeNodeKey[];
    defaultExpandLevel?: number;
    defaultCheckedKeys?: TreeNodeKey[];
    cascade: boolean;
    multi: boolean;
};

/**
 * Affix
 */

/**
 * 操作、图标、图标文本配置，一般用于组件辅助项，比如：前后缀
 */
export type Affix = {
    /**
     * 指定Affix渲染的目标组件
     */
    kind: 'icon' | 'icon-text' | 'button';
    /**
     * 提示语或者显示文本
     */
    text?: string;
    /**
     * 图标
     */
    icon?: IconNameOrDefinition;
    /**
     * 操作回调
     */
    onClick?: ActionCallback;
    /**
     * 可将dom节点挂在到此项上
     */
    el?: Ref;
    /**
     * 样式
     */
    style?: CSSProperties | StringOther;
    /**
     * Icon、IconText、Button的props 请查阅个子组件的props，此项优先级最高（如果props配置项与以上各项有重复，以此项为准）
     */
    props?: Partial<ButtonPropsType> | Partial<IconPropsType> | Partial<IconTextPropsType>;
};
