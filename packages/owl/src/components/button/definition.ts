import { PropType } from 'vue';
import { BaseProps } from '../../common/logic';
import { ButtonColor, ButtonMode, ButtonShape, ButtonSize } from './type';

export const props = {
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
		default: 'default'
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
		type: String as PropType<ButtonMode>
	}
} as const;

export const cssVars = {
	a: '1',
	b: 'b'
} as const;

export const bemKeys = {
	modifiers: ['shape-rectangle', 'shape-circle', 'shape-square', 'shape-ellipse', 'state-hover', 'state-active', 'state-disabled'],
	elements: {
		text: [],
		icon: []
	}
} as const;
