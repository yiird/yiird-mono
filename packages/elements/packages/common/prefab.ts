import { isArray, kebabCase, merge } from 'lodash-es';
import {
    computed,
    getCurrentInstance,
    inject,
    nextTick,
    onBeforeMount,
    onMounted,
    ref,
    toRef,
    watchEffect,
    type App,
    type Component,
    type EmitsOptions,
    type ExtractPropTypes,
    type PropType,
    type Ref,
    type SetupContext
} from 'vue';
import { CACHE_INSTANCES, DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from '../config';
import type { IconNameOrDefinition } from '../types/components';
import type { BoxShadowDirection, BoxShadowLevel, PlatformOptions, RenderedReturn, Size, StringOther, ThemeConfig } from '../types/global';
import type { CommonExposed } from '../types/prefab';

export const _register = (app: App, component: Component, optinos?: PlatformOptions) => {
    const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
    app.component(kebabCase(`${prefix}${component.name}`), component);
};

export const baseExpose = ['$', 'id__', 'cType__', 'global__', 'uid__', 'domRefresh', 'setDisplay', 'isMounted', 'el', 'scopeId__'] as const;

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
    },
    theme: {
        type: Object as PropType<OpperatorTheme<unknown> | unknown>
    }
};

export type BasePropsType = Readonly<ExtractPropTypes<typeof BaseProps>>;

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

export const BaseEmits = {
    mouseover: null,
    mouseout: null
};

export const useTheme = () => {
    const options = inject(OPTIONS_KEY, DEFAULT_ELEMENT_OPTIONS);
    return toRef(options!, 'themeConfig');
};

export type InternalCtx<E = EmitsOptions> = { props: any; commonExposed: CommonExposed } & SetupContext<E>;

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
        uid__: internalInstance.uid,
        id__,
        cType__,
        display__,
        refresh__,
        scopeId__,
        el,
        isMounted,
        setDisplay,
        domRefresh,
        global__: {
            PLATFORM_OPTIONS__: inject<PlatformOptions>(OPTIONS_KEY, {} as PlatformOptions)
        }
    };
};
type OpperatorThemeKey = 'normal' | 'click' | 'hover' | 'focus' | StringOther;
export class OpperatorTheme<T> {
    protected _customers: Map<OpperatorThemeKey, Partial<T>> = new Map();
    private _normal: T;
    constructor(theme: T) {
        this._normal = theme;
        this.addTheme('normal', theme);
    }

    getNormal() {
        return this._normal;
    }

    has(name: string) {
        return this._customers.has(name);
    }

    only() {
        return this._customers.size === 1 && this._customers.has('normal');
    }

    addTheme(name: OpperatorThemeKey, theme: Partial<T>) {
        this._customers.set(name, theme);
    }

    getTheme(name: OpperatorThemeKey) {
        return this._customers.get(name) || this._normal;
    }
}
type StatusThemeKey = 'success' | 'warn' | 'error' | OpperatorThemeKey;

type CombineThemeKey = StatusThemeKey | `${OpperatorThemeKey}-${StatusThemeKey}`;

export class StatusTheme<T> extends OpperatorTheme<T> {
    constructor(theme: T) {
        super(theme);
    }

    addTheme(name: StatusThemeKey, theme: Partial<T>): void {
        super.addTheme(name, theme);
    }

    getTheme(name: CombineThemeKey) {
        return super.getTheme(name);
        /* if (name.includes('-') || name.includes(' ')) {
            const name_arr = name.includes('-') ? name.split('-') : name.split(' ');
            return merge(
                super.getNormal(),
                name_arr.map((n) => (super.has(n) ? super.getTheme(n) : null)).filter((t) => !!t)
            );
        } else {
            return super.getTheme(name);
        } */
    }
}

export const useOpperatorTheme = <T extends object, P extends BasePropsType = BasePropsType>(props: P, processor: (globalTheme: ThemeConfig) => OpperatorTheme<T>) => {
    const globalTheme = useTheme();
    const themeKey = ref<OpperatorThemeKey | OpperatorThemeKey[]>('normal');
    const advTheme = computed<OpperatorTheme<T>>(() => {
        if (props.theme) {
            return props.theme instanceof OpperatorTheme ? props.theme : new OpperatorTheme<T>(props.theme as T);
        } else {
            return processor(globalTheme.value);
        }
    });

    const theme = ref<Partial<T>>();

    watchEffect(() => {
        const _themeKey = themeKey.value;
        const _advTheme = advTheme.value;
        let _themes;
        if (isArray(_themeKey)) {
            const aviliableKeys = _themeKey.filter((key) => _advTheme.has(key));
            if (aviliableKeys.length === 0) {
                _themes = [advTheme.value.getNormal()];
            } else {
                _themes = [advTheme.value.getNormal(), ...aviliableKeys.map((key) => _advTheme.getTheme(key))];
            }
        } else {
            if (!_advTheme.has(_themeKey)) return;
            _themes = [advTheme.value.getNormal(), _advTheme.getTheme(_themeKey)];
        }
        theme.value = merge({} as T, ..._themes);
    });

    const toggleTheme = (key: OpperatorThemeKey) => {
        const _themeKey = themeKey.value;
        if (isArray(_themeKey)) {
            if (!_themeKey.includes(key)) {
                _themeKey.push(key);
            } else {
                _themeKey.splice(_themeKey.indexOf(key), 1);
            }
        } else {
            themeKey.value = [_themeKey, key];
        }
    };

    return {
        toggleTheme,
        themeKey,
        theme
    };
};
export const useStatusTheme = <T extends object, P extends BasePropsType = BasePropsType>(props: P, processor: (globalTheme: ThemeConfig) => StatusTheme<T>) => {
    return useOpperatorTheme(props, processor) as {
        themeKey: Ref<CombineThemeKey | CombineThemeKey[]>;
        toggleTheme: (key: CombineThemeKey) => void;
        theme: Ref<T>;
    };
};

export {};
