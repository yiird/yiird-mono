import { forEach, kebabCase } from 'lodash-es';
import { InjectionKey, nextTick, reactive, UnwrapNestedRefs, watchEffect } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Variables = Record<string, string | undefined>;

export type GlobalVariables = {
	// 字体
	fontFamily: string;
	// 基础字体大小
	fontRemBaseSize: string;

	/*----------颜色-----------*/
	/** 文字颜色 */
	colorTextPrimary: string;
	colorTextSecondary: string;
	colorTextLight: string;
	colorTextLightest: string;

	/** 主体色 */
	colorPrimary: string;
	/** 功能色 */
	colorSuccess: string;
	colorWarning: string;
	colorDanger: string;
	colorInfo: string;

	/** 边框色 */
	colorBorderPrimary: string;
	colorBorderSecondary: string;
	colorBorderLight: string;
	colorBorderLightest: string;

	/** 背景色 */
	//不透明-白
	colorBgOpaque: string;
	colorBgBlack: string;
	//透明
	colorBgTransparent: string;

	/*----------尺寸-----------*/

	/*----------高度-----------*/
	sizeBase: string;
	sizeXxs: string;
	sizeXs: string;
	sizeSm: string;
	sizeMd: string;
	sizeLg: string;
	sizeXl: string;
	sizeXxl: string;
	size1x: string;
	size2x: string;
	size3x: string;
	size4x: string;
	size5x: string;
	size6x: string;
	size7x: string;
	size8x: string;
	size9x: string;
	size10x: string;

	/*----------shadow-----------*/
	boxShadowHighUp: string;
	boxShadowHighDown: string;
	boxShadowHighLeft: string;
	boxShadowHighRight: string;
	boxShadowMiddleUp: string;
	boxShadowMiddleDown: string;
	boxShadowMiddleLeft: string;
	boxShadowMiddleRight: string;
	boxShadowLowUp: string;
	boxShadowLowDown: string;
	boxShadowLowLeft: string;
	boxShadowLowRight: string;
};

export class Theme<V extends Variables> {
	private __originVars: UnwrapNestedRefs<{
		-readonly [key in keyof V]?: string;
	}>;
	/**
	 * css变量
	 */
	private _vars: Record<string, string | undefined> = reactive({});
	private _varNames: Record<string, string> = Object.create({});
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
	 */
	constructor(componentType: string, vars?: V) {
		this.__originVars = vars ? reactive(vars) : reactive(Object.create({}));
		this._componentType = componentType;
		this._keyPrefix = `--${this._componentType}`;

		watchEffect(
			() => {
				forEach(this.__originVars, (value, name) => {
					const varName = `${this._keyPrefix}-${kebabCase(name.toString())}`;
					this._vars[varName] = value;
					this._varNames[name] = varName;
				});
			},
			{
				flush: 'sync'
			}
		);
	}

	public get originVars() {
		return this.__originVars;
	}

	public get vars(): UnwrapNestedRefs<object> {
		return this._vars;
	}

	public get namedVars(): Record<keyof V, string> {
		return this._varNames as Record<keyof V, string>;
	}

	public get varNames() {
		return this._varNames;
	}

	mount(dom?: Document | HTMLElement) {
		nextTick(() => {
			watchEffect(
				() => {
					if (!dom) {
						dom = globalThis.document;
					}
					if (dom) {
						if (dom instanceof Document) {
							const cssList = [];
							cssList.push(':root{\n');
							forEach(this.vars, (value, name) => {
								cssList.push(`${name}:${value};\n`);
							});
							cssList.push('}\n');
							const cssText = cssList.join('');

							const themeStyleElement = dom.querySelector<HTMLStyleElement>('style[role="owl-theme"]');
							if (themeStyleElement) {
								themeStyleElement.textContent = cssText;
							} else {
								const styleTag = dom.createElement('style');
								styleTag.setAttribute('role', 'owl-theme');
								styleTag.textContent = cssText;
								dom.head.insertAdjacentElement('afterbegin', styleTag);
							}
						} else if (dom instanceof HTMLElement) {
							forEach(this.vars, (value, name) => {
								(dom as HTMLElement).style.setProperty(name, value);
							});
						}
					}
				},
				{
					flush: 'pre'
				}
			);
		});
	}
}

// export type BemStyles<M = []> = M extends ReadonlyArray<string>
// 	? {
// 			styles?: string | CSSProperties | { [key in keyof CSSProperties]: string | ((props: unknown) => string | CSSProperties[key]) };
// 			modifiers?: Record<ArrayToTuple<M>, string | CSSProperties | { [key in keyof CSSProperties]: string | ((props: unknown) => string | CSSProperties[key]) }>;
// 	  }
// 	: never;

// export type BemBlock<B> = B extends Readonly<{ modifiers: infer BM; elements: Record<infer Keys, infer Modifiers> }>
// 	? BemStyles<BM> & {
// 			block: string | ((props: unknown) => string);
// 			elements?: {
// 				[key in Keys]: BemStyles<Modifiers>;
// 			};
// 	  }
// 	: never;

// export const defineBem = <B extends BemBlock<Readonly<{ modifiers: ReadonlyArray<string>; elements: Record<string, ReadonlyArray<string>> }>>>(config: B): B => {
// 	return config;
// };

export const GlobalThemeKey = Symbol('o-global-theme') as InjectionKey<Theme<GlobalVariables>>;

export const useTheme = <V extends Variables>(componentType: string, vars?: V) => {
	const theme: {
		originVars: UnwrapNestedRefs<{
			-readonly [key in keyof V]?: string;
		}>;
		vars: UnwrapNestedRefs<Record<string, string | undefined>>;
		varNames: Record<string, string>;
	} = {
		originVars: vars ? reactive(vars) : reactive(Object.create({})),
		vars: reactive({}),
		varNames: {}
	};

	const keyPrefix = `--${componentType}`;

	watchEffect(() => {
		forEach(theme.originVars, (value, name) => {
			const varName = `${keyPrefix}-${kebabCase(name.toString())}`;
			theme.vars[varName] = value;
			theme.varNames[name] = varName;
		});
	});
	return theme;
};
