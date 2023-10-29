import type { EmitsOptions, Ref, SetupContext } from 'vue';
import type { PlatformOptions } from './global';

export interface CommonExposed {
    /**
     * Vue生成的组件ID
     */
    uid__: number;
    /**
     * 组件ID，也是渲染到页面上的元素ID
     */
    id__: string;
    /**
     * 平台特有的类型属性，也是组件名称
     */
    cType__: string;
    /**
     * 平台配置
     */
    PLATFORM_OPTIONS__: PlatformOptions;
    /**
     * 显示控制
     *
     * @private
     */
    display__: Ref<boolean>;
    /**
     * 重新渲染控制
     */
    refresh__: Ref<boolean>;
    /**
     * 当前控件scopeId;
     */
    scopeId__: Ref<string>;
    /**
     * 当前控件根元素
     */
    el: Ref<HTMLElement>;
    /**
     * 挂载状态
     */
    isMounted: Ref<boolean>;
    /**
     * 设置显示状态
     * @param flag `true`:显示
     */
    setDisplay: (flag: boolean) => void;
    /**
     * 重新渲染
     */
    domRefresh: () => void;
}

export type ComponentType<I extends abstract new (...args: any) => any, E extends keyof InstanceType<I>> = Pick<InstanceType<I>, E>;

export type InternalSetupContext<P, E extends EmitsOptions = EmitsOptions> = SetupContext<E> & { props: P; commonExposed: CommonExposed };
