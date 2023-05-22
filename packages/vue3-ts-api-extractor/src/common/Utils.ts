import { existsSync, readFileSync } from 'fs';
import path, { extname } from 'path';
import { ScriptKind } from 'typescript';

export enum FileKind {
    JS,
    JSX,
    TS,
    TSX,
    VUE
}

export const BASIC_TYPE = ['string', 'object', 'array', 'boolean', 'number', 'set', 'map', 'any', 'unknow'];

export class Utils {
    static getScriptKind = (lang: string) => {
        let kind: ScriptKind;
        switch (lang.toLowerCase()) {
            case 'js':
                kind = ScriptKind.JS;
                break;
            case 'jsx':
                kind = ScriptKind.JSX;
                break;
            case 'ts':
                kind = ScriptKind.TS;
                break;
            case 'tsx':
                kind = ScriptKind.TSX;
                break;
            default:
                kind = ScriptKind.TS;
        }
        return kind;
    };

    static isBasicType(type: string) {
        return BASIC_TYPE.includes(type.toLocaleLowerCase());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static assignObject(target: any, source: any) {
        Object.keys(source).forEach((key) => {
            const v = source[key];
            if (v) {
                target[key] = v;
            }
        });
    }

    static getSource(filename: string) {
        return readFileSync(filename).toString();
    }

    static getFileKind(filename: string) {
        let ext = FileKind.TS;
        switch (extname(filename).toLowerCase()) {
            case '.js':
                ext = FileKind.JS;
                break;
            case '.jsx':
                ext = FileKind.JSX;
                break;
            case '.ts':
                ext = FileKind.TS;
                break;
            case '.tsx':
                ext = FileKind.TSX;
                break;
            case '.vue':
                ext = FileKind.VUE;
                break;
            default:
                ext = FileKind.TS;
        }
        return ext;
    }

    static fileKindToScriptKind(kind: FileKind) {
        let scriptKind = ScriptKind.TS;
        switch (kind) {
            case FileKind.JS:
                scriptKind = ScriptKind.TS;
                break;
            case FileKind.JSX:
                scriptKind = ScriptKind.JSX;
                break;
            case FileKind.TS:
                scriptKind = ScriptKind.TS;
                break;
            case FileKind.TSX:
                scriptKind = ScriptKind.TSX;
                break;
        }
        return scriptKind;
    }

    static getAvailablePath(filePath: string, extensions: string[] = []): string | undefined {
        let realPath;
        const mybeFiles = [filePath, path.resolve(filePath, `.${path.sep}index`)];

        extensions.forEach((ext) => {
            if (path.extname(filePath) === '') {
                mybeFiles.forEach((mybeFile) => {
                    if (existsSync(mybeFile + ext)) {
                        realPath = mybeFile + ext;
                    }
                });
            } else if (existsSync(filePath)) {
                realPath = filePath;
            }
        });
        return realPath;
    }

    static getReferPath(baseFilePath: string, filePath: string, extensions?: string[]) {
        return Utils.getAvailablePath(path.resolve(path.dirname(baseFilePath), filePath), extensions);
    }
}
