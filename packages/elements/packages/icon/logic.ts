import type { ExtractPropTypes } from 'vue';

export const Props = {
    name: {
        type: String,
        required: true
    }
} as const;

export type IconProps = ExtractPropTypes<typeof Props>;
