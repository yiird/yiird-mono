import type { PlatformOptions } from '../types/global';
import { rootStyleVariables, updateRootStyle } from './dom-utils';

export const readyCallback = (ops?: PlatformOptions) => {
    const theme = ops?.themeConfig;
    if (theme) {
        updateRootStyle('ye-root-variables', rootStyleVariables(theme));
        updateRootStyle(
            'root-styles',
            `
html,body{
font-size: var(--ye-font-size);
font-family: var(--ye-font-family);
}
*, ::before, ::after {
box-sizing: border-box;
margin:0;
padding:0;
}
                    `
        );
    }
    if (ops?.documentReady) {
        ops?.documentReady?.call(null);
    }
};
