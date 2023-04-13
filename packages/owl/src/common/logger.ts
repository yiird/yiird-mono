import { indexOf, slice } from 'lodash-es';

const LOG_LEVEL = ['debug', 'info', 'warn', 'error'];

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const GlobalLogOptions = {
    debug: false,
    level: 'info'
};

export interface Options {
    debug?: boolean;
    level?: LogLevel;
}

export const configure = (options: Options) => {
    Object.assign(GlobalLogOptions, options);
};

const log = (type: LogLevel, ...args: unknown[]): string | undefined => {
    if (!GlobalLogOptions.debug) {
        return;
    }
    const fromIndex = indexOf(LOG_LEVEL, GlobalLogOptions.level);
    const newArr = slice(LOG_LEVEL, fromIndex);
    const writerType = type.toUpperCase();
    const label = '[O] ' + writerType + ' ';
    if (indexOf(newArr, type) !== -1) {
        console[type](label, ...args);

        /* let writerType = type.toUpperCase();
        const label = '%c [G] ' + writerType + ' ';
        if (args.length > 1) {
            console.groupCollapsed(label, args[0]);
            console[type](...args);
            console.groupEnd(label);
        } else {
            console[type](label, args[0]);
        } */
    }
    return [label, ...args].join('\n');
};
// function getMethodName() {
// 	let error: Error;

// 	try {
// 		throw new Error('');
// 	} catch (e) {
// 		error = e as Error;
// 	}

// 	if (error.stack === undefined) {
// 		return '';
// 	}
// 	const stackTraces = error.stack.split('\n');

// 	const stackTraceSource = stackTraces[3].trim().split(' ');
// 	return '\n' + (stackTraceSource[1].indexOf('.') !== -1 ? stackTraceSource[1].split('.')[1] : stackTraceSource[1]) + ' from ' + stackTraceSource[2] + '\n';
// }
const debug = (...args: unknown[]) => {
    return log('debug', ...args);
};

const info = (...args: unknown[]) => {
    return log('info', ...args);
};

const warn = (...args: unknown[]) => {
    return log('warn', ...args);
};
const error = (...args: unknown[]): Error => {
    return Error(log('error', ...args));
};
export { debug, info, warn, error };
