import { InjectionKey, PropType } from 'vue';
export declare const LayoutProps: {
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const HeaderProps: {
    readonly height: {
        readonly type: PropType<string>;
        readonly default: '5rem';
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const FooterProps: {
    readonly height: {
        readonly type: PropType<string>;
        readonly default: '5rem';
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const MainProps: {
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const SiderProps: {
    /**
     * 侧边部分的宽度
     */
    readonly width: {
        readonly type: PropType<string>;
        readonly default: '10rem';
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type LayoutVariables = {};
export declare type HeaderVariables = {
    height: string;
};
export declare type FooterVariables = HeaderVariables;
export declare type MainVariables = {
    top: string;
    bottom: string;
    left: string;
    right: string;
};
export declare type SiderVariables = {
    width: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
};
export declare type MainPosition = {
    existSider?: 'right' | 'left';
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
};
export declare const MainPositionKey: InjectionKey<MainPosition>;
export {};
