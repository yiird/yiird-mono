import { forEach, isString, isSymbol, kebabCase } from 'lodash-es';
import { isRef, reactive, ref, watchEffect, type Ref } from 'vue';
import type { UnwrapNestedRefs } from 'vue';

export type BemKeys = {
    modifiers: string;
    elements: {
        [key: string]: string;
    };
};

// type Modifiers<Em extends Record<string, string>, E, V = string> = keyof {
// 	[K in Em extends Record<infer N, infer U> ? (N extends E ? U : never) : never]: V;
// };

type Keys<B extends BemKeys> = keyof B['elements'];
type Values<B extends BemKeys> = B['elements'][Keys<B>];

type RefEs<B extends BemKeys> = { [key in Keys<B>]: Ref<Values<B>> };

export class BemClasses<B extends BemKeys> {
    private __modifiers: Ref<Set<string | Ref<string>>> = ref(new Set());
    // Record<keyof Keys<B>, Set<Values<B>>>
    private __elements: UnwrapNestedRefs<Record<keyof Keys<B>, Set<Values<B>>>> = reactive({});

    private _block: Ref<string[]> = ref([]);
    private _elements: RefEs<B>;

    private _cType: string;

    constructor(cType: string) {
        this._cType = cType;
        const proxyElements = new Proxy({} as RefEs<B>, {
            get(target, property) {
                if (!isSymbol(property) && !property.startsWith('__v') && !target[property]) {
                    target[property] = ref(`${cType}__${kebabCase(property)}`);
                    proxyElements.set(target, property, ref(`${cType}__${kebabCase(property)}`));
                    return target[property];
                } else {
                    return target[property];
                }
            }
        });
        this._elements = proxyElements;
        watchEffect(() => {
            this._block.value = [
                `${this._cType}`,
                ...Array.from(this.__modifiers.value).map((modifier) => {
                    let _modifier = modifier;
                    if (isRef(modifier)) {
                        _modifier = modifier.value;
                    }
                    return _modifier ? `${this._cType}--${_modifier}` : '';
                })
            ];

            forEach(this.__elements, (modifiers, element) => {
                const _modifiers = Array.from(modifiers).map((modifier) => `${this._cType}__${element}--${kebabCase(modifier)}`);
                this._elements[element].value = [`${this._cType}__${kebabCase(element)}`, ..._modifiers].join(' ');
            });
        });
    }

    get block() {
        return this._block;
    }

    get elements(): RefEs<B> {
        return this._elements;
    }

    addModifier(...modifiers: Array<B['modifiers']> | Ref<string>[]) {
        forEach(modifiers, (modifier) => {
            if (isRef(modifier) || (modifier && isString(modifier))) {
                this.__modifiers.value.add(modifier);
            }
        });
    }

    removeModifier(modifier: B['modifiers']) {
        this.__modifiers.value.delete(modifier);
    }

    addElementModifier<Es extends B['elements'], E extends keyof Es>(element: E, ...modifiers: Es extends Record<E, infer M> ? M[] : never) {
        if (!this.__elements[element as string]) {
            this.__elements[element as string] = new Set();
        }

        const set = this.__elements[element as string];
        forEach(modifiers, (modifier) => {
            set.add(modifier);
        });
    }

    removeElementModifier<Es extends B['elements'], E extends keyof Es>(element: E, ...modifiers: Es extends Record<E, infer M> ? M[] : never) {
        const set = this.__elements[element];
        modifiers.forEach((modifier) => {
            set.delete(modifier);
        });
    }
}
