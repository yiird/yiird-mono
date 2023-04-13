import fs from 'node:fs';
import pkg from '../package.json';
import type { EntryInfo } from './type';

export function pkgExports(buildInfo: EntryInfo, reset: boolean) {
    const pkgContent = pkg as any;
    if (reset) {
        pkgContent.exports = {};
    }
    if (buildInfo.paramLibDir && buildInfo.paramLibName) {
        pkgContent.exports['./' + buildInfo.paramLibName] = {
            import: `./dist/standalone/${buildInfo.paramLibName}.mjs`,
            require: `./dist/standalone/${buildInfo.paramLibName}.umd.js`
        };
    } else {
        pkgContent.exports['.'] = {
            import: `./dist/${buildInfo.fileName}.mjs`,
            require: `./dist/${buildInfo.fileName}.umd.js`
        };
    }

    fs.writeFileSync('package.json', JSON.stringify(pkgContent, null, 2));
}
