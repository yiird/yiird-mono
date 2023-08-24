import pkg from 'smooth-scrollbar';
import type { Data2d, ScrollListener, ScrollStatus } from 'smooth-scrollbar/interfaces';
import { nextTick, watch } from 'vue';
import type {
    ScrollDisableTrackPluginOptions,
    ScrollHideTrackPluginOptions,
    ScrollLifecirclePluginOptions,
    ScrollState,
    ScrollTrackAuxPluginOptions,
    ScrollVirtualPage,
    VScrollPluginOptions
} from '../types/scroll';
import { styleValueToNumber } from './dom-utils';
const { ScrollbarPlugin } = pkg;

export class ScrollHideTrackPlugin extends ScrollbarPlugin {
    static pluginName = 'hideTrack';

    static defaultOptions: ScrollHideTrackPluginOptions = {
        x: false,
        y: false
    };

    onInit() {
        const { x, y } = this.options as ScrollHideTrackPluginOptions;
        if (x) {
            this.scrollbar.containerEl.querySelector('.scrollbar-track-x')?.remove();
        }
        if (y) {
            this.scrollbar.containerEl.querySelector('.scrollbar-track-y')?.remove();
        }
    }
}

export class ScrollTrackAuxPlugin extends ScrollbarPlugin {
    static pluginName = 'trackAux';

    static defaultOptions: ScrollTrackAuxPluginOptions = {
        elClasses: []
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
        if (this.options.elClasses && this.options.elClasses.length > 0) {
            this.options.elClasses.forEach((aux: string) => {
                this.createEl(aux, this.options.scopeId);
            });
        }
    }
}

export class ScrollDisableTrackPlugin extends ScrollbarPlugin {
    static pluginName = 'disableTrack';

    static defaultOptions: ScrollDisableTrackPluginOptions = {
        x: false,
        y: false
    };

    transformDelta(delta: Data2d, _evt: Event): Data2d {
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

export class ScrollLifecirclePlugin extends ScrollbarPlugin {
    static pluginName = 'lifecircle';
    static defaultOptions: ScrollLifecirclePluginOptions = {};

    onInit() {
        if (this.options.onInit) {
            this.options.onInit(this.scrollbar);
        }
    }
    onDestroy() {
        if (this.options.onDestroy) {
            this.options.onDestroy(this.scrollbar);
        }
    }
    onUpdate() {
        if (this.options.onUpdate) {
            this.options.onUpdate(this.scrollbar);
        }
    }
}

export class ScrollVirtualPlugin extends ScrollbarPlugin {
    static pluginName = 'virtual';

    private _virtualPage: ScrollVirtualPage = {
        page: 1,
        pageSize: 0,
        pageCount: 0,
        remainderCount: 0
    };
    private _renderState: ScrollState = 'none';

    private _direction: 'up' | 'down' | 'none' = 'none';

    private _morePageCount = 2;

    private _virtual = false;
    private _callback?: (state: ScrollState) => void;

    private _onScroll?: ScrollListener;

    onInit() {
        const { rowHeight, boundary, prepareScreenCount, triggerCount, total, callback } = this.options as VScrollPluginOptions;
        if (!rowHeight) {
            throw new Error('缺少:rowHeight！');
        }
        if (!boundary) {
            throw new Error('缺少:boundary！');
        }
        if (!prepareScreenCount) {
            throw new Error('缺少:prepareScreenCount！');
        }
        if (!triggerCount) {
            throw new Error('缺少:triggerCount！');
        }
        if (!total) {
            throw new Error('缺少:total！');
        }
        this._callback = callback;

        this.setState('init');

        watch(
            [total, rowHeight, triggerCount],
            ([_total, _rowHeight, _triggerCount]) => {
                if (this._renderState !== 'init') {
                    this.setState('reset');
                }
                nextTick(() => {
                    this._virtual = _total > _triggerCount;
                    if (this._virtual) {
                        if (_total && _rowHeight) {
                            if (this._onScroll) {
                                this.scrollbar.removeListener(this._onScroll);
                            }

                            const pageSize = Math.floor(styleValueToNumber(getComputedStyle(this.scrollbar.containerEl).height) / _rowHeight);

                            this._virtualPage.pageSize = pageSize;
                            this._virtualPage.pageCount = Math.floor(_total / pageSize);
                            this._virtualPage.remainderCount = _total % pageSize;

                            this._onScroll = this.createScrollListener();
                            this.scrollbar.addListener(this._onScroll);
                            this.computedBoundary();
                        }
                    } else {
                        if (this._onScroll) {
                            this.scrollbar.removeListener(this._onScroll);
                        }
                        boundary.value = { start: 0, end: _total };
                    }
                    nextTick(() => {
                        this.scrollbar.update();
                        this.setState('none');
                    });
                });
            },
            {
                immediate: true
            }
        );
    }

    onDestroy(): void {
        if (this._onScroll) {
            this.scrollbar.removeListener(this._onScroll);
        }
    }

    transformDelta(delta: Data2d): Data2d {
        const { y } = delta;
        if (y > 0) {
            this._direction = 'down';
        } else if (y < 0) {
            this._direction = 'up';
        } else {
            this._direction = 'none';
        }
        return delta;
    }

    private setState(state: ScrollState) {
        this._renderState = state;
        if (this._callback) {
            this._callback(state);
        }
    }

    private createScrollListener() {
        const that = this;
        return ({ limit, offset }: ScrollStatus) => {
            const { prepareScreenCount } = that.options;
            const { _direction, _renderState, _virtualPage } = that;
            const { pageCount, page } = _virtualPage;
            const offsetY = offset.y;
            const limitY = limit.y;
            if ((_renderState === 'none' || _renderState === 'init' || _renderState === 'reset') && _direction !== 'none') {
                if (limitY - offsetY === 0 && _direction === 'down') {
                    if (page < pageCount - prepareScreenCount) {
                        _virtualPage.page += that._morePageCount;
                        that.setState('next-page');
                        that.computedBoundary();
                    }
                } else if (offsetY === 0 && _direction === 'up') {
                    if (page >= 2) {
                        _virtualPage.page -= that._morePageCount;
                        that.setState('prev-page');
                        that.computedBoundary();
                    }
                }
            }
        };
    }

    private computedBoundary() {
        const { rowHeight, boundary, prepareScreenCount } = this.options as VScrollPluginOptions;
        const { pageSize, page, pageCount, remainderCount } = this._virtualPage;
        const startPage = page - 1;
        const endPage = page + prepareScreenCount;

        boundary.value = {
            start: pageSize * startPage,
            end: pageSize * endPage + (endPage === pageCount ? remainderCount : 0)
        };
        if (this._renderState === 'next-page') {
            this.scrollbar.setPosition(this.scrollbar.scrollLeft, rowHeight.value * pageSize);
        } else if (this._renderState === 'prev-page') {
            this.scrollbar.setPosition(this.scrollbar.scrollLeft, rowHeight.value * pageSize * this._morePageCount);
        }
        nextTick(() => {
            this.setState('none');
        });
    }
}
