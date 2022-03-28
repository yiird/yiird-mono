import { ButtonProps } from '../packages/button/o-button-props';
import { ComponentPublicInstance, ExtractPropTypes } from 'vue';
import { OPrefabExpose } from './base-define';

/**
 * @public
 */
export type OButtonExpose = {
	abc: () => void;
} & OPrefabExpose;

/**
 * @public
 */
export type OButtonInstance = ComponentPublicInstance<Readonly<ExtractPropTypes<typeof ButtonProps>>, OButtonExpose>;
