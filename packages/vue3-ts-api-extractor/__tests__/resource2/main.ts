/* eslint-disable @typescript-eslint/no-empty-function */
import vue from 'vue';
import * as O from './other';
import Other, { Other1, Other2 as Some } from './other';
console.log(vue, Other, Other1, Some, O);
const a = 1,
	b = 2;
const mm = 1;
function fn1() {}

export const obj1 = {};

export const fn3 = () => {
	const obj_1 = {
		a: 1,
		b: 1
	};
};

export function fn4() {}

export * as O from './other';
export { a as cc, b };

export class Ssss {
	static aa() {}
}
type A = number;

export const c = a as A;
export default mm;
