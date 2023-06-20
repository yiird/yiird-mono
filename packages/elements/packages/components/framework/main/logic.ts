import { computed, inject, type ExtractPropTypes } from 'vue';
import { BaseProps, baseExpose } from '../../../common/prefab';
import { FRAMEWORK_CONFIG_KEY } from '../../../config';

export const MainProps = {
    ...BaseProps
} as const;
export interface MainTheme {
    bemModifiers?: string[];
    header?: string;
    footer?: string;
    left?: string;
    right?: string;
    height?: string;
}
export const useMainTheme = (props: Readonly<ExtractPropTypes<typeof MainProps>>) => {
    const framework = inject(FRAMEWORK_CONFIG_KEY);

    return computed<MainTheme>(() => {
        const theme: MainTheme = {};

        theme.header = (framework?.header || 0) + 'px';
        theme.footer = (framework?.footer || 0) + 'px';
        theme.left = (framework?.left || 0) + 'px';
        theme.right = (framework?.right || 0) + 'px';

        if (framework?.fixed) {
            theme.height = `calc( 100% - ${Number(framework?.header || 0) + Number(framework?.footer || 0)}px )`;
        } else {
            theme.height = `auto`;
        }

        theme.bemModifiers = [];

        return theme;
    });
};

export const MainExpose = [...baseExpose, ...([] as const)];
export type MainExposeType = (typeof MainExpose)[number];
