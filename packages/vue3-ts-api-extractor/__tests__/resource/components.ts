import { OButton } from './packages';

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		OButton: typeof OButton;
	}
}

export {};
