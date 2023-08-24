import type { ComponentPublicInstance } from 'vue';
import type { CommonExposed } from './prefab';

export type StateColor = `default` | `primary` | `success` | `warn` | `error`;
export type Placement = 'left' | 'right' | 'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

export type FrameworkConfig = {
    header?: number;
    footer?: number;
    left?: number;
    right?: number;
    fixed?: boolean;
};

export type DataStatus = 'default' | 'success' | 'error' | 'warn';

/**
 * 方向
 * `v` : 垂直方向
 * `h` : 水平方向
 */
export type Direction = 'h' | 'v' | (string & { fromT?: any });

/**
 * 方向+逆反方向
 * `v` : 垂直方向
 * `h` : 水平方向
 * `v-reverse` : 垂直逆反方向
 * `h-reverse` : 水平逆反方向
 */
export type DirectionReverse = Direction | 'h-reverse' | 'v-reverse';

/**
 * 相对于参考元素的位置
 */
export type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * 对齐方式
 * `start` : 开始位置
 * `center` : 中间位置
 * `end` : 结束位置
 */
export type Align = 'start' | 'center' | 'end';

/**
 * flex对齐方式
 */
export type FlexAlgin = Align | 'space-between' | 'space-around';

/**
 * 排序方式
 */
export type SortType = 'asc' | 'desc';

/**
 * 单行文本溢出配置
 */
export interface SingleLineEllipsis {
    length?: number;
    suffix?: string;
}

export const isSingleLineEllipsis = (object: any): object is SingleLineEllipsis => {
    return !('rows' in object);
};

/**
 * 多行文本溢出配置
 */
export interface MultiLineEllipsis {
    rows: number;
    suffix?: string;
    expandText?: string;
    collapseText?: string;
}

export const isMultiLineEllipsis = (object: any): object is MultiLineEllipsis => {
    return 'rows' in object;
};

export type YComponentInstance = ComponentPublicInstance & CommonExposed;

export type Writeable<T> = {
    -readonly [K in keyof T]: T[K];
};
