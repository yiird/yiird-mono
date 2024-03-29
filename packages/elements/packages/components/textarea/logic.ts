import { faLoader } from '@fortawesome/pro-light-svg-icons';
import { computed, reactive, unref, type ExtractPropTypes, type PropType, type SetupContext } from 'vue';
import { FormItemTextProps, obtainFormItemTheme, useTextCounter, useVModel, type FormItemState } from '../../common/common-form';
import { baseExpose, usePrefab } from '../../common/prefab';
import { sizeToComponentHeight, sizeToGap } from '../../config';
import type { FormItemEventArgs } from '../../types/event';
import type { Size } from '../../types/global';

export const TextareaProps = {
    ...FormItemTextProps,
    /**
     * 跨越行数
     */
    rowSpan: {
        type: Number as PropType<number>,
        default: 2
    },
    /**
     * 行间距
     */
    rowGap: {
        type: [String, Number] as PropType<Size>,
        default: 'md'
    }
} as const;
export type TextareaPropsType = Readonly<ExtractPropTypes<typeof TextareaProps>>;

export const TextareaEmits = {
    /**
     * @private
     */
    'update:modelValue': null,
    /**
     * Change事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change(args: FormItemEventArgs) {
        return true;
    },
    /**
     * 焦点事件
     * @param args
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus(args: FormItemEventArgs) {
        return true;
    },
    /**
     * 失去事件
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur(args: FormItemEventArgs) {
        return true;
    },
    /**
     * Input事件
     * @param args 参数
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input(args: FormItemEventArgs) {
        return true;
    }
};

export const setupTextarea = (props: TextareaPropsType, ctx: SetupContext<typeof TextareaEmits>) => {
    const { emit } = ctx;
    const state = reactive<FormItemState>({
        status: props.status,
        readonly: props.readonly,
        disabled: props.disabled
    });

    const commonExposed = usePrefab(props);

    const { el } = commonExposed;

    const { value } = useVModel(emit, props);

    const internalCtx = { props, commonExposed, ...ctx };

    const obtainTextCounter = useTextCounter<typeof TextareaEmits>(internalCtx);

    const theme = obtainFormItemTheme(internalCtx, state, (_theme) => {
        const height = sizeToComponentHeight(_theme, props.size);
        const rowSpan = props.rowSpan;
        const rowGap = sizeToGap(_theme, props.rowGap);
        _theme.size.height = `${height * rowSpan + rowGap * (rowSpan - 1)}px`;
        return _theme;
    });

    const obtainPrefabAffixies = computed(() => {
        return props.loading || props.showCounter;
    });

    /**
     * @private
     */
    const _eventArgs = (inputValue: any) => {
        return {
            el: unref(el),
            value: inputValue
        };
    };

    /**
     * 滚动到底部
     */
    const scrollToBottom = () => {
        const textarea = el.value.querySelector('textarea');
        if (textarea) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    };

    /**
     * @private
     */
    const doFoucs_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * focus 事件
             *
             * @param {FormItemEventArgs} arg0 事件参数
             *
             */
            emit('focus', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doBlur_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * blur 事件
             *
             * @param {FormItemEventArgs} arg0 事件参数
             *
             */
            emit('blur', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doChange_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * change 事件
             *
             * @param {FormItemEventArgs} arg0 事件参数
             *
             */
            emit('change', _eventArgs(target.value));
        }
    };

    /**
     * @private
     */
    const doInput_ = (ev: Event) => {
        const target = ev.target;
        if (target instanceof HTMLInputElement) {
            /**
             * input 事件
             *
             * @param {FormItemEventArgs} arg0 事件参数
             *
             */
            emit('input', _eventArgs(target.value));
        }
    };

    return {
        ...commonExposed,
        theme,
        value,
        faLoader,
        obtainPrefabAffixies,
        obtainTextCounter,
        scrollToBottom,
        doFoucs_,
        doBlur_,
        doChange_,
        doInput_
    };
};

export const TextareaExpose = [...baseExpose, ...(['scrollToBottom'] as const)];
export type TextareaExposeType = (typeof TextareaExpose)[number];
