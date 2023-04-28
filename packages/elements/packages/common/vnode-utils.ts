import { getCurrentInstance, type ConcreteComponent } from 'vue';

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
export const checkChidrenTypeIn = (...typeNames: string[]) => {
    typeNames = typeNames.map((name) => name.toLowerCase());
    const slots = getCurrentInstance()?.slots.default?.call(null);
    const notTarget = slots?.find((slot) => {
        const name = (slot.type as ConcreteComponent).name?.toLowerCase();
        if (name) {
            return !typeNames.includes(name);
        } else {
            return true;
        }
    });
    return !notTarget;
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
