import { IconDefinition, IconPack } from '@fortawesome/fontawesome-svg-core';
import { App } from 'vue';
import './themes/styles/main.scss';
/**
 * @beta
 * @param definitions - 新消息
 */
declare const addIcon: (...definitions: (IconDefinition | IconPack)[]) => void;
export * from './components';
export * from './packages';
export * from './types';
export * from './utils';
export { addIcon };
declare const Owl: {
    install: (app: App) => void;
};
export default Owl;
//# sourceMappingURL=index.d.ts.map