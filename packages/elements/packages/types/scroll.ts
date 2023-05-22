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
}

export type HideTrackPluginOptions = {
    enabled: boolean;
    track?: 'none' | 'x' | 'y' | 'both';
};

export type AuxElPluginOptions = {
    enabled: boolean;
    scopeId?: string;
    auxPosition?: string[];
};

export type DisableScrollBarPluginOptions = {
    enabled: boolean;
    x?: boolean;
    y?: boolean;
};

export type LifecirclePluginOptions = {
    enabled: boolean;
    onInit?: (scrollbar: Scrollbar) => void;
    onDestroy?: (scrollbar: Scrollbar) => void;
    onUpdate?: (scrollbar: Scrollbar) => void;
    onRender?: (_remainMomentum: Data2d, scrollbar: Scrollbar) => void;
};

export type VirtualPagePluginOptions = {
    itemClass: string;
    unitHeight: Ref<number>;
    totalCount: Ref<number>;
    focusIndex?: Ref<number>;
    triggerCount?: number;
    renderPageCount: number;
    boundary?: Ref<PageBoundary>;
};
