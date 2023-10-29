import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { VscrollExposeType } from './logic';
import Vscroll from './template.vue';

const VscrollPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Vscroll, optinos);
    }
};

export type * from './logic';
export { Vscroll, VscrollPlugin };
export type { PlatformOptions as ElementOptions };
export type VscrollType = ComponentType<typeof Vscroll, VscrollExposeType>;
