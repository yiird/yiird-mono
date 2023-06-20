import { computed, inject, type ExtractPropTypes, type PropType } from 'vue';
import { BaseProps, baseExpose } from '../../../common/prefab';
import { FRAMEWORK_CONFIG_KEY } from '../../../config';
export const SiderProps = {
    ...BaseProps,
    size: {
        type: [Number, String] as PropType<string | number>,
        default: 10
    },
    position: {
        type: String as PropType<'left' | 'right'>,
        default: 'left'
    }
} as const;
export interface SiderTheme {
    bemModifiers?: string[];
    size?: string;
    header?: string;
    footer?: string;
    height?: string;
}
export const useSiderTheme = (props: Readonly<ExtractPropTypes<typeof SiderProps>>) => {
    const framework = inject(FRAMEWORK_CONFIG_KEY);

    if (framework) {
        framework[props.position] = Number(props.size);
    }

    return computed<SiderTheme>(() => {
        const theme: SiderTheme = {};

        if (props.size) {
            theme.size = props.size + 'px';
        }

        theme.header = (framework?.header || 0) + 'px';
        theme.footer = (framework?.footer || 0) + 'px';

        if (framework?.fixed) {
            theme.height = `calc( 100% - ${Number(framework?.header || 0) + Number(framework?.footer || 0)}px )`;
        } else {
            theme.height = `auto`;
        }
        theme.bemModifiers = [];

        theme.bemModifiers.push(`sider--${props.position}`);

        return theme;
    });
};

export const SiderExpose = [...baseExpose, ...([] as const)];
export type SiderExposeType = (typeof SiderExpose)[number];
