export function hash(text: string) {
	'use strict';

	let hash = 5381,
		index = text.length;

	while (index) {
		hash = (hash * 33) ^ text.charCodeAt(--index);
	}

	return hash >>> 0;
}
