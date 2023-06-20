import { faLoader } from '@fortawesome/pro-light-svg-icons';
import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { useVModel } from '../../common/composites-vmodel';
import { baseExpose, usePrefab } from '../../common/prefab';
import { BaseInputEmits, BaseInputProps, obtainBaseInputTheme, useBaseInput } from '../../common/prefab-input';
import { sizeToComponentHeight } from '../../config';
import type { ThemeConfig } from '../../types/global';

export interface TextareaEventArgs {
    ev: Event;
    input: any;
}

export const TextareaProps = {
    ...BaseInputProps,
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
        type: Number as PropType<number>
    }
} as const;
export type TextareaPropsType = Readonly<ExtractPropTypes<typeof TextareaProps>>;

export interface TextareaTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const TextareaEmits = {
    ...BaseInputEmits
};

export const setupTextarea = (props: TextareaPropsType, ctx: SetupContext<typeof TextareaEmits>) => {
    const { emit } = ctx;

    const prefab = usePrefab(props);

    const { modelValueRef } = useVModel(emit, {
        model: 'modelValue',
        modifiers: props.modelModifiers
    });

    const internalCtx = { props, prefab, ...ctx };
    const inputPrefab = useBaseInput<typeof TextareaEmits>(internalCtx);
    const { state } = inputPrefab;
    const theme = obtainBaseInputTheme<typeof TextareaEmits>(internalCtx, state, (_theme) => {
        const height = sizeToComponentHeight(_theme, props.size);
        const rowSpan = props.rowSpan;
        const rowGap = props.rowGap || _theme.ye_gap;
        _theme.size.height = `${height * rowSpan + rowGap * (rowSpan - 1)}px`;
        return _theme;
    });

    return {
        ...prefab,
        ...inputPrefab,
        theme,
        modelValueRef,
        faLoader
    };
};
export const TextareaExpose = [...baseExpose];
