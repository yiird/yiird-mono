import kebabCase from 'lodash-es/kebabCase';
import { computed, ExtractPropTypes, getCurrentInstance, inject, nextTick, ref, Ref, SetupContext } from 'vue';
import { Theme, ThemeKey } from '../theme/theme';
import { BemClasses } from './bem';

export const BaseProps = {
	id: {
		type: String
	},
	display: {
		type: Boolean,
		default: true
	}
};

/**
 * 组件setup预制方法参数定义
 */
export type OCommonOptions<P, V extends Record<string, string>, E extends ReadonlyArray<string>> = {
	props: Readonly<ExtractPropTypes<P>>;
	ctx: SetupContext;
	cssVars?: V;
	elements?: E;
};

export type OCommonPrefab<V extends Record<string, string>, E extends ReadonlyArray<string>> = {
	id__: string;
	cType__: string;
	display__: Ref<boolean>;
	refresh__: Ref<boolean>;
	bem__: BemClasses<E>;
	theme__: Theme<V>;
	domRefresh: () => void;
};

export const useCommon = <V extends Record<string, string>, E extends ReadonlyArray<string>>(options: OCommonOptions<typeof BaseProps, V, E>): OCommonPrefab<V, E> => {
	const { props, cssVars, elements, ctx } = options;
	//获取组件对象实例
	const internalInstance = getCurrentInstance();

	if (!internalInstance || !internalInstance.type.name) {
		return {} as OCommonPrefab<V, E>;
	}

	//生成组件主要样式类名
	const cType__ = kebabCase(internalInstance.type.name);

	//生成组件ID
	const id__ = (props.id ?? internalInstance.uid) as string;

	//显示状态
	const display__ = computed(() => {
		return (props.display as boolean) ?? true;
	});

	const globalTheme = inject(ThemeKey);

	const theme__ = new Theme<V>(globalTheme?.prefix || 'o', cType__, cssVars);

	const bem__ = new BemClasses(globalTheme?.prefix || 'o', cType__, elements);

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
		id__,
		cType__,
		display__,
		theme__,
		refresh__,
		domRefresh,
		bem__
	};
};

export {};
