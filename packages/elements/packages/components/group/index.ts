import type { App, Plugin } from 'vue';
import { _register } from '../../common/prefab';
import type { PlatformOptions } from '../../types/global';
import type { ComponentType } from '../../types/prefab';
import type { GroupExposeType } from './logic';
import Group from './template.vue';

const GroupPlugin: Plugin = {
    install(app: App, optinos: PlatformOptions) {
        _register(app, Group, optinos);
    }
};

export type * from './logic';
export { Group, GroupPlugin };
export type { PlatformOptions };
export type GroupType = ComponentType<typeof Group, GroupExposeType>;
