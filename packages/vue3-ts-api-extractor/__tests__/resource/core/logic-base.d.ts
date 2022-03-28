import { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { ORawBinding } from '../types';
export declare const BaseProps: {
    /**
     * 组件ID
     * @prop
     */
    readonly id: PropType<string>;
    /**
     * 显示 or 隐藏
     * @prop
     */
    readonly display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
export declare const FormItemProps: {
    name: {
        type: PropType<string>;
        default: boolean;
    };
    value: PropType<string | number | boolean | []>;
    id: PropType<string>;
    display: {
        readonly type: PropType<boolean>;
        readonly default: true;
    };
};
/**
 * 预制函数
 * @param {Xxx} options
 * @returns
 */
export declare const withPrefab: (options: {
    props: Readonly<ExtractPropTypes<typeof BaseProps>>;
    ctx: SetupContext<('aa' | 'bb')[]>;
}) => ORawBinding;
//# sourceMappingURL=logic-base.d.ts.map