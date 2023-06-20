import { computed, inject, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, baseExpose } from '../../../common/prefab';
import { FRAMEWORK_CONFIG_KEY } from '../../../config';
export const HeaderProps = {
    ...BaseProps,
    size: {
        type: [Number, String] as PropType<string | number>,
        default: 10
    }
} as const;
export interface HeaderTheme {
    bemModifiers?: string[];
    size?: string;
}
export const useHeaderTheme = (props: Readonly<ExtractPropTypes<typeof HeaderProps>>) => {
    const framework = inject(FRAMEWORK_CONFIG_KEY);

    if (framework) {
        framework.header = Number(props.size);
    }

    return computed<HeaderTheme>(() => {
        const theme: HeaderTheme = {};
        if (props.size) {
            theme.size = props.size + 'px';
        }

        theme.bemModifiers = [];

        return theme;
    });
};

export const HeaderExpose = [...baseExpose, ...([] as const)];
export type HeaderExposeType = (typeof HeaderExpose)[number];
