import { gold } from '@ant-design/colors';
import { isString } from 'lodash-es';
import { computed, type EmitsOptions, type ExtractPropTypes } from 'vue';
import type { ThemeConfig } from '../types/global';
import type { InternalSetupContext } from '../types/prefab';
import { BaseProps, useTheme } from './prefab';

export const BaseTextProps = {
    ...BaseProps,
    /**
     * 加粗
     */
    strong: Boolean,
    /**
     * 删除线
     */
    delete: Boolean,
    /**
     * 下滑线
     */
    underline: Boolean,
    /**
     * 斜体
     */
    italic: Boolean,
    /**
     * 标记
     */
    mark: [Boolean, String],
    /**
     * 是否是次要文本
     */
    secondary: Boolean,
    /**
     * 是否可选择
     */
    selectable: {
        type: Boolean,
        default: true
    }
};
export type BaseTextPropsType = Readonly<ExtractPropTypes<typeof BaseTextProps>>;

export interface BaseTextTheme extends ThemeConfig {
    bemModifiers?: string[];
    color: string;
    colorMark: string;
}

export const obtainBaseTextTheme = <E extends EmitsOptions, T extends BaseTextTheme>(ctx: InternalSetupContext<BaseTextPropsType, E>, onFlush?: (_theme: T) => T) => {
    const themeConfig = useTheme();
    const { props, commonExposed } = ctx;
    return computed<T>(() => {
        const _themeConfig = themeConfig.value;

        const theme = {
            ..._themeConfig,
            color: props.secondary ? _themeConfig.ye_colorSecondaryText.toString() : _themeConfig.ye_colorPrimaryText.toString(),
            colorMark: isString(props.mark) ? '' : gold[4]
        } as T;

        theme.bemModifiers = [];

        if (props.delete) {
            theme.bemModifiers.push(`${commonExposed.cType__}--delete`);
        }

        if (props.underline) {
            theme.bemModifiers.push(`${commonExposed.cType__}--underline`);
        }
        if (props.strong) {
            theme.bemModifiers.push(`${commonExposed.cType__}--strong`);
        }
        if (props.italic) {
            theme.bemModifiers.push(`${commonExposed.cType__}--italic`);
        }
        if (props.mark) {
            theme.bemModifiers.push(`${commonExposed.cType__}--mark`);
        }

        if (props.selectable) {
            theme.bemModifiers.push(`${commonExposed.cType__}--selectable`);
        }

        return onFlush ? onFlush(theme) : theme;
    });
};

export const useBaseText = <E extends EmitsOptions>(ctx: InternalSetupContext<BaseTextPropsType, E>) => {
    return {};
};
