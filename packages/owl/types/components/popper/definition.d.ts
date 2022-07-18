import { PropType, Ref } from 'vue';
/**
 * 虚拟元素定义
 * 您可以使用虚拟元素而不是真实的 DOM 元素作为Popper参考。
 */
export interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}
export declare const isVirtualElement: (ve: VirtualElement) => ve is VirtualElement;
export declare type PopperMode = 'manul' | 'click' | 'hover' | 'click-out';
/**
 * 偏移量
 */
export interface PopperOffset {
    /**
     * 参照物侧方向滑动偏移量
     */
    skid?: number;
    /**
     * 距离参照物距离偏移量
     */
    distance?: number;
}
export declare type PopperPlacement = 'auto' | 'auto-start' | 'auto-end' | 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end' | undefined;
export declare const PopperProps: {
    /**
     * 参照物
     * reference 可为DOM元素、虚拟DOM元素、css选择器
     */
    reference: {
        type: PropType<string | Element | VirtualElement>;
    };
    /**
     * 显示隐藏模式
     */
    mode: {
        type: PropType<PopperMode>;
        default: string;
    };
    /**
     * 设置相对参照物的偏移
     */
    offset: {
        type: PropType<PopperOffset>;
    };
    /**
     * 设置相对参照物的位置
     */
    placement: {
        type: PropType<PopperPlacement>;
    };
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const extractDom: (propReference?: string | Element | VirtualElement | undefined) => Element | VirtualElement;
export declare type PopperOptions = {
    placement?: Ref<PopperPlacement> | PopperPlacement;
    offset?: Ref<Array<number>> | Array<number>;
    mode?: PopperMode;
};
export declare const usePopper: (referenceDom: HTMLElement | VirtualElement, popperDom: Ref<HTMLElement | undefined>, options?: PopperOptions | undefined) => {
    popperTo: string;
    show: () => void;
    hide: () => void;
};
export {};
