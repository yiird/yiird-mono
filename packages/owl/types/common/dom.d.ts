import type { ComponentOptionsBase, ComponentPublicInstance, Ref } from 'vue';
export declare const splitSize: (cssStr: string) =>
    | {
          num: number;
          unit: string;
      }
    | undefined;
export declare const toRealType: (value?: unknown) => unknown;
export declare const isVueComponentInstance: (
    obj: unknown
) => obj is ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
export declare const checkClickOnElements: (els: Array<Ref<HTMLElement | undefined>>, callback: (flag: boolean) => void) => (event: MouseEvent) => void;
export {};
