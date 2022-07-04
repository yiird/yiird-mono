import { Plugin } from 'vue';
import { IconDefinitionOrPack } from './components/icon';
import { GlobalVariables, Theme } from './theme/theme';
export declare type OwlOptions = {
    icons?: Array<IconDefinitionOrPack>;
};
declare const createUI: (theme: Theme<GlobalVariables>) => Plugin;
export * from './components';
export * from './theme';
export { createUI };
