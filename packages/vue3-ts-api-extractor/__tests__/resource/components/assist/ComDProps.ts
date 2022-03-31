import { PropType } from 'vue';
import { BaseProps } from './BaseProps';
export interface Some {
	a: string;
}
export const ComDProps = {
	...BaseProps,
	/**
	 * 按钮尺寸
	 * @default `md`
	 * @private
	 * @values `xl`,`md`,`sm`
	 */
	size: String as PropType<string>,
	/**
	 * 颜色
	 *
	 * @values `red`,`green`
	 */
	color: {
		type: String as PropType<string>,
		required: true,
		default: 'red'
	},
	other: {
		type: Object as PropType<Some>
	}
} as const;
