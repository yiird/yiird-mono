import { MdStyles } from './transform/md/Style';
export * from './transform/md/Style';
export interface ScannerOptions {
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
    extensions?: Array<string | '.vue' | '.ts'>;
    /**
     * 排除指定目录不参与扫描
     */
    ignore?: string[];
    /**
     * 外部依赖，此选项可排除外部依赖，不参与检索，比如设置为['lodash']，文件中有 import \{isArray\} from 'lodash',isArray的注解不会被检索和提取
     */
    externals?: Array<'vue' | '@vue/*' | string>;
    /**
     * 监听root下的，后缀名包含在 `extensions` 中的所有文件
     */
    watch?: boolean;
}

export interface OutputOptions {
    dir: string;
    single: boolean;
    type: 'markdown' | 'json';
    filename: (filename: string) => string;
}

export interface ExtractorOptions {
    scanner: ScannerOptions;
    output: OutputOptions;
    markdown?: MdOptions;
}

export interface MdOptions {
    styles: typeof MdStyles;
    hLevelFrom: number;
    // before: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
    // transform: (basicComment: UnionBasicComment, nodeComment: UnionNodeComment) => BasicComment;
    // after: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
}
