import { Plugin } from 'vue';
import { Theme } from './theme/theme';
declare const createUI: (theme?: Theme<{}> | undefined) => Plugin;
export * from './components/';
export * from './components/types';
export * from './theme';
export { ThemeNormal } from './theme/theme-normal';
export { createUI };
