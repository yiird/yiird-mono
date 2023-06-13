import { existsSync, readFileSync } from 'fs';
import path, { extname } from 'path';
import { ScriptKind } from 'typescript';
import { BasicComment, BasicCommentKind } from '../parser/comment/basic/BasicComment';
import { EventComment } from '../parser/comment/basic/EventComment';
import { MethodComment } from '../parser/comment/basic/MethodComment';
import { PropComment } from '../parser/comment/basic/PropComment';
import { SfcComment } from '../parser/comment/basic/SfcComment';
import { SlotComment } from '../parser/comment/basic/SlotComment';

export enum FileKind {
    JS,
    JSX,
    TS,
    TSX,
    VUE
}

export const BASIC_TYPE = ['string', 'object', 'boolean', 'number', 'set', 'map', 'any', 'unknow'];

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
            const __ext = path.extname(filePath);
            if (__ext === '' || __ext === '.d') {
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

        /*  if (!realPath) {
            const root = process.cwd();
            const module = path.resolve(root, 'node_modules', filePath, 'package.json');

            if (existsSync(module)) {
                const data = readFileSync(module, 'utf8');
                const pkg = JSON.parse(data);
                const typeFile = pkg.types || pkg.typings;
                if (typeFile) {
                    const types = path.resolve(root, 'node_modules', filePath, pkg.types || pkg.typings);
                    realPath = Utils.getAvailablePath(types.substring(0, types.lastIndexOf(path.extname(types))), extensions);
                } else {
                    const types = path.resolve(root, 'node_modules', '@types', filePath);
                    realPath = Utils.getAvailablePath(types, extensions);
                }
            }
        }

        return realPath; */
    }

    static isPropComment(comment: BasicComment): comment is PropComment {
        return BasicCommentKind.PROP === comment.kind;
    }
    static isMethodComment(comment: BasicComment): comment is MethodComment {
        return BasicCommentKind.METHOD === comment.kind;
    }
    static isEventComment(comment: BasicComment): comment is EventComment {
        return BasicCommentKind.EVENT === comment.kind;
    }
    static isSlotComment(comment: BasicComment): comment is SlotComment {
        return BasicCommentKind.SLOT === comment.kind;
    }
    static isSfcComment(comment: BasicComment): comment is SfcComment {
        return BasicCommentKind.SFC === comment.kind;
    }
}
