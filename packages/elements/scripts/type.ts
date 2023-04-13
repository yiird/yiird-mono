import type { LibraryOptions } from 'vite';

export type EntryInfo = {
	paramLibDir?: string;
	paramLibName?: string;
	outDir: string;
} & LibraryOptions;
