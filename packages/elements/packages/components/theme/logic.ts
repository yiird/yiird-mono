import type { PropType } from 'vue';
import type { UserThemeVars } from '../../types/global';

export const ThemeProps = {
    dark: {
        type: Boolean,
        default: false
    },
    themeVars: {
        type: Object as PropType<UserThemeVars>
    }
} as const;
