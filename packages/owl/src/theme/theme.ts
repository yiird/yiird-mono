import { forEach, kebabCase } from 'lodash-es';
import { InjectionKey, reactive, UnwrapNestedRefs, watchEffect } from 'vue';

export type Variables = {
	color: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class Theme<Var extends Record<string, string> = {}> {
	/**
	 * css变量
	 */
	private _vars: UnwrapNestedRefs<Var>;
	/**
	 * css前缀
	 */
	private _prefix: string;
	/**
	 * 模块类型
	 */
	private _componentType: string;
	/**
	 * css变量 key前缀
	 */
	private _keyPrefix: string;

	/**
	 *
	 * @param prefix var前缀
	 * @param vars 主题变量
	 * @param mountedDom 被挂在的dom节点
	 */
	constructor(prefix: string, componentType: string, vars?: Var) {
		this._prefix = prefix;
		this._componentType = componentType;
		this._keyPrefix = `--${this._prefix}-${this._componentType}`;
		const _vars: Var = {} as Var;
		forEach(vars, (v, k) => {
			Object.defineProperty(_vars, `${this._keyPrefix}-${kebabCase(k)}`, {
				value: v,
				writable: true,
				enumerable: true,
				configurable: true
			});
		});
		this._vars = reactive(_vars as Var);
	}

	get vars(): UnwrapNestedRefs<Var> {
		return this._vars;
	}

	get prefix() {
		return this._prefix;
	}

	getVar(name: keyof Var) {
		return this._vars[`${this._keyPrefix}-${kebabCase(name.toString())}`];
	}

	setVar(name: keyof Var, value: string) {
		Object.assign(this._vars, {
			[`${this._keyPrefix}-${kebabCase(name.toString())}`]: value
		});
	}

	/**
	 * 挂在皮肤到节点
	 * @param mountedDom 目标节点
	 */
	mountTheme(mountedDom: HTMLElement) {
		watchEffect(() => {
			const vars = this._vars;
			const varKeys = Object.keys(vars);
			for (let i = 0; i < varKeys.length; i++) {
				const varKey = varKeys[i];
				mountedDom.style.setProperty(varKey, this._vars[varKey]);
			}
		});
	}
}

export const ThemeKey = Symbol() as InjectionKey<Theme>;
