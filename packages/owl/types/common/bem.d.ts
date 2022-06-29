import { Ref } from 'vue';
import { ArrayToTuple } from './type';
export interface BemKeys {
    modifiers: ReadonlyArray<string>;
    elements: Readonly<Record<string, ReadonlyArray<string>>>;
}
declare type ElementNames<B> = B extends Readonly<Record<infer K, unknown>> ? K : never;
declare type Modifiers<Em extends Readonly<Record<string, ReadonlyArray<string>>>, E, V = string> = keyof {
    [K in Em extends Readonly<Record<infer N, ReadonlyArray<infer U>>> ? (N extends E ? U : never) : never]: V;
};
export declare class BemClasses<B extends BemKeys> {
    private __block;
    private __modifiers;
    private __elements;
    private _block;
    private _elements;
    private _prefix;
    private _cType;
    constructor(prefix: string, cType: string, block: B);
    get block(): Ref<string[]>;
    get elements(): Record<ElementNames<B['elements']>, string[]>;
    addModifier(...modifiers: Array<ArrayToTuple<B['modifiers']>> | Ref<string>[]): void;
    removeModifier(modifier: ArrayToTuple<B['modifiers']>): void;
    addElementModifier(options: {
        element: ElementNames<B['elements']>;
        modifier: Modifiers<B['elements'], typeof options.element>;
    }): void;
    removeElementModifier(options: {
        element: ElementNames<B['elements']>;
        modifier: Modifiers<B['elements'], typeof options.element>;
    }): void;
}
export {};
