import { getCurrentInstance, ref, watchPostEffect, type ComponentPublicInstance, type ConcreteComponent, type VNode } from 'vue';

/**
 * 判断父组件是否是指定的类型
 * @param typeName 类型名
 * @returns
 */
export const checkParentType = (typeName: string) => {
    return typeName.toLowerCase() === getCurrentInstance()?.parent?.type.name?.toLowerCase();
};

/**
 * 判断子组件是否都是指定的类型
 * @param typeNames 类型名
 * @returns
 */
export const checkChidrenIsRightTypes = (children: VNode[], ...typeNames: string[]) => {
    const notTarget = children.find((child) => {
        const name = (child.type as ConcreteComponent).name;
        if (name) {
            return !typeNames.includes(name);
        } else {
            return true;
        }
    });
    return !notTarget;
};

/**
 * 判断子组件是否为同一类型，如果是同一类型则返回类型名
 *
 * @returns 返回类型名称
 */
export const checkChildrenIsSameType = () => {
    const slots = getCurrentInstance()?.slots.default?.call(null);
    const names = new Set(slots?.map((slot) => (slot.type as ConcreteComponent).name));
    return names.size === 1 ? Array.from(names)[0] : null;
};

/**
 * 查询子节点
 * @param typeNames 子节点类型名
 * @returns []
 */
export const findBrotherVNodes = (...typeNames: string[]) => {
    typeNames = typeNames.map((name) => name.toLowerCase());
    const children = getCurrentInstance()?.parent?.slots.default?.call(null);
    if (!children) {
        return [];
    }
    if (!typeNames || typeNames.length === 0) {
        return children;
    } else {
        return children.filter((slot) => {
            const name = (slot.type as ConcreteComponent).name?.toLowerCase();
            return name && typeNames.includes(name);
        });
    }
};

export const injectInDirective = <T>(instance: ComponentPublicInstance, name: string | symbol) => {
    return instance.$.appContext.provides[name] as T;
};

export const vnodeRef = (getter: () => VNode | (() => VNode[])) => {
    const vnode = ref<VNode | (() => VNode[])>();

    watchPostEffect(() => {
        vnode.value = getter();
    });

    return vnode;
};
