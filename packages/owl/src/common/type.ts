import { ExtractPropTypes } from 'vue';

export type ArrayToTuple<T extends ReadonlyArray<string>, V = string> = keyof {
	[K in T extends ReadonlyArray<infer U> ? U : never]: V;
};

export type TshirtSize = `xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl`;
export type NumberSize = `1x` | `2x` | `3x` | `4x` | `5x` | `6x` | `7x` | `8x` | `9x` | `10x`;

type NotReadonly<O> = {
	-readonly [key in keyof O]: O[key];
};

export type ExtractPropsType<P> = Partial<NotReadonly<ExtractPropTypes<P>>>;
