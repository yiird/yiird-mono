import fs from 'node:fs';
import pkg from '../package.json';
import type { EntryInfo } from './type';

export function pkgExports(buildInfo: EntryInfo, reset: boolean) {
    const pkgContent = pkg as any;
    if (reset) {
        pkgContent.exports = {
            '.': pkgContent.exports['.'],
            './style.css': pkgContent.exports['./style.css']
        };
    }
    if (buildInfo.paramLibDir && buildInfo.paramLibName) {
        pkgContent.exports['./' + buildInfo.paramLibName] = {
            import: `./dist/standalone/${buildInfo.paramLibName}/index.mjs`,
            require: `./dist/standalone/${buildInfo.paramLibName}/index.umd.js`
        };
        pkgContent.exports[`./${buildInfo.paramLibName}/style.css`] = `./dist/${buildInfo.paramLibName}/style.css`;
    }

    fs.writeFileSync('package.json', JSON.stringify(pkgContent, null, 2));
}
