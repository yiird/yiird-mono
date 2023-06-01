import type { Data2d, ScrollbarOptions } from 'smooth-scrollbar/interfaces';
import type { OverscrollOptions } from 'smooth-scrollbar/plugins/overscroll';
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';
import type { Ref } from 'vue';

export interface ScrollOptions extends Partial<ScrollbarOptions> {
    plugins?: {
        auxEl?: AuxElPluginOptions | boolean;
        hideTrack?: HideTrackPluginOptions | boolean;
        lifecircle?: LifecirclePluginOptions | boolean;
        disableScrollBar?: DisableScrollBarPluginOptions | boolean;
        virtualPage?: VirtualPagePluginOptions | boolean;
        overscroll?: OverscrollOptions | boolean;
    };
}

export interface OverflowBoundsState {
    x: 'none' | 'left' | 'right' | 'both';
    y: 'none' | 'top' | 'bottom' | 'both';
}

export interface PageBoundary {
    start: number;
    end: number;
    pageSize: number;
}

export interface VirtualPage {
    pageSize: number;
    totalPage: number;
    page: number;
    firstPage: number;
    lastPage: number;
    offsetRenderPageCount: number;
    lastCount: number;
}

export interface Scroll {
    scrollbar?: Scrollbar;
    overflowState: OverflowBoundsState;
    setOptions: (_options?: ScrollOptions) => void;
}

export type HideTrackPluginOptions = {
    track?: 'none' | 'x' | 'y' | 'both';
};

export type AuxElPluginOptions = {
    scopeId?: string;
    auxPosition?: string[];
};

/**
 * 禁用滚动条
 */
export type DisableScrollBarPluginOptions = {
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
export type LifecirclePluginOptions = {
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

export type VirtualPagePluginOptions = {
    itemClass: string;
    unitHeight: Ref<number>;
    totalCount: Ref<number>;
    focusIndex?: Ref<number>;
    triggerCount?: number;
    preRenderScreenSize?: number;
    boundary?: Ref<PageBoundary>;
};
