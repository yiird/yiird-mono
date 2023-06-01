import { kebabCase } from 'lodash-es';
import { getCurrentInstance, inject, nextTick, onMounted, ref, toRef, type PropType } from 'vue';
import { CACHE_INSTANCES, DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from '../config';
import type { BoxShadowDirection, BoxShadowLevel, CommonPrefab, ElementOptions } from '../types/global';

export const baseExpose = ['display__', 'id__', 'cType__', 'ELEMENT_OPTIONS__', 'uid__', 'domRefresh', 'setDisplay', 'isMounted'];

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

export const ShadowProps = {
    /**
     * 阴影级别
     */
    shadowLevel: {
        type: String as PropType<BoxShadowLevel>,
        default: 'low'
    },
    /**
     * 阴影方向
     */
    shadowDirection: {
        type: String as PropType<BoxShadowDirection>,
        default: 'down'
    }
};

export const useTheme = () => {
    const options = inject(OPTIONS_KEY, DEFAULT_ELEMENT_OPTIONS);
    return toRef(options!, 'themeConfig');
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
    const id__ = props.id ? props.id : cType__ + '-' + internalInstance.uid;

    if (!CACHE_INSTANCES.has(cType__)) {
        CACHE_INSTANCES.set(cType__, new Map());
    }
    const INSTANCE_COLLECT = CACHE_INSTANCES.get(cType__);
    INSTANCE_COLLECT!.set(id__, internalInstance);

    const display__ = ref(props.display ?? true);

    /**
     * 设置隐藏
     * @param flag true:显示，false:隐藏
     */
    const setDisplay = (flag: boolean) => {
        display__.value = flag;
    };

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

    const isMounted = ref(false);

    onMounted(() => {
        isMounted.value = true;
    });

    return {
        ELEMENT_OPTIONS__: inject<ElementOptions>(OPTIONS_KEY, {} as ElementOptions),
        uid__: internalInstance.uid,
        id__,
        cType__,
        display__,
        refresh__,
        isMounted,
        setDisplay,
        domRefresh
    };
};

export {};
