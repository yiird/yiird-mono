import type { ExtractPropTypes } from 'vue';

export const Props = {
    /**
     * 哈哈啊哈
     */
    name: {
        type: String,
        required: true
    }
} as const;

export type IconProps = ExtractPropTypes<typeof Props>;
