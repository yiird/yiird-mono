import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { BtnExposeType } from './logic';
import Btn from './template.vue';

const BtnPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Btn.name}`), Btn);
    },
    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type { BtnMode, BtnShape } from './logic';
export { Btn, BtnPlugin };
export type { ElementOptions };
export type BtnType = ComponentType<typeof Btn, BtnExposeType>;
