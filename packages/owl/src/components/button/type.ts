import { TshirtSize } from '../../common/type';

export type ButtonShape = `rectangle` | `circle` | `square` | `ellipse`;
export type ButtonColor = `default` | `primary` | `success` | `warning` | `danger`;
export type ButtonSize = TshirtSize | '1x' | '2x';
export type ButtonMode = 'light' | 'empty' | 'link';
