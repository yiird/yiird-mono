import { Ref } from 'vue';
import { ArrayToTuple } from './type';
export declare class Block {
    _name: string;
    _modifier: Set<string>;
    constructor(name: string);
    get name(): string;
    get modifier(): Set<string>;
}
export declare class Element {
    _name: string;
    _modifier: Set<string>;
    constructor(name: string);
    get name(): string;
    get modifier(): Set<string>;
}
export declare class Bem<E extends ReadonlyArray<string>> {
    private __block;
    private __elements;
    private _prefix;
    private _block;
    private _elements;
    constructor(prefix: string, block: string, elements?: E);
    block(): Ref<string[]>;
    element(name: ArrayToTuple<E>): Ref<string[]>;
    addModifiers(modifiers: string[], element?: ArrayToTuple<E>): void;
    removeModifiers(modifiers: string[], element?: ArrayToTuple<E>): void;
}
