import { type IconDefinition, type IconPack, library } from '@fortawesome/fontawesome-svg-core';
import Icon from './o-icon.vue';
export * from './definition';
export { Icon };

export type IconInstance = InstanceType<typeof Icon>;

export type IconDefinitionOrPack = IconDefinition | IconPack;

export const addIcons = (...icons: IconDefinitionOrPack[]) => {
    library.add(...icons);
};
