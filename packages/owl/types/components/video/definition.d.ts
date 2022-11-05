import { PropType } from 'vue';
export declare const VideoProps: {
    readonly src: {
        readonly type: PropType<string>;
    };
    readonly id: {
        type: StringConstructor;
    };
    readonly display: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type VideoVariables = {
    sliderX: string;
    currentPosition: string;
    bufferPosition: string;
};
export declare type VideoBemKeys = {
    modifiers: string;
    elements: {
        video: string;
        control: string;
        options: string;
        optionsLeft: string;
        optionsRight: string;
        switch: string;
        timer: string;
        progress: string;
        progressBuffer: string;
        progressCurrent: string;
        progressBar: string;
    };
};
export {};
