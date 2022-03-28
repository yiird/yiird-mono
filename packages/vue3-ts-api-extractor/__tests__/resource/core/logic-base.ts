import { forEach } from 'lodash-es';
import { computed, ExtractPropTypes, getCurrentInstance, nextTick, PropType, ref, SetupContext, useCssVars } from 'vue';
import { OComponentInstance, ORawBinding } from '../types';
import { addClass, _cssVar } from '../utils/dom';

export const BaseProps = {
	/**
	 * 组件ID
	 * @prop
	 */
	id: String as PropType<string>,
	/**
	 * 显示 or 隐藏
	 * @prop
	 */
	display: {
		type: Boolean as PropType<boolean>,
		default: true
	}
} as const;

export const FormItemProps = {
	...BaseProps,
	name: {
		type: String as PropType<string>,
		default: true
	},
	value: [String, Boolean, Number, Array] as PropType<string | boolean | number | []>
};

const transformName = (name: string): string => {
	const c = name.charAt(0);
	if (c > 'A' && c < 'Z') {
		name = c.toLowerCase() + name.substr(1);
	}
	return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};
/**
 * 预制函数
 * @param {Xxx} options
 * @returns
 */
export const withPrefab = (options: { props: Readonly<ExtractPropTypes<typeof BaseProps>>; ctx: SetupContext<('aa' | 'bb')[]> }): ORawBinding => {
	const { props } = options;
	//获取组件对象实例
	const internalInstance = getCurrentInstance();

	if (!internalInstance || !internalInstance.type.name) {
		return {} as ORawBinding;
	}

	//生成组件主要样式类名
	const cType__ = transformName(internalInstance.type.name);

	//生成组件ID
	const id__ = (props.id ?? internalInstance.uid) as string;
	//显示状态
	const display__ = computed(() => {
		return (props.display as boolean) ?? true;
	});

	(<OComponentInstance>internalInstance.proxy).cType__ = cType__;

	const arg0 = true;

	const arg1 = {
		a: 1,
		b: 2
	};

	/**
	 * User type definition
	 * @typedef {Object} User
	 * @property {String} email
	 * @property {String} [nickName]
	 */
	/**
	 * aa 事件
	 * @param {Boolean} arg0 - 第一个参数
	 * @param {User} arg1 - 第二个参数
	 */
	options.ctx.emit('aa', arg0, arg1);
	//类样式表
	addClass(cType__);

	// const cssVars__ = reactive(cssVars || {});
	// onMounted(() => {
	// 	proxy.cssVars__[proxy.cType__ + '_' + name] = value;
	// });
	useCssVars((_ctx) => {
		const vars: Record<string, string> = {};
		forEach(_ctx.cssVars__ || {}, (value, key) => {
			vars[key] = value;
		});

		return vars;
	});

	/**
	 * 生成BEM 修饰符类名
	 * @param modifier 修饰符
	 * @returns
	 */
	const bemModifier__ = (modifier: string): string => cType__ + '--' + modifier;
	/**
	 * 生成BEM 元素类名
	 * @param element 元素
	 * @returns
	 */
	const bemElement__ = (element: string): string => cType__ + '__' + element;

	//刷新状态
	const refresh__ = ref(true);

	/**
	 * 刷新组件
	 * @public
	 * @method
	 */
	const domRefresh = () => {
		refresh__.value = false;
		nextTick(() => {
			refresh__.value = true;
		});
	};

	return {
		cType__,
		id__,
		display__,
		refresh__,
		bemModifier__,
		bemElement__,
		addClass,
		cssVar: _cssVar,
		domRefresh
	};
};
