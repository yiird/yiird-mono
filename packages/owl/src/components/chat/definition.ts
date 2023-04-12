import { BaseProps } from '../../common/prefab';

export type ChatVariables = {};

export const ChatProps = {
	...BaseProps
} as const;

export type ChatBemKeys = {
	modifiers: never;
	elements: {};
};
