import { PropType } from 'vue';
import { BaseProps } from '../../common/logic';

export const props = {
	...BaseProps,
	/**
	 * 尺寸
	 * @values `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , `xxl`
	 */
	size: {
		type: String as PropType<`xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl`>,
		default: 'md',
		validator: (value: string) => {
			// 这个值必须匹配下列字符串中的一个
			return ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1;
		}
	},
	/**
	 * 颜色
	 */
	color: {
		type: String as PropType<`default` | `primary` | `success` | `warning` | `danger`>,
		default: 'default',
		validator: (value: string) => {
			// 这个值必须匹配下列字符串中的一个
			return ['default', 'primary', 'success', 'warning', 'danger'].indexOf(value) !== -1;
		}
	},
	/**
	 * 形状可选
	 */
	shape: {
		type: String as PropType<`rectangle` | `circle` | `square` | `ellipse`>,
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
		type: String as PropType<'light' | 'empty' | 'link'>,
		validator: (value: string) => {
			// 这个值必须匹配下列字符串中的一个
			return ['light', 'empty', 'link'].indexOf(value) !== -1;
		}
	}
} as const;

export const cssVars = {
	a: '1',
	b: 'b'
} as const;

export const elements = ['text'] as const;
