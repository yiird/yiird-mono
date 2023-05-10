import { ScrollbarPlugin } from 'smooth-scrollbar';
import type { Data2d } from 'smooth-scrollbar/interfaces';
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';

export type HideTrackPluginOptions = {
    track: 'none' | 'x' | 'y' | 'both';
};

export class HideTrackPlugin extends ScrollbarPlugin {
    static pluginName = 'hideTrack';

    static defaultOptions: HideTrackPluginOptions = {
        track: 'none'
    };

    onInit() {
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

export type AuxElPluginOptions = {
    scopeId?: string;
    auxPosition?: string[];
};

export class AuxElPlugin extends ScrollbarPlugin {
    static pluginName = 'auxEl';

    static defaultOptions: AuxElPluginOptions = {
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
        this.options.auxPosition.forEach((aux: string) => {
            this.createEl(aux, this.options.scopeId);
        });
    }
}

export type DisableScrollBarPluginOptions = {
    x?: boolean;
    y?: boolean;
};

export class DisableScrollBarPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScrollBar';

    static defaultOptions: DisableScrollBarPluginOptions = {
        x: false,
        y: false
    };

    transformDelta(delta: Data2d, _evt: Event): Data2d {
        console.log(delta);
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

export type LifecirclePluginOptions = {
    onInit?: (scrollbar: Scrollbar) => void;
    onDestroy?: (scrollbar: Scrollbar) => void;
    onUpdate?: (scrollbar: Scrollbar) => void;
    onRender?: (_remainMomentum: Data2d, scrollbar: Scrollbar) => void;
};

export class LifecirclePlugin extends ScrollbarPlugin {
    static pluginName = 'lifecircle';
    static defaultOptions: LifecirclePluginOptions = {};

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
