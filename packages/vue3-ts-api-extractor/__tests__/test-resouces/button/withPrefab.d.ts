import { OBasePropsDefine, OPrefabDefine, OPrefabOptionsDefine } from './base-define';
/**
 * 预制函数
 * @param {OPrefabOptionsDefine} options
 * @returns
 */
export declare function withPrefab<P extends OBasePropsDefine>(options: OPrefabOptionsDefine<P>): OPrefabDefine;
