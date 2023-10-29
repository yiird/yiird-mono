import { computed, getCurrentInstance, provide, reactive, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext, type UnwrapNestedRefs } from 'vue';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { checkChidrenIsRightTypes } from '../../common/vnode-utils';
import { FRAMEWORK_CONFIG_KEY } from '../../config';
import type { FrameworkConfig, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
export const FrameworkProps = {
    ...BaseProps,
    /**
     * 固定高度，fixed=`true` 必须在父级元素设置高度后使用
     */
    fixed: {
        type: Boolean as PropType<boolean>,
        default: false
    }
} as const;
export type FrameworkPropsType = Readonly<ExtractPropTypes<typeof FrameworkProps>>;

export interface FrameworkTheme extends ThemeConfig {
    bemModifiers?: string[];
    header?: string;
    footer?: string;
    left?: string;
    right?: string;
    height?: string;
}

export const FrameworkEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<FrameworkPropsType, E>, framework: UnwrapNestedRefs<FrameworkConfig>) => {
    const themeConfig = useTheme();
    const { props } = ctx;
    framework.fixed = props.fixed;
    return computed<FrameworkTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: FrameworkTheme = {
            ..._themeConfig,
            header: (framework?.header || 0) + 'px',
            footer: (framework?.footer || 0) + 'px',
            left: (framework?.left || 0) + 'px',
            right: (framework?.right || 0) + 'px',
            height: props.fixed ? '100%' : 'auto'
        };

        theme.bemModifiers = [];

        return theme;
    });
};

export const setupFramework = (props: FrameworkPropsType, ctx: SetupContext<typeof FrameworkEmits>) => {
    const children = getCurrentInstance()?.slots.default?.call(null) || [];
    if (!checkChidrenIsRightTypes(children, 'Header', 'Footer', 'Main', 'Sider')) {
        throw new Error('Framework的子组件只能是Header,Footer,Main,Sider');
    }
    const framework = reactive<FrameworkConfig>({});
    provide(FRAMEWORK_CONFIG_KEY, framework);
    const commonExposed = usePrefab(props);

    const theme = obtainTheme<typeof FrameworkEmits>({ props, commonExposed, ...ctx }, framework);
    return {
        ...commonExposed,
        theme
    };
};
export const FrameworkExpose = [...baseExpose, ...([] as const)];
export type FrameworkExposeType = (typeof FrameworkExpose)[number];
