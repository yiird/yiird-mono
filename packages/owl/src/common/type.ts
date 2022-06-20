export type ArrayToTuple<T extends ReadonlyArray<string>, V = string> = keyof {
	[K in T extends ReadonlyArray<infer U> ? U : never]: V;
};
