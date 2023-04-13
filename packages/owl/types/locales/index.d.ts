import { I18n, Locale, LocaleMessageDictionary, VueMessageType } from './vue-i18n/dist/vue-i18n.runtime.esm-bundler.js';
export default function setupI18n(options?: { locale: string; fallbackLocale: string }): I18n<
    {
        zh: {
            message: {
                _lib_: {
                    calendar: {
                        date: string;
                        long_text: {
                            month: string;
                            week: string;
                        };
                        month: string;
                        short_text: {
                            month: string;
                            week: string;
                        };
                        thismonth: string;
                        thisyear: string;
                        today: string;
                        year: string;
                    };
                    errors: {
                        inValidProp: string;
                        whereIsNoPopWapper: string;
                    };
                    popper: {
                        errors: {
                            isNotVirtualElement: string;
                        };
                    };
                };
            };
        };
        en: {};
    },
    unknown,
    unknown,
    false
>;
export declare function addI18nMessages(i18n: I18n, messages: Record<Locale, LocaleMessageDictionary<VueMessageType>>): void;
