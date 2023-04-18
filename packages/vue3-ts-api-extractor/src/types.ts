import { SfcComment } from './parser/comment/basic/SfcComment';
import { SfcStructure } from './parser/node/SfcStructure';
import { MdStyles } from './transform/md/Style';
export * from './transform/md/Style';

export type TransResult = {
    comment: SfcComment;
    sfc: SfcStructure;
    value: unknown;
};

export type FileNameCallback = (args: { info: TransResult | TransResult[]; outDir: string; outfilename: string }) => string;

export interface ScannerOptions {
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
     * 监听被扫描目录下的，后缀名包含在 `extensions` 中的所有文件
     */
    watch?: boolean;
}

export interface OutputOptions {
    dir: string;
    single: boolean;
    type: 'markdown' | 'json';
    filename: FileNameCallback;
}

export interface ExtractorOptions {
    /**
     * 项目根目录的绝对路径
     */
    root: string;
    scanner: ScannerOptions;
    output: OutputOptions;
    markdown?: MdOptions;
}

export interface MdOptions {
    styles?: typeof MdStyles;
    hLevelFrom: number;
    // before: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
    // transform: (basicComment: UnionBasicComment, nodeComment: UnionNodeComment) => BasicComment;
    // after: (comment: UnionBasicComment, nodeComment: UnionNodeComment) => string;
}
