import { kebabCase } from 'lodash-es';
import { getCurrentInstance, inject, nextTick, onBeforeMount, onMounted, ref, toRef, type App, type Component, type PropType } from 'vue';
import { CACHE_INSTANCES, DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from '../config';
import type { IconNameOrDefinition } from '../types/components';
import type { BoxShadowDirection, BoxShadowLevel, PlatformOptions, RenderedReturn, Size } from '../types/global';
import type { CommonExposed } from '../types/prefab';

export const _register = (app: App, component: Component, optinos?: PlatformOptions) => {
    const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
    app.component(kebabCase(`${prefix}${component.name}`), component);
};

export const baseExpose = ['$', 'id__', 'cType__', 'PLATFORM_OPTIONS__', 'uid__', 'domRefresh', 'setDisplay', 'isMounted', 'el', 'scopeId__'] as const;

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
    },
    /**
     * 组件渲染完后的回调
     */
    rendered: {
        type: Function as PropType<(args: RenderedReturn) => void>
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

export const AffixProps = {
    /**
     * 图标名称
     *
     * 例如：
     * <i class="fa-solid fa-address-book"></i>
     * 描述的是 `fas` 风格的 `address-book`。
     *
     * 组件配置如下：
     * `prefix`="fas"
     * `icon`="address-book"
     * 或
     * 不设置 `prefix`
     * 设置`icon` 为 `IconDefinition`类型
     *
     * `import { faCamera } from '@fortawesome/pro-solid-svg-icons';`
     *
     * [查询图标](https://fontawesome.com/search?m=free)
     */
    icon: {
        type: [String, Object] as PropType<IconNameOrDefinition>,
        default: ''
    },
    text: {
        type: String as PropType<string>
    },
    /**
     * 图标尺寸
     */
    size: {
        type: String as PropType<Size>,
        default: 'md'
    }
};

export const useTheme = () => {
    const options = inject(OPTIONS_KEY, DEFAULT_ELEMENT_OPTIONS);
    return toRef(options!, 'themeConfig');
};

export const usePrefab = (props: any): CommonExposed => {
    //获取组件对象实例
    const internalInstance = getCurrentInstance();

    if (!internalInstance || !internalInstance.type.name) {
        return {} as CommonExposed;
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
    const scopeId__ = ref();

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

    const el = ref();
    const proxy = ref();

    onBeforeMount(() => {
        proxy.value = internalInstance.proxy;
        scopeId__.value = (internalInstance.type as any).__scopeId;
    });

    onMounted(() => {
        isMounted.value = true;
        if (props.rendered) {
            props.rendered({ el: el.value });
        }
    });

    return {
        PLATFORM_OPTIONS__: inject<PlatformOptions>(OPTIONS_KEY, {} as PlatformOptions),
        uid__: internalInstance.uid,
        id__,
        cType__,
        display__,
        refresh__,
        scopeId__,
        el,
        isMounted,
        setDisplay,
        domRefresh
    };
};

export {};
