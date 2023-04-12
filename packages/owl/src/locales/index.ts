import { forEach } from 'lodash-es';
import { createI18n } from 'vue-i18n';
import type { I18n, Locale, LocaleMessageDictionary, VueMessageType } from 'vue-i18n';

import en from './messages/en';
import zh from './messages/zh.json';

// const customRule: PluralizationRule = (choice, choicesLength, orgRule) => {
// 	console.log(choice, choicesLength, orgRule ? orgRule(choice, choicesLength) : '');
// 	if (choice === 0) {
// 		return 0;
// 	}

// 	const teen = choice > 10 && choice < 20;
// 	const endsWithOne = choice % 10 === 1;
// 	if (!teen && endsWithOne) {
// 		return 1;
// 	}
// 	if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
// 		return 2;
// 	}

// 	return choice;
// };

export default function setupI18n(options = { locale: 'zh', fallbackLocale: 'en' }) {
	const i18n = createI18n({
		messages: {
			zh,
			en
		},
		legacy: false,
		pluralRules: {
			zh: (choice) => choice
		},
		...options
	});
	document?.querySelector('html')?.setAttribute('lang', options.locale);
	return i18n;
}

export function addI18nMessages(i18n: I18n, messages: Record<Locale, LocaleMessageDictionary<VueMessageType>>) {
	forEach(messages, (message, locale) => {
		i18n.global.mergeLocaleMessage(locale, message);
	});
}
