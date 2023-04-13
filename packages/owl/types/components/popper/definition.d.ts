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
    crossAxis?: number;
    /**
     * 距离参照物距离偏移量
     */
    mainAxis?: number;
}
export declare type PopperPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
export declare const PopperProps: {
    /**
     * 参照物
     * reference 可为DOM元素、虚拟DOM元素、vue refDOM对象、css选择器
     */
    reference: {
        type: PropType<string | Element | VirtualElement>;
    };
    /**
     * 显示隐藏模式
     * `manul` 根据 `display` 进行显示隐藏
     * `click` 点击参照物显示，点击其他非参照物区域隐藏
     * `hover` 鼠标进入参照物隐藏，移出隐藏
     * `click-out` 点击参照物显示，移出参照物隐藏
     */
    mode: {
        type: PropType<PopperMode>;
        default: string;
    };
    /**
     * 鼠标在popper上时是否允许隐藏
     */
    hideOnPopper: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 当参照物在裁剪区域内显示，参照物移动出裁剪区域则隐藏
     */
    hideOnOut: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 设置相对参照物的偏移
     */
    offset: {
        type: PropType<PopperOffset>;
        default(): {
            mainAxis: number;
        };
    };
    /**
     * 设置相对参照物的位置
     */
    placement: {
        type: PropType<PopperPlacement>;
        default: string;
    };
    /**
     * 箭头位置
     * @values `edge` `*-start|*-end`靠近参照物边缘开始或结束, `fit` 自适应
     */
    arrowPlacement: {
        type: PropType<'edge' | 'fit'>;
        default: string;
    };
    shadow: {
        type: PropType<boolean>;
        default: boolean;
    };
    bgColor: {
        type: PropType<string>;
    };
    borderColor: {
        type: PropType<string>;
    };
    id: {
        type: StringConstructor;
    };
    display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type PopperVariables = {
    bgColor?: string;
    borderColor?: string;
};
export declare type PopperBemKeys = {
    modifiers: 'shadow';
    elements: {
        arrow: string;
    };
};
export declare const extractDom: (propReference?: string | Element | VirtualElement | undefined) => Element | VirtualElement;
export declare type PopperOptions = {
    placement?: Ref<PopperPlacement> | PopperPlacement;
    offset?: Ref<PopperOffset> | PopperOffset;
    mode?: PopperMode;
    display?: Ref<boolean> | boolean;
    hideOnPopper?: Ref<boolean> | boolean;
    hideOnOut?: Ref<boolean> | boolean;
    arrowPlacement?: Ref<string> | string;
};
export declare const usePopper: (
    referenceEl: HTMLElement | VirtualElement,
    popperDom: Ref<HTMLElement | undefined>,
    arrowDom: Ref<HTMLElement | undefined>,
    options?: PopperOptions | undefined
) => {
    popperTo: string;
};
export {};
