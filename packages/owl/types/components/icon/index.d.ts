import { IconDefinition, IconPack } from '@fortawesome/fontawesome-svg-core';
import Icon from "./o-icon";
export * from './definition';
export { Icon };
export declare type IconInstance = InstanceType<typeof Icon>;
export declare type IconDefinitionOrPack = IconDefinition | IconPack;
export declare const addIcons: (...icons: IconDefinitionOrPack[]) => void;
