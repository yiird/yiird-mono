import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/options';
import type { ComponentType } from '../../types/prefab';
import type { TreeExposeType } from './logic';
import Tree from './template.vue';

const TreePlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Tree, optinos);
    }
};

export type * from './logic';
export { Tree, TreePlugin };
export type { PlatformOptions as ElementOptions };
export type TreeType = ComponentType<typeof Tree, TreeExposeType>;
