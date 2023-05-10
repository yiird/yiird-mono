import { computed, inject, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps } from '../../../common/prefab';
import { FRAMEWORK_CONFIG_KEY } from '../../../config';
export const FooterProps = {
    ...BaseProps,
    size: {
        type: [Number, String] as PropType<string | number>,
        default: 10
    }
} as const;

export type FooterPropsType = ExtractPropTypes<typeof FooterProps>;

export interface FooterTheme {
    bemModifiers?: string[];
    size?: string;
}
export const useFooterTheme = (props: FooterPropsType) => {
    const framework = inject(FRAMEWORK_CONFIG_KEY);

    if (framework) {
        framework.footer = Number(props.size);
    }

    return computed<FooterTheme>(() => {
        const theme: FooterTheme = {};
        if (props.size) {
            theme.size = props.size + 'px';
        }

        theme.bemModifiers = [];

        return theme;
    });
};
