import { forEach, isString } from 'lodash-es';
import { isRef, reactive, ref, Ref, UnwrapNestedRefs, watchEffect } from 'vue';

export interface BemKeys {
	modifiers: string;
	elements: Record<string, string>;
}

type ElementNames<B> = B extends Record<infer K, unknown> ? K : never;

type Modifiers<Em extends Record<string, string>, E, V = string> = keyof {
	[K in Em extends Record<infer N, infer U> ? (N extends E ? U : never) : never]: V;
};

export class BemClasses<B extends BemKeys> {
	private __modifiers: Ref<Set<string | Ref<string>>> = ref(new Set());
	private __elements: UnwrapNestedRefs<Record<string, Set<string>>> = reactive({});

	private _block: Ref<string[]> = ref([]);
	private _elements: UnwrapNestedRefs<Record<string, string[]>> = reactive({});

	private _cType: string;
	constructor(cType: string) {
		this._cType = cType;
		watchEffect(() => {
			this._block.value = [
				`${this._cType}`,
				...Array.from(this.__modifiers.value).map((modifier) => {
					let _modifier = modifier;
					if (isRef(modifier)) {
						_modifier = modifier.value;
					}
					return `${this._cType}--${_modifier}`;
				})
			];
			forEach(this.__elements, (modifiers, element) => {
				const _modifiers = Array.from(modifiers).map((modifier) => `${this._cType}__${element}--${modifier}`);
				this._elements[element] = [`${this._cType}__${element}`, ..._modifiers];
			});
		});
	}

	get block() {
		return this._block;
	}

	get elements(): Record<ElementNames<B['elements']>, string[]> {
		return this._elements;
	}

	addModifier(...modifiers: Array<B['modifiers']> | Ref<string>[]) {
		forEach(modifiers, (modifier) => {
			if (isRef(modifier) || isString(modifier)) {
				this.__modifiers.value.add(modifier);
			}
		});
	}

	removeModifier(modifier: B['modifiers']) {
		this.__modifiers.value.delete(modifier);
	}

	addElementModifier(element: ElementNames<B['elements']>, ...modifiers: Array<Modifiers<B['elements'], typeof element>>) {
		if (!this.__elements[element]) {
			this.__elements[element] = new Set();
		}
		const set = this.__elements[element];

		forEach(modifiers, (modifier) => {
			set.add(modifier);
		});
	}

	removeElementModifier(element: ElementNames<B['elements']>, ...modifiers: Array<Modifiers<B['elements'], typeof element>>) {
		const set = this.__elements[element];
		modifiers.forEach((modifier) => {
			set.delete(modifier);
		});
	}
}
