import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import { InputExpose, type InputExposeType } from './logic';
import Input from './template.vue';
console.log(InputExpose);

const InputPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Input.name}`), Input);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Input, InputPlugin };
export type { ElementOptions };

export type InputType = ComponentType<typeof Input, InputExposeType>;
