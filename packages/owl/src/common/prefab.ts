import { kebabCase } from 'lodash-es';
import { computed, type ExtractPropTypes, getCurrentInstance, type InjectionKey, nextTick, ref, type Ref } from 'vue';
import { Theme, type Variables } from '../theme';
import { BemClasses, type BemKeys } from './bem';

export const BaseProps = {
	/**
	 * 组件id，若不设置会自动生成
	 */
	id: {
		type: String
	},
	/**
	 * 显示隐藏
	 */
	display: {
		type: Boolean,
		default: true
	}
};

export type OCommonPrefab<V extends Variables, B extends BemKeys> = {
	id__: string;
	cType__: string;
	display__: Ref<boolean>;
	refresh__: Ref<boolean>;
	theme: Theme<V>;
	bem: BemClasses<B>;
	block: Ref<string[]>;
	domRefresh: () => void;
};
export const usePrefab = <V extends Variables, B extends BemKeys = BemKeys>(props: any): OCommonPrefab<V, B> => {
	//获取组件对象实例
	const internalInstance = getCurrentInstance();

	if (!internalInstance || !internalInstance.type.name) {
		return {} as OCommonPrefab<V, B>;
	}

	//生成组件主要样式类名
	const cType__ = kebabCase(internalInstance.type.name);

	//生成组件ID
	const id__ = cType__ + '-' + (props.id ?? internalInstance.uid);

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

	const theme = new Theme<V>(cType__);
	const bem = new BemClasses<B>(cType__);

	return {
		id__,
		cType__,
		display__,
		refresh__,
		theme,
		bem,
		block: bem.block,
		domRefresh
	};
};

export const GlobalPopperWrapKey = Symbol('o-global-popper-wrap-key') as InjectionKey<string>;

export {};
