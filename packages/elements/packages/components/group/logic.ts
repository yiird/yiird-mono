import { isBoolean } from 'lodash-es';
import { computed, h, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { insertArray } from '../../common/common-util';
import { BaseProps, baseExpose, usePrefab, useTheme } from '../../common/prefab';
import { checkChidrenIsRightTypes, vnodeRef } from '../../common/vnode-utils';
import type { Direction, Size, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
import { Divider } from '../divider';
import { Space } from '../space';
export const GroupProps = {
    ...BaseProps,
    direction: {
        type: String as PropType<Direction>,
        default: 'h'
    },
    /**
     * 是否有分割线
     */
    divider: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    gap: {
        type: [String, Number] as PropType<Size>,
        default: 0
    },
    /**
     * 在其他组件后面
     * 只对 button 生效
     */
    after: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 在其他组件前面
     * 只对 button 生效
     */
    before: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 紧凑
     */
    compact: {
        type: [Boolean, Number] as PropType<boolean | number>,
        default: false
    }
} as const;
export type GroupPropsType = Readonly<ExtractPropTypes<typeof GroupProps>>;

export interface GroupTheme extends ThemeConfig {
    bemModifiers?: string[];
    compact: string;
}

export const GroupEmits = {};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<GroupPropsType, E>) => {
    const themeConfig = useTheme();
    const {
        props,
        commonExposed: { cType__ }
    } = ctx;
    return computed<GroupTheme>(() => {
        const { compact, direction, before, after } = props;
        const _themeConfig = themeConfig.value;

        const theme: GroupTheme = {
            ..._themeConfig,
            compact: `-${isBoolean(compact) && compact ? 8 : compact}px`
        };

        theme.bemModifiers = [`${cType__}--direction-${direction}`];

        if (before) {
            theme.bemModifiers.push(`${cType__}--before`);
        }
        if (after) {
            theme.bemModifiers.push(`${cType__}--after`);
        }

        if (compact) {
            theme.bemModifiers.push(`${cType__}--compact`);
        }

        return theme;
    });
};

export const setupGroup = (props: GroupPropsType, ctx: SetupContext<typeof GroupEmits>) => {
    const commonExposed = usePrefab(props);
    const { slots } = ctx;

    const allowedTypes = ['Button', 'IconText', 'Icon', 'Avatar', 'Checkbox'];

    const theme = obtainTheme<typeof GroupEmits>({ props, commonExposed, ...ctx });

    const obtainChildren = vnodeRef(() => {
        const { direction, divider, compact } = props;
        const dividerDirection = direction === 'v' ? 'h' : 'v';

        return h(
            Space,
            {
                direction,
                gap: compact ? 0 : props.gap,
                crossAxis: 'center'
            },
            () => {
                let children = slots.default?.call(null);
                if (children) {
                    if (!checkChidrenIsRightTypes(children, ...allowedTypes)) {
                        throw new Error(`组内组件必须是:${allowedTypes.join(' , ')}`);
                    }

                    if (children && divider) {
                        children = insertArray(
                            children,
                            h(Divider, {
                                margin: 0,
                                direction: dividerDirection
                            })
                        );
                    }
                    return children;
                }
            }
        );
    });

    return {
        ...commonExposed,
        theme,
        obtainChildren
    };
};
export const GroupExpose = [...baseExpose, ...([] as const)];
export type GroupExposeType = (typeof GroupExpose)[number];
