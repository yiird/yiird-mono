export declare type ArrayToTuple<T extends ReadonlyArray<string>, V = string> = keyof {
    [K in T extends ReadonlyArray<infer U> ? U : never]: V;
};
export declare type TshirtSize = `xxs` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl`;
