import { PropType } from 'vue';
import { BaseProps } from '../../common/prefab';

import { NumberSize, TshirtSize } from '../../common/type';

export type ButtonShape = `rectangle` | `circle` | `square` | `ellipse`;
export type ButtonColor = `info` | `primary` | `success` | `warning` | `danger`;
export type ButtonSize = TshirtSize | NumberSize;
export type ButtonMode = 'normal' | 'light' | 'empty' | 'link' | 'apple';

export type ButtonVariables = {
	bgColor: string;
	textColor: string;
};

export const ButtonProps = {
	...BaseProps,
	/**
	 * 尺寸
	 */
	size: {
		type: String as PropType<ButtonSize>,
		default: 'md'
	},
	/**
	 * 颜色
	 */
	color: {
		type: String as PropType<ButtonColor>,
		default: 'primary'
	},
	/**
	 * 文本颜色
	 */
	textColor: {
		type: String as PropType<string>
	},
	/**
	 * 形状可选
	 */
	shape: {
		type: String as PropType<ButtonShape>,
		default: 'rectangle'
	},
	/**
	 * 是否禁用按钮
	 */
	disabled: {
		type: Boolean,
		default: false
	},
	/**
	 * 模式
	 */
	mode: {
		type: String as PropType<ButtonMode>,
		default: 'normal'
	}
} as const;

export type ButtonBemKeys = {
	modifiers:
		| 'shape-rectangle'
		| 'shape-circle'
		| 'shape-square'
		| 'shape-ellipse'
		| 'mode-light'
		| 'mode-empty'
		| 'mode-link'
		| 'state-hover'
		| 'state-active'
		| 'state-disabled';
	elements: {
		text: string;
		icon: string;
	};
};
