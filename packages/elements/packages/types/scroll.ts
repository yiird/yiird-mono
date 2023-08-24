import type { Data2d, ScrollbarOptions } from 'smooth-scrollbar/interfaces';
import type { OverscrollOptions } from 'smooth-scrollbar/plugins/overscroll';
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';
import type { Ref } from 'vue';

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
