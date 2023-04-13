import { InjectionKey, PropType } from 'vue';
import { BaseProps } from '../../common/prefab';

export const LayoutProps = {
    ...BaseProps
} as const;

export const HeaderProps = {
    ...BaseProps,
    height: {
        type: String as PropType<string>,
        default: '5rem'
    }
} as const;

export const FooterProps = HeaderProps;

export const MainProps = {
    ...BaseProps
} as const;

export const SiderProps = {
    ...BaseProps,
    /**
     * 侧边部分的宽度
     */
    width: {
        type: String as PropType<string>,
        default: '10rem'
    }
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type LayoutVariables = {};

export type HeaderVariables = {
    height: string;
};

export type FooterVariables = HeaderVariables;

export type MainVariables = {
    top: string;
    bottom: string;
    left: string;
    right: string;
};

export type SiderVariables = {
    width: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
};

export type MainPosition = {
    existSider?: 'right' | 'left';
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
};

export const MainPositionKey = Symbol() as InjectionKey<MainPosition>;

export {};
