import type { IconDefinition, IconName, IconPack } from '@fortawesome/fontawesome-svg-core';
import type { NumberSize } from './theme';

export type IconRotation = 90 | 180 | 270 | '90' | '180' | '270';
export type IconFlip = 'horizontal' | 'vertical' | 'both';
export type IconDefinitionOrPack = IconDefinition | IconPack;
export type IconNameOrDefinition = IconDefinition | IconPack | IconName;
export type IconSize = `2xs` | `xs` | `sm` | `lg` | `xl` | `2xl` | NumberSize;
export type IconAnimation = 'beat' | 'fade' | 'beat-fade' | 'bounce' | 'flip' | 'shake' | 'spin' | 'spin-pulse' | 'spin-reverse' | 'spin-pulse-reverse';

export interface SelectIcons {
    /**
     * 选中状态图标
     */
    checked?: IconNameOrDefinition;
    /**
     * 为选中状态图标
     */
    notChecked?: IconNameOrDefinition;
}
