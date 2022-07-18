import { Plugin } from 'vue';
import { IconDefinitionOrPack } from './components/icon';
import { GlobalVariables, Theme } from './theme/theme';
import { LogLevel } from './common/logger';
export declare type OwlOptions = {
    icons?: Array<IconDefinitionOrPack>;
    debug?: boolean;
    debugLevel?: LogLevel;
};
declare const createUI: (theme: Theme<GlobalVariables>) => Plugin;
export * from './components';
export * from './theme';
export { createUI };
