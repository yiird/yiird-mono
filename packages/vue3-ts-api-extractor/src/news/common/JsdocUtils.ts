import { tsquery } from '@phenomnomnominal/tsquery';
import ts, { getJSDocPrivateTag, getTextOfJSDocComment, isJSDoc, JSDoc, JSDocParameterTag, JSDocTag, Node, ScriptKind } from 'typescript';

export class JsdocUtils {
	static getJsDoc = (node: Node) => {
		const docs: JSDoc[] = [];
		node.getChildren().forEach((child) => {
			if (isJSDoc(child)) {
				docs.push(child);
			}
		});
		return docs;
	};

	static getDescription = (doc: JSDoc | JSDocTag) => {
		return getTextOfJSDocComment(doc.comment);
	};

	static getPrivate = (doc: JSDoc) => {
		return !!getJSDocPrivateTag(doc);
	};

	static getTag = (tagName: string, doc: JSDoc) => {
		return doc.tags?.find((tag) => tag.tagName.text === tagName);
	};

	static getTags = (tagName: string, doc: JSDoc) => {
		return doc?.tags?.filter((tag) => tag.tagName.text === tagName);
	};

	static getParamTags = (jsdoc: JSDoc): Map<string, JSDocParameterTag> => {
		const map = new Map();
		this.getTags('param', jsdoc)?.forEach((tag) => {
			if (ts.isJSDocParameterTag(tag)) {
				map.set(tag.name.getText(), tag);
			}
		});
		this.getTags('argument', jsdoc)?.forEach((tag) => {
			if (ts.isJSDocParameterTag(tag)) {
				map.set(tag.name.getText(), tag);
			}
		});

		return map;
	};

	static packgeTypeDef(filename: string, comments: string[]): JSDoc[] {
		const typedefs = [];
		for (let i = 1; i < comments.length; i++) {
			const commentContent = comments[i].trim();
			if (commentContent.startsWith('@typedef')) {
				typedefs.push('/\n/**');
				typedefs.push(' ' + commentContent);
			} else {
				typedefs.push(' ' + commentContent);
			}
		}
		const jsDocStr = '/**\n *' + typedefs.join('\n *') + '\n */';

		return tsquery.query(tsquery.ast(jsDocStr, filename, ScriptKind.TS), 'JSDocComment', {
			visitAllChildren: true
		});
	}
	// static getTagForMap(name: string, jsdoc: JSDoc) {
	// 	isJSDocAugmentsTag
	// }
}
