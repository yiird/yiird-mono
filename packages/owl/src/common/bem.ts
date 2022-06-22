import forEach from 'lodash-es/forEach';
import { computed, ref, Ref } from 'vue';
import { ArrayToTuple } from './type';

export class Block {
	_name: string;
	_modifier: Set<string>;
	constructor(name: string) {
		this._name = name;
		this._modifier = new Set();
	}

	get name() {
		return this._name;
	}

	get modifier() {
		return this._modifier;
	}
}

export class Element {
	_name: string;
	_modifier: Set<string>;
	constructor(name: string) {
		this._name = name;
		this._modifier = new Set();
	}

	get name() {
		return this._name;
	}

	get modifier() {
		return this._modifier;
	}
}

export class BemClasses<E extends ReadonlyArray<string>> {
	private __block: Ref<Block>;
	private __elements: Record<string, Ref<Element>> = {};

	private _prefix: string;
	private _block: Ref<string[]>;
	private _elements: Record<string, Ref<string[]>> = {};

	constructor(prefix: string, block: string, elements?: E) {
		this._prefix = prefix;

		this.__block = ref(new Block(block));

		if (elements) {
			elements.forEach((element) => {
				this.__elements[element] = ref(new Element(element));
			});
		}

		this._block = computed(() => {
			const blockName = this._prefix + '-' + this.__block.value.name;
			return [blockName, ...Array.from(this.__block.value.modifier).map((m) => `${blockName}--${m}`)];
		});

		forEach(this.__elements, (element, name) => {
			this._elements[name] = computed(() => {
				const blockName = this.__block.value.name;
				const elementName = `${this._prefix}-${blockName}__${element.value.name}`;
				return [elementName, ...Array.from(element.value.modifier).map((m) => `${elementName}--${m}`)];
			});
		});
	}

	block() {
		return this._block;
	}

	element(name: ArrayToTuple<E>) {
		return this._elements[name];
	}

	addModifiers(modifiers: string[], element?: ArrayToTuple<E>) {
		let target: Set<string>;
		if (element) {
			target = this.__elements[element].value.modifier;
		} else {
			target = this.__block.value.modifier;
		}
		modifiers.forEach((modifier) => {
			target.add(modifier);
		});
	}

	removeModifiers(modifiers: string[], element?: ArrayToTuple<E>) {
		let target: Set<string>;
		if (element) {
			target = this.__elements[element].value.modifier;
		} else {
			target = this.__block.value.modifier;
		}

		modifiers.forEach((modifier) => {
			target.delete(modifier);
		});
	}
}

//new Bem('aa', ['a1', 'a2'] as const).aa();
