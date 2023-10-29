import { faSquare, faSquareCheck } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, toRefs, type EmitsOptions, type ExtractPropTypes, type PropType, type SetupContext, type UnwrapNestedRefs } from 'vue';
import { FormItemSelectedProps } from '../../common/common-form';
import type { LabelValue } from '../../common/common-source';
import { baseExpose, usePrefab, useTheme } from '../../common/prefab';
import type { SelectIcons } from '../../types/components';
import type { CheckboxEventArgs } from '../../types/event';
import type { DataStatus, ThemeConfig } from '../../types/global';
import type { InternalSetupContext } from '../../types/prefab';
export const CheckboxProps = {
    ...FormItemSelectedProps,
    source: {
        type: Array as PropType<LabelValue[]>
    },
    icons: {
        type: Object as PropType<SelectIcons>,
        default(props: any) {
            return props.multi
                ? {
                      checked: faSquareCheck,
                      notChecked: faSquare
                  }
                : {
                      checked: faSquareCheck,
                      notChecked: faSquare
                  };
        }
    }
} as const;
export type CheckboxPropsType = Readonly<ExtractPropTypes<typeof CheckboxProps>>;

export type CheckboxState = {
    focus: boolean;
    status: DataStatus;
    readonly: boolean;
    disabled: boolean;
};

export interface CheckboxTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const CheckboxEmits = {
    /**
     * @private
     */
    'update:modelValue': null,
    /**
     * Change事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change(args: CheckboxEventArgs) {
        return true;
    },
    /**
     * 焦点事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus(args: CheckboxEventArgs) {
        return true;
    },
    /**
     * 失去事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(args: CheckboxEventArgs) {
        return true;
    }
};

const obtainTheme = <E extends EmitsOptions>(ctx: InternalSetupContext<CheckboxPropsType, E>, state: UnwrapNestedRefs<CheckboxState>) => {
    const themeConfig = useTheme();
    const {
        commonExposed: { cType__ }
    } = ctx;

    const { readonly, disabled, status } = toRefs(state);

    const bemModifiers = computed(() => {
        const modifiers = [];

        if (readonly.value) {
            modifiers.push(`${cType__}--readonly`);
        }

        if (disabled.value) {
            modifiers.push(`${cType__}--disabled`);
        }

        return modifiers;
    });

    return computed<CheckboxTheme>(() => {
        const _themeConfig = themeConfig.value;

        const theme: CheckboxTheme = {
            ..._themeConfig
        };

        theme.bemModifiers = bemModifiers.value;

        return theme;
    });
};

export const setupCheckbox = (props: CheckboxPropsType, ctx: SetupContext<typeof CheckboxEmits>) => {
    const { emit } = ctx;
    const commonExposed = usePrefab(props);

    const state = reactive<CheckboxState>({
        focus: false,
        status: props.status,
        readonly: props.readonly,
        disabled: props.disabled
    });

    const theme = obtainTheme<typeof CheckboxEmits>({ props, commonExposed, ...ctx }, state);

    const obtainCheckIcon = computed(() => {
        return props.icons.checked;
    });

    const obtainSource = computed(() => {
        return props.source?.map((item) => {
            return {
                ...item,
                checked: false
            };
        });
    });

    /**
     * @private
     */
    const doFocus_ = (ev: Event) => {
        state.focus = true;
    };

    /**
     * @private
     */
    const doBlur_ = (ev: Event) => {
        state.focus = false;
    };

    return {
        ...commonExposed,
        theme,
        obtainSource,
        obtainCheckIcon,
        doFocus_,
        doBlur_
    };
};
export const CheckboxExpose = [...baseExpose, ...([] as const)];
export type CheckboxExposeType = (typeof CheckboxExpose)[number];
