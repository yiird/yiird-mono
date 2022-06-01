import { get } from 'lodash-es';
import { I18nOptions } from '../types';
import en from './en.json';
import zh from './zh.json';

export class I18n {
	constructor(options?: I18nOptions) {
		const addMessages = options?.addMessages;
		if (addMessages) {
			for (const langKey of Object.keys(addMessages)) {
				this.add(langKey, addMessages[langKey]);
			}
		}
	}

	private _messages: Record<string, unknown> = {
		zh: zh,
		en: en
	};

	langs() {
		return Object.keys(this._messages);
	}

	hasLang(langKey: string) {
		return this.langs().includes(langKey);
	}

	add(langKey: string, messages: Record<string, unknown>) {
		Object.assign(this._messages, {
			[langKey]: messages
		});
	}

	getLabel(langKey: string, labelKey: string): string {
		return get(this._messages[langKey], labelKey) || '';
	}
}
