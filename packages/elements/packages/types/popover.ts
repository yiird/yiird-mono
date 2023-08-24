import type { ComponentPublicInstance } from 'vue';
import type { EventArgs } from './event';
import type { CommonExposed } from './prefab';

export type PopoverReference = Element | ComponentPublicInstance | CommonExposed | string;

export type PoppoverMode = 'manual' | 'click' | 'hover' | 'click-out' | 'click-leave';

export interface PopoverEventArgs extends EventArgs {
    flag: boolean;
}
