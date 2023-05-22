import { ScrollbarPlugin } from 'smooth-scrollbar';
import type { Data2d, ScrollListener, ScrollStatus } from 'smooth-scrollbar/interfaces';
import { EffectScope, effectScope, isRef, nextTick, watch, type UnwrapNestedRefs } from 'vue';
import type { AuxElPluginOptions, DisableScrollBarPluginOptions, HideTrackPluginOptions, LifecirclePluginOptions, PageBoundary, VirtualPage } from '../types/scroll';

export class HideTrackPlugin extends ScrollbarPlugin {
    static pluginName = 'hideTrack';

    static defaultOptions: HideTrackPluginOptions = {
        enabled: false,
        track: 'none'
    };

    onInit() {
        if (!this.options.enabled) return;
        const track = this.options.track;
        if (track === 'both') {
            this.scrollbar.containerEl.querySelectorAll('.scrollbar-track')?.forEach((el) => el.remove());
        } else if (track === 'x') {
            this.scrollbar.containerEl.querySelector('.scrollbar-track-x')?.remove();
        } else if (track === 'y') {
            this.scrollbar.containerEl.querySelector('.scrollbar-track-y')?.remove();
        }
    }
}

export class AuxElPlugin extends ScrollbarPlugin {
    static pluginName = 'auxEl';

    static defaultOptions: AuxElPluginOptions = {
        enabled: false,
        auxPosition: []
    };

    createEl(className: string, scopeId?: string) {
        const aux = document.createElement('div');
        if (scopeId) {
            aux.setAttribute(scopeId, '');
        }
        aux.classList.add(className);
        const containerEl = this.scrollbar.containerEl;
        containerEl.append(aux);
    }

    onInit() {
        if (!this.options.enabled) return;
        this.options.auxPosition.forEach((aux: string) => {
            this.createEl(aux, this.options.scopeId);
        });
    }
}

export class DisableScrollBarPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScrollBar';

    static defaultOptions: DisableScrollBarPluginOptions = {
        enabled: false,
        x: false,
        y: false
    };

    transformDelta(delta: Data2d, _evt: Event): Data2d {
        if (!this.options.enabled) return delta;
        if (_evt instanceof WheelEvent) {
            if (this.options.x) {
                delta.x = 0;
            }
            if (this.options.y) {
                delta.y = 0;
            }
        }
        return delta;
    }
}

export class LifecirclePlugin extends ScrollbarPlugin {
    static pluginName = 'lifecircle';
    static defaultOptions: LifecirclePluginOptions = {
        enabled: false
    };

    onInit() {
        if (!this.options.enabled) return;
        if (this.options.onInit) {
            this.options.onInit(this.scrollbar);
        }
    }
    onDestroy() {
        if (!this.options.enabled) return;
        if (this.options.onDestroy) {
            this.options.onDestroy(this.scrollbar);
        }
    }
    onUpdate() {
        if (!this.options.enabled) return;
        if (this.options.onUpdate) {
            this.options.onUpdate(this.scrollbar);
        }
    }
}

export class VirtualPagePlugin extends ScrollbarPlugin {
    static pluginName = 'virtualPage';

    boundary?: UnwrapNestedRefs<PageBoundary>;

    scope: EffectScope = effectScope(true);

    virtualPage: VirtualPage = {
        page: 0,
        firstPage: 0,
        lastPage: 0,
        pageSize: 0,
        totalPage: 0,
        lastCount: 0,
        offsetRenderPageCount: 1
    };

    positionState?: 'scrolling-top' | 'scrolling-bottom' | 'top' | 'bottom';

    unitHeight?: number;
    totalCount?: number;
    itemClass?: string;
    triggerCount?: number;
    renderPageCount = 3;

    scrollListener?: ScrollListener;

    onInit() {
        if (!this.options.itemClass) {
            throw new Error('[VirtualPagePlugin] 缺少配置:itemClass');
        }
        if (!this.options.unitHeight) {
            throw new Error('[VirtualPagePlugin] 缺少配置:unitHeight');
        }
        if (!this.options.totalCount) {
            throw new Error('[VirtualPagePlugin] 缺少配置:totalCount');
        }
        this.itemClass = this.options.itemClass;
        this.triggerCount = this.options.triggerCount;
        this.renderPageCount = this.options.renderPageCount;
        this.scope.run(() => {
            this._initVirtualPage();
        });

        this.scrollListener = this.gescrollListener();

        this.scrollbar.addListener(this.scrollListener);
    }

    onDestroy(): void {
        if (this.scrollListener) {
            this.scrollbar.removeListener(this.scrollListener);
        }
        this.scope.stop();
    }

    gescrollListener() {
        const positionState = () => {
            return this.positionState;
        };
        const setPositionState = (state: 'scrolling-top' | 'scrolling-bottom' | 'top' | 'bottom') => {
            this.positionState = state;
        };
        const virtualPage = this.virtualPage;
        const scorlling = this._scorlling;
        const that = this;
        return ({ limit, offset }: ScrollStatus) => {
            if (virtualPage) {
                const { firstPage, lastPage } = virtualPage;
                const state = positionState();
                if (!state) {
                    const offsetY = offset.y;
                    const limitY = limit.y;
                    if (limitY - offsetY === 0) {
                        if (virtualPage.page < lastPage) {
                            setPositionState('scrolling-bottom');
                            scorlling.call(that);
                        }
                    } else if (offsetY === 0) {
                        if (virtualPage.page > firstPage) {
                            setPositionState('scrolling-top');
                            scorlling.call(that);
                        }
                    }
                }
            }
        };
    }

    _initVirtualPage() {
        const { totalCount, unitHeight, focusIndex } = this.options;
        this.boundary = this.options.boundary;
        watch(
            [focusIndex, totalCount, unitHeight],
            ([_focusIndex, _totalCount, _unitHeight], [prev_focusIndex]) => {
                if (_totalCount > 0 && _unitHeight > 0) {
                    this.unitHeight = _unitHeight;
                    this.totalCount = _totalCount;

                    const containerHeight = this.scrollbar.size.container.height;
                    const pageSize = Math.round(containerHeight / _unitHeight);

                    if (_totalCount > pageSize * this.renderPageCount) {
                        const lastCount = _totalCount % pageSize;
                        const totalPage = Math.floor(_totalCount / pageSize);
                        const offsetRenderPageCount = (this.renderPageCount - 1) / 2;
                        const firstPage = offsetRenderPageCount;
                        const lastPage = lastCount > 0 ? totalPage - offsetRenderPageCount - 1 : totalPage - offsetRenderPageCount;
                        this.virtualPage.totalPage = totalPage;
                        this.virtualPage.pageSize = pageSize;
                        this.virtualPage.firstPage = firstPage;
                        this.virtualPage.lastPage = lastPage;
                        this.virtualPage.page = this.virtualPage.page || firstPage;
                        this.virtualPage.lastCount = lastCount;
                        this.virtualPage.offsetRenderPageCount = offsetRenderPageCount;
                        // console.log(this.virtualPage);
                        prev_focusIndex = prev_focusIndex || 0;
                        if (prev_focusIndex !== _focusIndex) {
                            this._computedBoundary(_focusIndex, prev_focusIndex === undefined ? 0 : _focusIndex - prev_focusIndex);
                        } else {
                            this._computedBoundary();
                        }
                    }
                }
            },
            {
                immediate: true
            }
        );
    }

    _scorlling() {
        const boundary = this.options.boundary as PageBoundary;
        if (boundary && isRef(boundary) && this.itemClass) {
            if (this.positionState === 'scrolling-top' || this.positionState === 'scrolling-bottom') {
                let needComputedBoundary = false;
                if (this.positionState === 'scrolling-top') {
                    this.virtualPage.page -= 1;
                    needComputedBoundary = true;
                } else if (this.positionState === 'scrolling-bottom') {
                    this.virtualPage.page += 1;
                    needComputedBoundary = true;
                } else {
                    this.positionState = undefined;
                }

                if (needComputedBoundary) {
                    this._computedBoundary();

                    nextTick(() => {
                        this.positionState = undefined;
                    });
                }
            }
        }
    }

    _computedBoundary(focusIndex?: number, focusAsc?: number) {
        const { page, firstPage, lastPage, pageSize, totalPage, offsetRenderPageCount, lastCount } = this.virtualPage;
        if (!this.totalCount || !this.unitHeight) return;

        const boundary = this.options.boundary as PageBoundary;

        if (pageSize > 0 && boundary && isRef(boundary)) {
            let currentPage = page;
            let offsetUnis;

            if (focusIndex && focusAsc) {
                const ceilPage = Math.ceil(focusIndex / pageSize);
                const floorPage = Math.floor(focusIndex / pageSize);
                currentPage = floorPage;

                console.log(
                    `page:${currentPage}/${totalPage},focusIndex:${focusIndex},ll:${focusIndex % pageSize}|${
                        focusIndex % (this.renderPageCount * pageSize)
                    } ceil|floor:${ceilPage}|${floorPage}`
                );
                if (currentPage <= firstPage) {
                    if (focusIndex === pageSize / 2) {
                        offsetUnis = -1;
                    } else {
                        offsetUnis = focusIndex - pageSize / 2;
                    }
                } else if (currentPage >= lastPage) {
                    currentPage = lastPage;
                    offsetUnis = pageSize * (this.renderPageCount / 2) + (focusIndex - currentPage * pageSize) - pageSize;
                } else {
                    offsetUnis = pageSize * offsetRenderPageCount + (focusIndex % pageSize) - pageSize / 2;
                }
                console.log(currentPage);
            } else {
                if (this.positionState === 'scrolling-bottom') {
                    offsetUnis = pageSize * offsetRenderPageCount;
                } else if (this.positionState === 'scrolling-top') {
                    offsetUnis = pageSize;
                }
            }

            //计算边界
            const startPage = currentPage - offsetRenderPageCount;

            const start = pageSize * startPage;
            let end = start + pageSize * this.renderPageCount;

            if (lastCount > 0 && currentPage >= totalPage - offsetRenderPageCount - 1) {
                end += lastCount;
            }

            boundary.value = { start, end };
            console.log(start);

            //滚动条偏移
            if (offsetUnis) {
                this.scrollbar.setPosition(this.scrollbar.scrollLeft, this.unitHeight! * offsetUnis);
            }
            this.virtualPage.page = currentPage;
        }
    }
}
