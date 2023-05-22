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
        pageSize: 0,
        totalPage: 0,
        lastCount: 0
    };

    positionState?: 'scrolling-top' | 'scrolling-bottom' | 'top' | 'bottom';

    unitHeight?: number;
    totalCount?: number;
    itemClass?: string;
    triggerCount?: number;

    offsetOfCurrentPage?: number;

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
                const state = positionState();
                if (!state) {
                    const offsetY = offset.y;
                    const limitY = limit.y;
                    if (limitY - offsetY === 0) {
                        if (virtualPage.page < virtualPage.totalPage - 1) {
                            setPositionState('scrolling-bottom');
                            scorlling.call(that);
                        }
                    } else if (offsetY === 0) {
                        if (virtualPage.page > 1) {
                            setPositionState('scrolling-top');
                            scorlling.call(that);
                        }
                    }
                }
            }
        };
    }

    _initVirtualPage() {
        const totalCount = this.options.totalCount;
        const unitHeight = this.options.unitHeight;
        const focusIndex = this.options.focusIndex;
        this.boundary = this.options.boundary;
        watch(
            [totalCount, unitHeight, focusIndex],
            ([_totalCount, _unitHeight, _focusIndex]) => {
                if (_totalCount > 0 && _unitHeight > 0) {
                    this.unitHeight = _unitHeight;
                    this.totalCount = _totalCount;

                    const containerHeight = this.scrollbar.size.container.height;
                    const pageSize = Math.round(containerHeight / _unitHeight);
                    this.virtualPage.totalPage = Math.ceil(_totalCount / pageSize);
                    this.virtualPage.pageSize = pageSize;
                    this.virtualPage.page = this.virtualPage.page || 1;
                    this.virtualPage.lastCount = _totalCount % pageSize;

                    this._computedBoundary(_focusIndex + 1);
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
            const pageSize = this.virtualPage.pageSize;
            if (this.positionState === 'scrolling-top' || this.positionState === 'scrolling-bottom') {
                if (this.positionState === 'scrolling-top') {
                    this.virtualPage.page -= 1;
                } else if (this.positionState === 'scrolling-bottom') {
                    this.virtualPage.page += 1;
                }

                this._computedBoundary();
                nextTick(() => {
                    this.scrollbar.setPosition(0, pageSize * (this.unitHeight || 0));
                    this.positionState = undefined;
                });
            }
        }
    }

    _computedBoundary(focusIndex?: number) {
        const pageSize = this.virtualPage.pageSize;
        const boundary = this.options.boundary as PageBoundary;
        if (!this.totalCount || !this.unitHeight) return;
        if (pageSize > 0 && boundary && isRef(boundary)) {
            let page = this.virtualPage.page;

            console.log('this.virtualPage.page', page);
            if (focusIndex && focusIndex >= 0) {
                page = Math.ceil(focusIndex / pageSize);
                if (1 === page) {
                    if (focusIndex % pageSize > pageSize / 2) {
                        this.offsetOfCurrentPage = this.unitHeight * ((focusIndex % pageSize) - pageSize / 2);
                    } else if (focusIndex % pageSize === 0) {
                        this.offsetOfCurrentPage = this.unitHeight * pageSize * 0.5;
                    }
                } else if (focusIndex % pageSize > pageSize / 2) {
                    this.offsetOfCurrentPage = this.unitHeight * (pageSize / 2 + (focusIndex % pageSize));
                } else if (focusIndex % pageSize === 0) {
                    this.offsetOfCurrentPage = this.unitHeight * pageSize * 1.5;
                } else {
                    this.offsetOfCurrentPage = this.unitHeight * (pageSize / 2 + (focusIndex % pageSize));
                }
                nextTick(() => {
                    if (this.offsetOfCurrentPage) {
                        this.scrollbar.update();
                        this.scrollbar.setPosition(this.scrollbar.scrollLeft, this.offsetOfCurrentPage, {
                            withoutCallbacks: true
                        });
                        this.offsetOfCurrentPage = undefined;
                    }
                });
            }
            let start, end;
            if (1 === page) {
                start = 0;
                end = pageSize * 3;
                debugger;
                nextTick(() => {
                    this.scrollbar.update();
                    this.scrollbar.scrollTo(this.scrollbar.scrollLeft, 1);
                });
            } else if (this.virtualPage.totalPage === page) {
                start = pageSize * (page - 2);
                end = start + pageSize * 3;
            } else {
                start = pageSize * (page - 2);
                end = start + pageSize * 3;
            }
            this.virtualPage.page = page;
            boundary.value = { start, end };
        }
    }
}
