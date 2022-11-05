import { findIconDefinition, IconDefinition, IconName, IconPrefix, library } from '@fortawesome/fontawesome-svg-core';
import { isObject, isString } from 'lodash-es';
import { PropType } from 'vue';
import { BaseProps } from '../../common/prefab';
import { NumberSize, TshirtSize } from '../../common/type';
import { isIconDefinition } from '../../common/util';

export type InputSize = TshirtSize | NumberSize;

export interface InputIcon {
	icon: IconName;
	prefix?: IconPrefix;
}

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
	 * 尺寸
	 */
	size: {
		type: String as PropType<InputSize>,
		default: 'md'
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
		type: [String, Object] as PropType<IconName | IconDefinition | InputIcon>
	},
	/**
	 * 文本域后缀图标
	 */
	suffix: {
		type: String as PropType<IconName | IconDefinition | InputIcon>
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
	radius?: string;
};

export type InputBemKeys = {
	modifiers: 'focus' | 'radius' | 'state-success' | 'state-warning' | 'state-danger';
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

export const getIcon = (icon: IconName | IconDefinition | InputIcon) => {
	if (isObject(icon)) {
		if (isIconDefinition(icon)) {
			if (!findIconDefinition(icon)) {
				library.add(icon);
			}
			return {
				icon: icon.iconName,
				prefix: icon.prefix
			};
		} else {
			return icon;
		}
	} else if (isString(icon)) {
		return {
			icon
		};
	}
};
export {};