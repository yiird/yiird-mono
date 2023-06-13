import { faLoader } from '@fortawesome/pro-light-svg-icons';
import type { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { useVModel } from '../../common/composites-vmodel';
import { baseExpose, usePrefab } from '../../common/prefab';
import { InputEmits, InputProps, obtainInputTheme, useInput } from '../../common/prefab-text';
import { sizeToHeight } from '../../config';
import type { ThemeConfig } from '../../types/global';

export interface LongtextEventArgs {
    ev: Event;
    input: any;
}

export const LongtextProps = {
    ...InputProps,
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
    rowGutter: {
        type: Number as PropType<number>
    }
} as const;
export type LongtextPropsType = Readonly<ExtractPropTypes<typeof LongtextProps>>;

export interface LongtextTheme extends ThemeConfig {
    bemModifiers?: string[];
}

export const LongtextEmits = {
    ...InputEmits
};

export const setupLongtext = (props: LongtextPropsType, ctx: SetupContext<typeof LongtextEmits>) => {
    const { emit } = ctx;

    const prefab = usePrefab(props);

    const { modelValueRef } = useVModel(emit, {
        model: 'modelValue',
        modifiers: props.modelModifiers
    });

    const internalCtx = { props, prefab, ...ctx };
    const inputPrefab = useInput<typeof LongtextEmits>(internalCtx);
    const { state } = inputPrefab;
    const theme = obtainInputTheme<typeof LongtextEmits>(internalCtx, state, (config) => {
        const height = sizeToHeight(config, props.size);
        const rowSpan = props.rowSpan;
        const rowGutter = props.rowGutter || config.ye_gutter;
        config.size.height = `${height * rowSpan + rowGutter * (rowSpan - 1)}px`;
        return config;
    });

    return {
        ...prefab,
        ...inputPrefab,
        theme,
        modelValueRef,
        faLoader
    };
};
export const LongtextExpose = [...baseExpose];
