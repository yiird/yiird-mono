import { Ref } from 'vue';
export interface BemKeys {
    modifiers: string;
    elements: Record<string, string>;
}
declare type ElementNames<B> = B extends Record<infer K, unknown> ? K : never;
declare type Modifiers<Em extends Record<string, string>, E> = Em extends Record<infer N, infer U> ? (N extends E ? U : never) : never;
export declare class BemClasses<B extends BemKeys> {
    private __modifiers;
    private __elements;
    private _block;
    private _elements;
    private _cType;
    constructor(cType: string);
    get block(): Ref<string[]>;
    get elements(): Record<ElementNames<B['elements']>, Ref<string>>;
    addModifier(...modifiers: Array<B['modifiers']> | Ref<string>[]): void;
    removeModifier(modifier: B['modifiers']): void;
    addElementModifier(element: ElementNames<B['elements']>, ...modifiers: Array<Modifiers<B['elements'], typeof element>>): void;
    removeElementModifier(element: ElementNames<B['elements']>, ...modifiers: Array<Modifiers<B['elements'], typeof element>>): void;
}
export {};
