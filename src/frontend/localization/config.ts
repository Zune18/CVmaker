import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EnGlobal from './locales/en/global.json'
import EnTemplate from './locales/en/template.json'
import HnGlobal from './locales/hindi/global.json'
import HnTemplate from './locales/hindi/template.json'

const i18nNameSpaces = ['global', 'template'];

void i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'en',
	resources: {
		en: {
			global: EnGlobal,
			template: EnTemplate
		},
		hindi: {
			global: HnGlobal,
			template: HnTemplate
		}
	},
	ns: i18nNameSpaces,
	defaultNS: i18nNameSpaces
});
i18n.languages = ['en', 'hindi'];

export default i18n;