import { ButtonProps } from '../packages/button/o-button-props';
import { ComponentPublicInstance, ExtractPropTypes } from 'vue';
import { OPrefabExpose } from './base-define';
/**
 * @public
 */
export declare type OButtonExpose = {
    abc: () => void;
} & OPrefabExpose;
/**
 * @public
 */
export declare type OButtonInstance = ComponentPublicInstance<Readonly<ExtractPropTypes<typeof ButtonProps>>, OButtonExpose>;
//# sourceMappingURL=instance.d.ts.map