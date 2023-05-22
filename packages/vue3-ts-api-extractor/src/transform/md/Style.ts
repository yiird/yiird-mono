import { escape, isString } from 'lodash-es';
import { markdownTable } from 'markdown-table';
import stringWidth from 'string-width';

export type StyleFn = (str?: string) => string;

export type Header = {
    name: string;
    label: string;
    display: boolean;
    style?: StyleFn;
    align: 'l' | 'r' | 'c';
};

export type Data = {
    [key: string]: string | StyleFn;
};
export const MdStyles = {
    h1: (str: string) => `# ${str}`,
    h2: (str: string) => `## ${str}`,
    h3: (str: string) => `### ${str}`,
    h4: (str: string) => `#### ${str}`,
    h5: (str: string) => `##### ${str}`,
    h6: (str: string) => `###### ${str}`,
    h: (level: number, str: string) => `${'#'.repeat(level)} ${str}`,
    t: (level: number, str: string) => `${level === 0 ? str : '\t'.repeat(level) + ' ' + str}`,
    normal: (str: string) => str,
    line: () => `\n`,
    hr: () => `${MdStyles.line()}---${MdStyles.line()}`,
    html: (str: string) => escape(str).replaceAll('\n', '<br/>'),
    quote: (str: string) => `> ${str}`,
    important: (str: string) => `\`${str}\``,
    code: (str: string, lang: string) => `\`\`\`${lang}${MdStyles.line()}${str}${MdStyles.line()}\`\`\``,
    table: (headers: Array<Header>, data: Array<Data>, cls: string) => {
        const nameIndex: string[] = [];
        const _headers = headers.filter((head) => head.display);
        const _headerNames = _headers.map((header) => {
            nameIndex.push(header.name);
            return header.style ? header.style(header.label) : header.label;
        });
        const tableData: string[][] = [_headerNames];
        data.forEach((item) => {
            const record: string[] = [];
            nameIndex.forEach((name) => {
                const value = item[name];
                if (value) {
                    if (isString(value)) {
                        record.push(value);
                    } else {
                        record.push(value());
                    }
                } else {
                    record.push('');
                }
            });
            tableData.push(record);
        });

        return `\n<div class="${cls}">\n\n${markdownTable(tableData, {
            align: headers.map((header) => header.align),
            stringLength: stringWidth
        })}\n\n</div>\n\n`;
    }
};
