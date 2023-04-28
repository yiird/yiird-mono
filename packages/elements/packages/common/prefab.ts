import { kebabCase } from 'lodash-es';
import { computed, getCurrentInstance, inject, nextTick, ref, toRef, type Ref } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from '../config';
import type { ElementOptions } from '../types/global';

export const BaseProps = {
    /**
     * 组件id，若不设置会自动生成
     */
    id: {
        type: String
    },
    /**
     * 显示隐藏
     */
    display: {
        type: Boolean,
        default: true
    }
};

export const useTheme = () => {
    const options = inject(OPTIONS_KEY, DEFAULT_ELEMENT_OPTIONS);
    return toRef(options!, 'themeConfig');
};

export type CommonPrefab = {
    uid__: number;
    id__: string;
    cType__: string;
    ELEMENT_OPTIONS__: ElementOptions;
    display__: Ref<boolean>;
    refresh__: Ref<boolean>;
    domRefresh: () => void;
};
export const usePrefab = (props: any): CommonPrefab => {
    //获取组件对象实例
    const internalInstance = getCurrentInstance();

    if (!internalInstance || !internalInstance.type.name) {
        return {} as CommonPrefab;
    }

    //生成组件主要样式类名
    const cType__ = kebabCase(internalInstance.type.name);

    //生成组件ID
    const id__ = cType__ + '-' + (props.id ?? internalInstance.uid);

    //显示状态
    const display__ = computed(() => {
        return (props.display as boolean) ?? true;
    });

    //刷新状态
    const refresh__ = ref(true);

    /**
     * 刷新组件
     * @public
     * @method
     */
    const domRefresh = () => {
        refresh__.value = false;
        nextTick(() => {
            refresh__.value = true;
        });
    };

    return {
        ELEMENT_OPTIONS__: inject<ElementOptions>(OPTIONS_KEY, {} as ElementOptions),
        uid__: internalInstance.uid,
        id__,
        cType__,
        display__,
        refresh__,
        domRefresh
    };
};

export {};
