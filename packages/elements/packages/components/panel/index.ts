import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { PanelExposeType } from './logic';
import Panel from './template.vue';

const PanelPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Panel, optinos);
    }
};

export type * from './logic';
export { Panel, PanelPlugin };
export type { PlatformOptions as ElementOptions };
export type PanelType = ComponentType<typeof Panel, PanelExposeType>;
