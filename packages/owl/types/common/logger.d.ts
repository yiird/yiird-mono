export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface Options {
    debug?: boolean;
    level?: LogLevel;
}
export declare const configure: (options: Options) => void;
declare const debug: (...args: unknown[]) => string | undefined;
declare const info: (...args: unknown[]) => string | undefined;
declare const warn: (...args: unknown[]) => string | undefined;
declare const error: (...args: unknown[]) => Error;
export { debug, info, warn, error };
