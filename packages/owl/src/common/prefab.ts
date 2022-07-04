import { kebabCase } from 'lodash-es';
import { computed, ExtractPropTypes, getCurrentInstance, nextTick, ref, Ref, SetupContext } from 'vue';
import { Variables } from '../theme/theme';
import { BemKeys } from './bem';

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
export type OCommonOptions<P> = {
	props: Readonly<ExtractPropTypes<P>>;
	ctx: SetupContext;
};

export type OCommonPrefab = {
	id__: string;
	cType__: string;
	display__: Ref<boolean>;
	refresh__: Ref<boolean>;
	domRefresh: () => void;
};
export const usePrefab = <V extends Variables, B extends BemKeys>(options: OCommonOptions<typeof BaseProps>): OCommonPrefab => {
	const { props, ctx } = options;
	//获取组件对象实例
	const internalInstance = getCurrentInstance();

	if (!internalInstance || !internalInstance.type.name) {
		return {} as OCommonPrefab;
	}

	//生成组件主要样式类名
	const cType__ = kebabCase(internalInstance.type.name);

	//生成组件ID
	const id__ = (props.id ?? internalInstance.uid) as string;

	//显示状态
	const display__ = computed(() => {
		return (props.display as boolean) ?? true;
	});

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
		refresh__,
		domRefresh
	};
};

export {};
