import { computed, provide, ref, type ExtractPropTypes, type PropType } from 'vue';
import { useScroll } from '../../common/composites-scroll';
import { BaseProps, baseExpose, usePrefab, useTheme, type CommonPrefab } from '../../common/prefab';
import { SCROLL_KEY } from '../../config';
import type { ScrollOptions } from '../../types/scroll';
export const PanelProps = {
    ...BaseProps,
    virtual: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const;
export type PanelPropsType = Readonly<ExtractPropTypes<typeof PanelProps>>;

export interface PanelTheme {
    bemModifiers?: string[];
}
const obtainTheme = (props: PanelPropsType, prefab: CommonPrefab) => {
    const themeConfig = useTheme();
    return computed<PanelTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: PanelTheme = {};

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupPanel = (props: PanelPropsType) => {
    const prefab = usePrefab(props);
    const theme = obtainTheme(props, prefab);
    const container = ref();

    const scrollOptions: ScrollOptions = {
        continuousScrolling: false,
        plugins: {
            hideTrack: { enabled: false },
            virtualPage: props.virtual
        }
    };

    const scroll = useScroll(container, scrollOptions);

    provide(SCROLL_KEY, scroll);

    return {
        ...prefab,
        theme,
        container
    };
};
export const panelExpose = [...baseExpose];
