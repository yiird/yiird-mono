import type { IconName } from '@fortawesome/fontawesome-common-types';
import type {
    DefineComponent,
    PropType,
    Ref,
    WritableComputedRef,
    ComputedRef,
    ComponentOptionsMixin,
    VNodeProps,
    AllowedComponentProps,
    ComponentCustomProps,
    ExtractPropTypes
} from 'vue';
import { Theme } from '../../theme';
import { TextVariables } from './definition';
/**
 * 文本域
 */
declare const _sfc_main: DefineComponent<
    {
        readonly placeholder: {
            readonly type: PropType<string>;
        };
        readonly prefix: {
            readonly type: PropType<IconName>;
        };
        readonly suffix: {
            readonly type: PropType<IconName>;
        };
        readonly prefixText: {
            readonly type: PropType<string>;
        };
        readonly suffixText: {
            readonly type: PropType<string>;
        };
        readonly bind: {
            readonly type: PropType<'prefix' | 'all' | 'suffix'>;
        };
        readonly radius: {
            readonly type: PropType<number | boolean>;
            readonly default: true;
        };
        readonly modelValue: {
            readonly type: PropType<string>;
        };
        readonly id: {
            type: StringConstructor;
        };
        readonly display: {
            type: BooleanConstructor;
            default: boolean;
        };
    },
    {
        theme: Theme<TextVariables>;
        block: Ref<string[]>;
        elements: Record<'prefix' | 'suffix' | 'input', string[]>;
        obtainValue: WritableComputedRef<unknown>;
        obtainPlaceholder: ComputedRef<string | undefined>;
        obtainHasPrefix: ComputedRef<string | true | undefined>;
        obtainHasSuffix: ComputedRef<string | true | undefined>;
        obtainPrefixIcon: ComputedRef<
            | {
                  icon: IconName;
              }
            | undefined
        >;
        obtainSuffixIcon: ComputedRef<
            | {
                  icon: IconName;
              }
            | undefined
        >;
        obtainPrefixText: ComputedRef<string | undefined>;
        obtainSuffixText: ComputedRef<string | undefined>;
        onBlur: (e: FocusEvent) => void;
        onFocus: (e: FocusEvent) => void;
        id__: string;
        cType__: string;
        display__: Ref<boolean>;
        refresh__: Ref<boolean>;
        domRefresh: () => void;
    },
    unknown,
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    ('update:modelValue' | 'blur' | 'focus')[],
    'update:modelValue' | 'blur' | 'focus',
    VNodeProps & AllowedComponentProps & ComponentCustomProps,
    Readonly<
        ExtractPropTypes<{
            readonly placeholder: {
                readonly type: PropType<string>;
            };
            readonly prefix: {
                readonly type: PropType<IconName>;
            };
            readonly suffix: {
                readonly type: PropType<IconName>;
            };
            readonly prefixText: {
                readonly type: PropType<string>;
            };
            readonly suffixText: {
                readonly type: PropType<string>;
            };
            readonly bind: {
                readonly type: PropType<'prefix' | 'all' | 'suffix'>;
            };
            readonly radius: {
                readonly type: PropType<number | boolean>;
                readonly default: true;
            };
            readonly modelValue: {
                readonly type: PropType<string>;
            };
            readonly id: {
                type: StringConstructor;
            };
            readonly display: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>
    > & {
        'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onFocus?: ((...args: any[]) => any) | undefined;
    },
    {
        readonly display: boolean;
        readonly radius: number | boolean;
    }
>;
export default _sfc_main;
