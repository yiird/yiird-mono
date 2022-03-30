import { Node } from 'typescript';

export type LoaderOptions = {
	/**
	 * 项目根目录的绝对路径
	 */
	root: string;
	/**
	 * 扫描文件的路径，可以是相对路径相对于 root，也可为绝对路径
	 */
	scanDirs: string[];
	/**
	 * 参与扫描的文件后缀
	 */
	extensions?: Array<'.vue' | '.ts'>;
	/**
	 * 排除指定目录不参与扫描
	 */
	ignore?: string[];
	/**
	 * 外部依赖，此选项可排除外部依赖，不参与检索，比如设置为['lodash']，文件中有 import {isArray} from 'lodash',isArray的注解不会被检索和提取
	 */
	externals?: Array<'vue' | '@vue/*' | string>;
};

export enum InitalizerType {
	DECLARATION,
	IMPORT,
	EXPORT,
	EXPORT_FROM
}

export interface Initalizer {
	kind: InitalizerType;
	name: string;
	root: Node;
	projection?: Node;
}

export interface FromInitalizer {
	from: string;
	importedName: string;
}

export interface RealNode {
	node: Node;
}

export interface DeclarationInitalizer extends Initalizer, RealNode {
	kind: InitalizerType.DECLARATION;
}

export interface ImportInitalizer extends Initalizer, FromInitalizer {
	kind: InitalizerType.IMPORT;
}

export interface ExportInitalizer extends Initalizer, RealNode {
	kind: InitalizerType.EXPORT;
}

export interface ExportFromInitalizer extends Initalizer, FromInitalizer {
	kind: InitalizerType.EXPORT_FROM;
}

export function isDeclarationInitalizer(initalizer: Initalizer): initalizer is DeclarationInitalizer {
	return initalizer.kind === InitalizerType.DECLARATION;
}

export function isImportInitalizer(initalizer: Initalizer): initalizer is ImportInitalizer {
	return initalizer.kind === InitalizerType.IMPORT;
}

export function isExportInitalizer(initalizer: Initalizer): initalizer is ExportInitalizer {
	return initalizer.kind === InitalizerType.EXPORT;
}

export function isExportFromInitalizer(initalizer: Initalizer): initalizer is ExportFromInitalizer {
	return initalizer.kind === InitalizerType.EXPORT_FROM;
}

export interface NormalComment {
	name: string;
	description?: string;
	isPrivate?: boolean;
}

export interface PropComment extends NormalComment {
	default?: unknown;
	type?: string;
	required?: boolean;
	values?: string;
}

export interface MethodComment extends NormalComment {
	syntax?: string[];
	parameters?: ParamComment[];
	returnType?: string;
}

export interface ParamComment extends NormalComment {
	required: boolean;
	type?: string | PropertyComment[];
}

export interface PropertyComment extends NormalComment {
	type?: string | PropertyComment[];
}

export interface CallbackArgComment extends NormalComment {
	type?: string | PropertyComment[];
}

export interface EmitComment extends NormalComment {
	callbackArgs?: CallbackArgComment[];
}

export type SlotComment = EmitComment;

export type OutputOptions = {
	dir: string;
	singleFile?: boolean;
	name?: (name: string) => string;
};
export type MarkdownOptions = {
	output?: OutputOptions;
	transform?: (md: string) => string;
};
export type JsonOptions = {
	output: OutputOptions;
};
export type ExtractOptions = {
	loader: LoaderOptions;
	markdown?: MarkdownOptions;
	json?: JsonOptions;
};

/**
 *
 */
export type Sfc = {
	name: string;
	description?: string;
	props: PropComment[];
	slots: SlotComment[];
	methods: MethodComment[];
	emits: EmitComment[];
};
