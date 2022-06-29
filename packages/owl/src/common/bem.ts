import { forEach, isString } from 'lodash-es';
import { isRef, reactive, ref, Ref, UnwrapNestedRefs, watchEffect } from 'vue';
import { ArrayToTuple } from './type';

export interface BemKeys {
	modifiers: ReadonlyArray<string>;
	elements: Readonly<Record<string, ReadonlyArray<string>>>;
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

type ElementNames<B> = B extends Readonly<Record<infer K, unknown>> ? K : never;

type Modifiers<Em extends Readonly<Record<string, ReadonlyArray<string>>>, E, V = string> = keyof {
	[K in Em extends Readonly<Record<infer N, ReadonlyArray<infer U>>> ? (N extends E ? U : never) : never]: V;
};

export class BemClasses<B extends BemKeys> {
	private __block: B;
	private __modifiers: Ref<Set<string | Ref<string>>> = ref(new Set());
	private __elements: UnwrapNestedRefs<Record<string, Set<string>>> = reactive({});

	private _block: Ref<string[]> = ref([]);
	private _elements: UnwrapNestedRefs<Record<string, string[]>> = reactive({});

	private _prefix: string;
	private _cType: string;
	constructor(prefix: string, cType: string, block: B) {
		this.__block = block;
		this._prefix = prefix;
		this._cType = cType;
		watchEffect(() => {
			this._block.value = [
				`${this._prefix}-${this._cType}`,
				...Array.from(this.__modifiers.value).map((modifier) => {
					let _modifier = modifier;
					if (isRef(modifier)) {
						_modifier = modifier.value;
					}
					return `${this._prefix}-${this._cType}--${_modifier}`;
				})
			];
			forEach(this.__elements, (modifiers, element) => {
				const _modifiers = Array.from(modifiers).map((modifier) => `${this._prefix}-${this._cType}__${element}--${modifier}`);
				this._elements[element] = [`${this._prefix}-${this._cType}__${element}`, ..._modifiers];
			});
		});
	}

	get block() {
		return this._block;
	}

	get elements(): Record<ElementNames<B['elements']>, string[]> {
		return this._elements;
	}

	addModifier(...modifiers: Array<ArrayToTuple<B['modifiers']>> | Ref<string>[]) {
		forEach(modifiers, (modifier) => {
			if (isRef(modifier) || isString(modifier)) {
				this.__modifiers.value.add(modifier);
			}
		});
	}

	removeModifier(modifier: ArrayToTuple<B['modifiers']>) {
		this.__modifiers.value.delete(modifier);
	}

	addElementModifier(options: { element: ElementNames<B['elements']>; modifier: Modifiers<B['elements'], typeof options.element> }) {
		if (!this.__elements[options.element]) {
			this.__elements[options.element] = new Set();
		}
		const set = this.__elements[options.element];
		set.add(options.modifier);
	}

	removeElementModifier(options: { element: ElementNames<B['elements']>; modifier: Modifiers<B['elements'], typeof options.element> }) {
		if (!this.__elements[options.element]) {
			this.__elements[options.element] = new Set();
		}
		const set = this.__elements[options.element];
		set.delete(options.modifier);
	}
}
