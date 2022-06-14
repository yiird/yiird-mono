import { ExtractPropTypes, Ref } from 'vue';
import { ButtonProps } from '../props-button';
import { OComponentInstance, OPrefabExpose, OPrefabOptionsDefine, OPrefabPrivate } from './base-define';
export declare type OButtonExpose = OPrefabExpose;
export declare type OButtonPrivate = OPrefabPrivate & {
    rootRef: Ref<HTMLButtonElement | null>;
    obtainText: Ref<string | undefined>;
};
export declare type OButtonPrefabDefine = OButtonExpose & OButtonPrivate;
export declare type OButtonPropsDefine = Readonly<ExtractPropTypes<typeof ButtonProps>>;
export declare type OButtonPrefabOptionsDefine = OPrefabOptionsDefine<OButtonPropsDefine>;
export declare type OButtonInstance = Omit<OComponentInstance<OButtonPropsDefine, OButtonPrefabDefine>, keyof OButtonPrivate>;
