import { PropType } from 'vue';
import { BaseProps } from '../../common/prefab';

export const TimeProps = {
    ...BaseProps,
    format: {
        type: String as PropType<string>,
        default: 'yyyy-MM-dd'
    },
    /**
     * @private
     */
    modelValue: {
        type: String as PropType<string>
    }
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type TimeVariables = {};

export type TimeBemKeys = {
    modifiers: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    elements: {};
};

export interface TimeHour {
    hourNum: number;
    isCurrent: boolean;
    text: string;
    classes: Array<string>;
}
export {};
