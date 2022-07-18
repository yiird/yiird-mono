import { IconName } from '@fortawesome/fontawesome-svg-core';
import { PropType } from 'vue';
import { BaseProps } from '../../common/prefab';

export const InputProps = {
	...BaseProps,
	/**
	 * 输入类型
	 */
	type: {
		type: String as PropType<'text' | 'password' | 'date' | 'time' | 'datetime'>,
		default: 'text'
	},
	/**
	 * 提示语
	 */
	placeholder: {
		type: String as PropType<string>
	},
	/**
	 * 文本域前缀图标
	 */
	prefix: {
		type: String as PropType<IconName>
	},
	/**
	 * 文本域后缀图标
	 */
	suffix: {
		type: String as PropType<IconName>
	},
	/**
	 * 前缀文本
	 */
	prefixText: {
		type: String as PropType<string>
	},
	/**
	 * 后缀文本
	 */
	suffixText: {
		type: String as PropType<string>
	},
	/**
	 * 输入的值，绑定前缀、后缀或两者的文本
	 */
	bind: {
		type: String as PropType<'all' | 'prefix' | 'suffix'>
	},
	/**
	 * 圆角
	 */
	radius: {
		type: [Boolean, Number] as PropType<boolean | number>,
		default: true
	},
	/**
	 * 加载状态
	 */
	loading: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	/**
	 * 禁用状态
	 */
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	/**
	 * 禁用状态
	 */
	readonly: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	/**
	 * @private
	 */
	modelValue: {
		type: String as PropType<string>
	}
} as const;

export type InputVariables = {
	color?: string;
	placeholderColor?: string;
	lineHeight?: string;
	borderColor?: string;
	prefixBgColor?: string;
	suffixBgColor?: string;
	radius?: string;
};

export type InputBemKeys = {
	modifiers: 'radius' | 'state-success' | 'state-warning' | 'state-danger';
	elements: {
		input: string;
		prefix: string;
		suffix: string;
		remove: string;
		password: 'show';
		loading: string;
	};
};

export interface EventBinding {
	/**
	 * Dom事件对象
	 */
	event: Event;
	/**
	 * 组件值
	 */
	value: unknown;
}

export {};
